import { useEffect, useState } from "react";
import {
  Ambulance,
  Hospital,
  MapPin,
  PhoneCall,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import {
  getEmergencyRequests,
  getHospitals,
  updateEmergencyRequest,
} from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function EmergencyDashboard({ onChangeRole }) {
  const [requests, setRequests] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const emergencyData = await getEmergencyRequests();
    const hospitalData = await getHospitals();

    setRequests(emergencyData || []);
    setHospitals((hospitalData || []).filter((h) => h.emergency_available));
  }

  async function updateRequest(id, status) {
    await updateEmergencyRequest(id, status);
    loadData();
  }

  return (
    <div className="app">

      <header className="header">

        <div className="logo">

          <BrandLogo />

          <div>
            <h1>PrajaReach</h1>
            <p>Emergency Support</p>
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

          <span>24×7 Emergency Support</span>

          <h2>Emergency Dashboard</h2>

          <p>
            Respond quickly to emergency healthcare requests.
          </p>

        </section>

        {/* Emergency Helpline */}

        <div className="emergency-box">

          <div>

            <strong>🚨 Emergency Helpline</strong>

            <p>
              For immediate emergency assistance, call 108.
            </p>

          </div>

          <a href="tel:108">
            <button>Call 108</button>
          </a>

        </div>

        {/* Emergency Requests */}

        <section style={{ marginTop: "30px" }}>

          <h2>Emergency Requests</h2>

          {requests.length === 0 ? (

            <div
              className="service-card"
              style={{ marginTop: "15px" }}
            >

              <AlertTriangle />

              <div>

                <h3>No active requests</h3>

                <p>
                  New emergency requests will appear here.
                </p>

              </div>

            </div>

          ) : (

            requests.map((request) => (

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
                    Phone: {request.patient_phone}
                  </p>

                  <p>
                    <MapPin size={15} /> {request.location}
                  </p>

                  <p>
                    Ambulance:{" "}
                    {request.ambulance_required
                      ? "Required"
                      : "No"}
                  </p>

                  <strong>
                    Status: {request.status}
                  </strong>

                  {request.status === "Pending" && (

                    <div style={{ marginTop: "12px" }}>

                      <button
                        onClick={() =>
                          updateRequest(
                            request.id,
                            "Accepted"
                          )
                        }
                      >
                        <CheckCircle size={16} /> Accept
                      </button>

                      <button
                        onClick={() =>
                          updateRequest(
                            request.id,
                            "Resolved"
                          )
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        Resolve
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))

          )}

        </section>

        {/* Emergency Hospitals */}

        <section style={{ marginTop: "35px" }}>

          <h2>Emergency Hospitals</h2>

          {hospitals.map((hospital) => (

            <div
              className="service-card blue"
              key={hospital.id}
              style={{ marginTop: "15px" }}
            >

              <div className="service-icon">
                <Hospital />
              </div>

              <div>

                <h3>{hospital.name}</h3>

                <p>
                  <MapPin size={15} /> {hospital.location}
                </p>

                <p>
                  <PhoneCall size={15} /> {hospital.phone}
                </p>

                <strong>
                  Emergency Available ✓
                </strong>

              </div>

            </div>

          ))}

        </section>

      </main>

    </div>
  );
}

export default EmergencyDashboard;