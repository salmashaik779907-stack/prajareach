import { useState } from "react";
import {
  CalendarDays,
  Hospital,
  UserRound,
  Clock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { saveAppointment } from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const DEFAULT_SELECTION = {
  doctor: {
    name: "Dr. Anjali Rao",
    specialization: "General Medicine",
    available: true,
    available_time: "9:00 AM - 1:00 PM",
  },
  hospital: { name: "Praja General Hospital", location: "Kurnool" },
};

const FALLBACK_TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getToday() {
  return formatDateInput(new Date());
}

function toMinutes(hour, minute, meridiem) {
  let normalizedHour = Number(hour) % 12;
  if (String(meridiem).toUpperCase() === "PM") normalizedHour += 12;
  return normalizedHour * 60 + Number(minute || 0);
}

function formatTime(totalMinutes) {
  const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalizedMinutes / 60);
  const minute = normalizedMinutes % 60;
  const meridiem = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${meridiem}`;
}

function getTimeSlots(availability) {
  const match = String(availability || "").match(
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i
  );
  if (!match) return FALLBACK_TIME_SLOTS;

  const start = toMinutes(match[1], match[2], match[3]);
  const end = toMinutes(match[4], match[5], match[6]);
  if (end <= start) return FALLBACK_TIME_SLOTS;

  const slots = [];
  for (let minutes = start; minutes <= end; minutes += 30) {
    slots.push(formatTime(minutes));
  }
  return slots.length ? slots : FALLBACK_TIME_SLOTS;
}

function formatAppointmentDate(value) {
  if (!value) return "Not selected";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function Booking({ selection, onNavigate, onChangeRole }) {
  const chosen = selection || DEFAULT_SELECTION;
  const doctor = chosen.doctor || DEFAULT_SELECTION.doctor;
  const hospital = chosen.hospital || DEFAULT_SELECTION.hospital;
  const timeSlots = getTimeSlots(doctor.available_time);

  const [booked, setBooked] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(getToday);
  const [appointmentTime, setAppointmentTime] = useState(
    () => getTimeSlots(doctor.available_time)[0] || FALLBACK_TIME_SLOTS[0]
  );
  const [token, setToken] = useState(null);
  const [savedRemotely, setSavedRemotely] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function confirmBooking(event) {
    event?.preventDefault();
    if (!doctor.available) {
      setError("This doctor is currently unavailable. Please choose another listing.");
      return;
    }
    if (!appointmentDate || !appointmentTime) {
      setError("Choose an appointment date and time first.");
      return;
    }

    const tokenNumber = Math.floor(Math.random() * 90) + 10;
    const tokenCode = `PR-${String(tokenNumber).padStart(3, "0")}`;
    setSaving(true);
    setError("");

    try {
      const result = await saveAppointment({
        doctor_name: doctor.name,
        specialization: doctor.specialization,
        hospital_name: hospital.name,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        token: tokenNumber,
        status: "Confirmed",
      });
      setToken({ number: tokenNumber, code: tokenCode });
      setSavedRemotely(Boolean(result && !result.demo));
      setBooked(true);
    } catch {
      setError("The demo booking could not be completed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <BrandLogo />
          <div>
            <h1>PrajaReach</h1>
            <p>Right Doctor • Right Hospital • Right Time</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="nav-btn" onClick={() => onNavigate("home")}>
            <ArrowLeft size={16} /> Home
          </button>
          {onChangeRole && (
            <button className="nav-btn" onClick={onChangeRole}>
              Change Role
            </button>
          )}
        </div>
      </header>

      <main className="main">
        <section className="welcome">
          <span>PrajaReach Healthcare</span>
          <h2>Book Appointment</h2>
          <p>Confirm your doctor and get a token for your visit.</p>
        </section>

        {!booked ? (
          <>
            <section
              className="service-card blue"
              style={{ alignItems: "flex-start", marginBottom: "18px" }}
            >
              <div className="service-icon"><UserRound /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3>{doctor.name}</h3>
                  {!selection && <span className="badge info">Sample selection</span>}
                </div>
                <p><UserRound size={15} /> Specialty: {doctor.specialization}</p>
                <p><Hospital size={15} /> {hospital.name}</p>
                <p><Clock size={15} /> Listed availability: {doctor.available_time || "Not listed"}</p>
                {doctor.available ? (
                  <span className="badge success"><CheckCircle size={15} /> Available for booking</span>
                ) : (
                  <span className="badge danger">Currently unavailable</span>
                )}
              </div>
            </section>

            <form
              className="service-card green"
              style={{ alignItems: "flex-start", flexDirection: "column" }}
              onSubmit={confirmBooking}
            >
              <div className="service-icon"><CalendarDays /></div>
              <div style={{ width: "100%" }}>
                <h3>Choose appointment time</h3>
                <p>Select a date and one of the demo time slots.</p>

                <label className="field-label" htmlFor="appointment-date">
                  Appointment date
                </label>
                <input
                  id="appointment-date"
                  className="text-input"
                  type="date"
                  min={getToday()}
                  value={appointmentDate}
                  onChange={(event) => setAppointmentDate(event.target.value)}
                  required
                />

                <label className="field-label" htmlFor="appointment-time">
                  Appointment time
                </label>
                <select
                  id="appointment-time"
                  className="text-input"
                  value={appointmentTime}
                  onChange={(event) => setAppointmentTime(event.target.value)}
                  required
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>

                {error && <p role="alert" style={{ color: "var(--danger-dark)" }}>{error}</p>}

                <button
                  type="submit"
                  disabled={!doctor.available || saving}
                  style={{ marginTop: "18px" }}
                >
                  <CalendarDays size={16} />
                  {saving ? "Generating confirmation…" : "Generate Token & Confirm"}
                </button>
                <p style={{ marginTop: "10px" }}>
                  This is a student-friendly demo flow. Availability and token
                  confirmation are illustrative.
                </p>
              </div>
            </form>
          </>
        ) : (
          <section className="service-card green" style={{ alignItems: "flex-start" }}>
            <div className="service-icon"><CheckCircle /></div>
            <div style={{ width: "100%" }}>
              <h3>Appointment Confirmed</h3>
              <p>Your demo appointment confirmation is ready.</p>
              <div
                style={{
                  margin: "18px 0",
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                }}
              >
                <strong>Demo token</strong>
                <h2 style={{ margin: "6px 0" }}>{token?.code}</h2>
                <p>Token number: {token?.number}</p>
              </div>
              <p><UserRound size={15} /> Doctor: {doctor.name}</p>
              <p><Hospital size={15} /> Hospital: {hospital.name}</p>
              <p><CalendarDays size={15} /> Date: {formatAppointmentDate(appointmentDate)}</p>
              <p><Clock size={15} /> Time: {appointmentTime}</p>
              <p>
                {savedRemotely
                  ? "Saved through the configured hospital service."
                  : "Demo confirmation generated; it is not a real hospital registration."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <button type="button" onClick={() => onNavigate("find")}>
                  <CalendarDays size={16} /> Book Another Doctor
                </button>
                <button type="button" onClick={() => onNavigate("home")}>
                  Back to Dashboard
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Booking;