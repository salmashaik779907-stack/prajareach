import { useEffect, useState } from "react";
import {
  Building2,
  Users,
  Pill,
  CalendarDays,
  Ambulance,
  AlertTriangle,
  FileWarning,
  Activity,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import {
  getHospitals,
  getDoctors,
  getMedicines,
  getAppointments,
  getEmergencyRequests,
  getReports,
} from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function GovernmentDashboard({ onChangeRole }) {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [h, d, m, a, e, r] = await Promise.all([
      getHospitals(),
      getDoctors(),
      getMedicines(),
      getAppointments(),
      getEmergencyRequests(),
      getReports(),
    ]);

    setHospitals(h || []);
    setDoctors(d || []);
    setMedicines(m || []);
    setAppointments(a || []);
    setEmergencies(e || []);
    setReports(r || []);
  }

  const availableDoctors = doctors.filter(
    (doctor) => doctor.available
  );

  const availableMedicines = medicines.filter(
    (medicine) => medicine.available
  );

  const pendingEmergencies = emergencies.filter(
    (request) => request.status === "Pending"
  );

  return (
    <div className="app">

      <header className="header">

        <div className="logo">

          <BrandLogo />

          <div>
            <h1>PrajaReach</h1>
            <p>Government Healthcare Dashboard</p>
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

          <span>Healthcare Monitoring</span>

          <h2>Government Dashboard</h2>

          <p>
            Monitor hospitals, healthcare services, emergencies
            and reported shortages.
          </p>

        </section>

        {/* Statistics */}

        <section className="services">

          <div className="service-card blue">
            <div className="service-icon">
              <Building2 />
            </div>

            <div>
              <h3>Hospitals</h3>
              <p>{hospitals.length} registered hospitals</p>
            </div>
          </div>

          <div className="service-card green">
            <div className="service-icon">
              <Users />
            </div>

            <div>
              <h3>Available Doctors</h3>
              <p>{availableDoctors.length} doctors available</p>
            </div>
          </div>

          <div className="service-card purple">
            <div className="service-icon">
              <Pill />
            </div>

            <div>
              <h3>Medicines</h3>
              <p>{availableMedicines.length} available</p>
            </div>
          </div>

          <div className="service-card orange">
            <div className="service-icon">
              <CalendarDays />
            </div>

            <div>
              <h3>Appointments</h3>
              <p>{appointments.length} bookings</p>
            </div>
          </div>

          <div className="service-card red">
            <div className="service-icon">
              <Ambulance />
            </div>

            <div>
              <h3>Emergency Requests</h3>
              <p>{pendingEmergencies.length} pending</p>
            </div>
          </div>

          <div className="service-card blue">
            <div className="service-icon">
              <FileWarning />
            </div>

            <div>
              <h3>Hospital Reports</h3>
              <p>{reports.length} reports</p>
            </div>
          </div>

        </section>

        {/* Emergency Monitoring */}

        <section style={{ marginTop: "35px" }}>

          <h2>Emergency Monitoring</h2>

          {pendingEmergencies.length === 0 ? (

            <div
              className="service-card"
              style={{ marginTop: "15px" }}
            >
              <CheckCircle />

              <div>
                <h3>No pending emergencies</h3>
                <p>
                  There are currently no pending emergency requests.
                </p>
              </div>
            </div>

          ) : (

            pendingEmergencies.map((request) => (

              <div
                className="service-card red"
                key={request.id}
                style={{ marginTop: "15px" }}
              >

                <div className="service-icon">
                  <AlertTriangle />
                </div>

                <div>

                  <h3>{request.emergency_type}</h3>

                  <p>
                    Patient: {request.patient_name}
                  </p>

                  <p>
                    Location: {request.location}
                  </p>

                  <p>
                    Ambulance:{" "}
                    {request.ambulance_required
                      ? "Required"
                      : "Not required"}
                  </p>

                  <strong>
                    Status: {request.status}
                  </strong>

                </div>

              </div>

            ))

          )}

        </section>

        {/* Hospital Monitoring */}

        <section style={{ marginTop: "35px" }}>

          <h2>Hospital Monitoring</h2>

          {hospitals.map((hospital) => (

            <div
              className="service-card blue"
              key={hospital.id}
              style={{ marginTop: "15px" }}
            >

              <div className="service-icon">
                <Building2 />
              </div>

              <div>

                <h3>{hospital.name}</h3>

                <p>{hospital.location}</p>

                <p>
                  Emergency:{" "}
                  {hospital.emergency_available
                    ? "Available"
                    : "Not Available"}
                </p>

                <p>
                  Services:{" "}
                  {hospital.services?.join(", ")}
                </p>

              </div>

            </div>

          ))}

        </section>

        {/* Shortage / Reports */}

        <section style={{ marginTop: "35px" }}>

          <h2>Healthcare Reports</h2>

          {reports.length === 0 ? (

            <div
              className="service-card"
              style={{ marginTop: "15px" }}
            >

              <Activity />

              <div>
                <h3>No reports yet</h3>
                <p>
                  Hospital shortage and service reports will appear here.
                </p>
              </div>

            </div>

          ) : (

            reports.map((report) => (

              <div
                className="service-card orange"
                key={report.id}
                style={{ marginTop: "15px" }}
              >

                <div className="service-icon">
                  <FileWarning />
                </div>

                <div>

                  <h3>{report.report_type}</h3>

                  <p>
                    Hospital: {report.hospital_name}
                  </p>

                  <p>
                    Location: {report.location}
                  </p>

                  <p>
                    {report.description}
                  </p>

                  <strong>
                    Status: {report.status}
                  </strong>

                </div>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default GovernmentDashboard;