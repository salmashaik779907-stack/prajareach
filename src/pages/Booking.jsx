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

function Booking({ selection, onNavigate, onChangeRole }) {
  const chosen = selection || DEFAULT_SELECTION;
  const { doctor, hospital } = chosen;

  const [booked, setBooked] = useState(false);
  const [token, setToken] = useState(null);
  const [savedRemotely, setSavedRemotely] = useState(false);

  async function confirmBooking() {
    const newToken = Math.floor(Math.random() * 20) + 1;
    setToken(newToken);
    setBooked(true);

    const result = await saveAppointment({
      doctor_name: doctor.name,
      specialization: doctor.specialization,
      hospital_name: hospital.name,
      token: newToken,
      status: "Confirmed",
    });
    setSavedRemotely(result && !result.demo);
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
          <div className="service-card green" style={{ alignItems: "flex-start" }}>
            <div className="service-icon">
              <CalendarDays />
            </div>
            <div style={{ flex: 1 }}>
              <h3>{doctor.name}</h3>
              <p>
                <UserRound size={15} /> {doctor.specialization}
              </p>
              <p>
                <Hospital size={15} /> {hospital.name}
              </p>
              <p>
                <Clock size={15} /> Available: {doctor.available_time}
              </p>

              <button onClick={confirmBooking} style={{ marginTop: "15px" }}>
                Confirm Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="emergency-box">
            <div>
              <strong>
                <CheckCircle size={18} /> Appointment Confirmed!
              </strong>
              <p>Doctor: {doctor.name}</p>
              <p>Hospital: {hospital.name}</p>
              <p>{doctor.specialization}</p>
              <h2>🎟️ Token Number: {token}</h2>
              <p>Please reach the hospital before your appointment time.</p>
              <p style={{ marginTop: "8px" }}>
                <em>
                  {savedRemotely
                    ? "Saved to hospital records."
                    : "Demo booking (not persisted — Supabase not configured)."}
                </em>
              </p>
              <button
                onClick={() => onNavigate("home")}
                style={{ marginTop: "12px" }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Booking;