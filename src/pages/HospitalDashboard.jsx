import { useEffect, useState } from "react";
import {
  Hospital, Users, UserRound, Pill, CalendarDays, Ambulance,
  CheckCircle, XCircle, AlertTriangle, ArrowLeft,
} from "lucide-react";
import {
  getDoctors, getMedicines, getAppointments, getEmergencyRequests,
} from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const patientRecords = [
  { id: 1, name: "Ravi Teja", age: 34, condition: "Fracture", status: "Admitted" },
  { id: 2, name: "Lakshmi Devi", age: 58, condition: "Cardiac", status: "Under Observation" },
  { id: 3, name: "Sita Raman", age: 27, condition: "Maternity", status: "Admitted" },
];

function HospitalDashboard({ onChangeRole }) {
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    let active = true;
    async function load() {
      const [doc, med, appt, emerge] = await Promise.all([
        getDoctors(), getMedicines(), getAppointments(), getEmergencyRequests(),
      ]);
      if (!active) return;
      setDoctors(doc || []);
      setMedicines(med || []);
      setAppointments(appt || []);
      setEmergencies(emerge || []);
    }
    load();
    return () => { active = false; };
  }, []);

  const pendingAlerts = emergencies.filter((e) => e.status === "Pending");

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <BrandLogo />
          <div>
            <h1>PrajaReach</h1>
            <p>Hospital / Staff Dashboard</p>
          </div>
        </div>
        {onChangeRole && (
          <button className="nav-btn" onClick={onChangeRole}>
            <ArrowLeft size={16} /> Change Role
          </button>
        )}
      </header>

      <main className="main">
        <section className="welcome">
          <span>Hospital Management</span>
          <h2>Welcome, Hospital Staff</h2>
          <p>Manage doctors, medicines, appointments and emergency requests.</p>
        </section>

        <section className="services">
          <div className="service-card blue">
            <div className="service-icon"><UserRound /></div>
            <div><h3>Doctors</h3><p>{doctors.length} doctors registered</p></div>
          </div>
          <div className="service-card green">
            <div className="service-icon"><Pill /></div>
            <div><h3>Medicines</h3><p>{medicines.length} medicines listed</p></div>
          </div>
          <div className="service-card purple">
            <div className="service-icon"><CalendarDays /></div>
            <div><h3>Appointments</h3><p>{appointments.length} bookings</p></div>
          </div>
          <div className="service-card red">
            <div className="service-icon"><Ambulance /></div>
            <div><h3>Emergency Alerts</h3><p>{pendingAlerts.length} pending</p></div>
          </div>
        </section>

        <section style={{ marginTop: "30px" }}>
          <h2>Doctor Availability</h2>
          {doctors.map((doctor) => (
            <div key={doctor.id || doctor.name} className="service-card" style={{ marginTop: "15px" }}>
              <div className="service-icon"><Users /></div>
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>{doctor.available_time}</p>
                {doctor.available ? (
                  <span className="badge success">
                    <CheckCircle size={16} /> Available
                  </span>
                ) : (
                  <span className="badge danger">
                    <XCircle size={16} /> Not Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: "30px" }}>
          <h2>Emergency Alerts</h2>
          {pendingAlerts.length === 0 ? (
            <div className="service-card" style={{ marginTop: "15px" }}>
              <CheckCircle />
              <div><h3>No pending alerts</h3><p>All emergency requests are handled.</p></div>
            </div>
          ) : (
            pendingAlerts.map((req) => (
              <div key={req.id} className="service-card red" style={{ marginTop: "15px" }}>
                <div className="service-icon"><AlertTriangle /></div>
                <div>
                  <h3>{req.emergency_type}</h3>
                  <p>Patient: {req.patient_name}</p>
                  <p>Location: {req.location}</p>
                  <p>Ambulance: {req.ambulance_required ? "Required" : "No"}</p>
                  <strong>Status: {req.status}</strong>
                </div>
              </div>
            ))
          )}
        </section>

        <section style={{ marginTop: "30px" }}>
          <h2>Patient Records</h2>
          {patientRecords.map((p) => (
            <div key={p.id} className="service-card purple" style={{ marginTop: "15px" }}>
              <div className="service-icon"><UserRound /></div>
              <div>
                <h3>{p.name}</h3>
                <p>Age: {p.age}</p>
                <p>Condition: {p.condition}</p>
                <strong>{p.status}</strong>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HospitalDashboard;