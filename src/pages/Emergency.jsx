import { useEffect, useState } from "react";
import {
  Ambulance,
  AlertTriangle,
  PhoneCall,
  MapPin,
  CheckCircle,
  Droplet,
  Hospital,
  ArrowLeft,
} from "lucide-react";
import { getHospitals, createEmergencyRequest } from "../lib/hospitalService";
import { demoBloodBanks } from "../lib/demoData";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const EMERGENCY_TYPES = [
  "Road Accident",
  "Cardiac Emergency",
  "Pregnancy / Delivery",
  "Severe Injury",
  "Breathing Difficulty",
  "Other",
];

function Emergency({ onNavigate, onChangeRole }) {
  const [hospitals, setHospitals] = useState([]);
  const [type, setType] = useState(EMERGENCY_TYPES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [ambulance, setAmbulance] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [bloodGroup, setBloodGroup] = useState("");

  useEffect(() => {
    let active = true;
    getHospitals().then((data) => {
      if (active) {
        setHospitals(
          (data || []).filter((h) => h.emergency_available)
        );
      }
    });
    return () => {
      active = false;
    };
  }, []);

  async function submitRequest(e) {
    if (e) e.preventDefault();
    await createEmergencyRequest({
      emergency_type: type,
      patient_name: name || "Unknown",
      patient_phone: phone || "Not provided",
      location: location || "Unknown",
      ambulance_required: ambulance,
      status: "Pending",
    });
    setStatus(ambulance ? "Ambulance requested" : "Pending");
    setSubmitted(true);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <BrandLogo />
          <div>
            <h1>PrajaReach</h1>
            <p>24×7 Emergency Support</p>
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
          <span>Emergency</span>
          <h2>Get Emergency Help</h2>
          <p>Request an ambulance and find the nearest emergency hospital.</p>
        </section>

        <div className="emergency-box">
          <div>
            <strong>🚨 Emergency Helpline</strong>
            <p>For immediate emergency assistance, call 108.</p>
          </div>
          <a href="tel:108">
            <button>
              <PhoneCall size={16} /> Call 108
            </button>
          </a>
        </div>

        {submitted ? (
          <section className="service-card green" style={{ marginTop: "20px" }}>
            <div className="service-icon">
              <CheckCircle />
            </div>
            <div>
              <h3>Request Submitted</h3>
              <p>
                Type: <strong>{type}</strong>
              </p>
              <p>Location: {location || "Unknown"}</p>
              <p>
                Ambulance: {ambulance ? "Requested" : "Not requested"}
              </p>
              <p>
                Status: <strong>{status}</strong>
              </p>
              <p style={{ marginTop: "8px" }}>
                <em>
                  Prototype demo • Requests are shown to the responder
                  dashboard when Supabase is configured.
                </em>
              </p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: "12px" }}>
                Raise Another Request
              </button>
            </div>
          </section>
        ) : (
          <form
            onSubmit={submitRequest}
            className="service-card red"
            style={{ marginTop: "20px", alignItems: "flex-start", flexDirection: "column" }}
          >
            <h3>
              <AlertTriangle size={18} /> Emergency Request
            </h3>

            <label className="field-label">Emergency type</label>
            <div className="chip-row">
              {EMERGENCY_TYPES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`chip ${type === t ? "active" : ""}`}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="field-label">Patient name</label>
            <input
              className="text-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient name"
            />

            <label className="field-label">Phone number</label>
            <input
              className="text-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter contact number"
            />

            <label className="field-label">Location / landmark</label>
            <input
              className="text-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where is the emergency?"
            />

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={ambulance}
                onChange={(e) => setAmbulance(e.target.checked)}
              />
              Request ambulance
            </label>

            <button type="submit" style={{ marginTop: "15px" }}>
              Submit Emergency Request
            </button>
          </form>
        )}

        <section style={{ marginTop: "35px" }}>
          <h2>Nearest Emergency Hospitals</h2>
          {hospitals.length === 0 ? (
            <p style={{ marginTop: "10px" }}>
              Loading emergency hospitals…
            </p>
          ) : (
            hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="service-card blue"
                style={{ marginTop: "15px" }}
              >
                <div className="service-icon">
                  <Hospital />
                </div>
                <div style={{ flex: 1 }}>
                  <h3>{hospital.name}</h3>
                  <p>
                    <MapPin size={15} /> {hospital.location}
                  </p>
                  <p>
                    <PhoneCall size={15} /> {hospital.phone}
                  </p>
                  <button
                    style={{ marginTop: "10px" }}
                    onClick={() =>
                      window.open(
                        `https://www.openstreetmap.org/search?query=${encodeURIComponent(
                          hospital.name + " " + hospital.location
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <MapPin size={16} /> Get Directions
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <section style={{ marginTop: "35px" }}>
          <h2>
            <Droplet size={20} /> Blood Bank Availability
          </h2>
          <input
            className="text-input"
            placeholder="Search blood group (e.g. O+)"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
          {demoBloodBanks
            .filter((b) =>
              b.groups.some((g) =>
                g.toLowerCase().includes(bloodGroup.toLowerCase())
              )
            )
            .map((bank) => (
              <div
                key={bank.id}
                className="service-card red"
                style={{ marginTop: "15px" }}
              >
                <div className="service-icon">
                  <Droplet />
                </div>
                <div>
                  <h3>{bank.name}</h3>
                  <p>
                    <MapPin size={15} /> {bank.location}
                  </p>
                  <p>
                    <PhoneCall size={15} /> {bank.phone}
                  </p>
                  <p>Available: {bank.groups.join(", ")}</p>
                </div>
              </div>
            ))}
        </section>

        <p className="prototype-note">
          Prototype demo • Blood bank and hospital data are illustrative.
        </p>
      </main>
    </div>
  );
}

export default Emergency;