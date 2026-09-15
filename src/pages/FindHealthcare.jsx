import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  UserRound,
  CalendarDays,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { getHospitals, getDoctors } from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function FindHealthcare({ onNavigate, onBook, onChangeRole }) {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showDoctors, setShowDoctors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const [h, d] = await Promise.all([getHospitals(), getDoctors()]);
      if (!active) return;
      setHospitals(h);
      setDoctors(d);
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const doctorsFor = (hospital) =>
    doctors.filter(
      (doc) =>
        doc.hospital_id === hospital.id ||
        doc.hospital_name === hospital.name
    );

  const filteredHospitals = hospitals.filter((hospital) => {
    const text = search.toLowerCase();
    const hospitalDoctors = doctorsFor(hospital);
    return (
      hospital.name.toLowerCase().includes(text) ||
      hospital.location.toLowerCase().includes(text) ||
      (hospital.services || []).some((s) => s.toLowerCase().includes(text)) ||
      hospitalDoctors.some(
        (doc) =>
          doc.name.toLowerCase().includes(text) ||
          doc.specialization.toLowerCase().includes(text)
      )
    );
  });

  function getDirections(hospital) {
    // Prototype action: open a free OpenStreetMap search in a new tab.
    const query = encodeURIComponent(`${hospital.name} ${hospital.location}`);
    window.open(
      `https://www.openstreetmap.org/search?query=${query}`,
      "_blank"
    );
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
          <h2>Find Healthcare</h2>
          <p>
            Find hospitals, doctors and healthcare services before travelling.
          </p>
        </section>

        <div className="search-wrap">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search hospital, doctor, location or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <strong>{filteredHospitals.length} hospitals available</strong>
        </div>

        {loading ? (
          <div className="service-card">
            <Search />
            <div>
              <h3>Loading hospitals…</h3>
              <p>Fetching the latest availability.</p>
            </div>
          </div>
        ) : (
          <section>
            {filteredHospitals.map((hospital) => {
              const hospitalDoctors = doctorsFor(hospital);
              return (
                <div
                  key={hospital.id}
                  className="service-card blue"
                  style={{ marginBottom: "18px", alignItems: "flex-start" }}
                >
                  <div className="service-icon">
                    <MapPin />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3>{hospital.name}</h3>

                    <p>
                      <MapPin size={15} /> {hospital.location}
                    </p>
                    <p>
                      <Phone size={15} /> {hospital.phone}
                    </p>
                    <p>
                      {hospital.emergency_available ? (
                        <span className="badge success">
                           Emergency Available
                        </span>
                      ) : (
                        <span className="badge pending">
                          Emergency service unavailable
                        </span>
                      )}
                    </p>
                    <p>
                      <strong>Services:</strong>{" "}
                      {(hospital.services || []).join(", ")}
                    </p>

                    <button
                      onClick={() =>
                        setShowDoctors(
                          showDoctors === hospital.id ? null : hospital.id
                        )
                      }
                      style={{ marginTop: "10px", marginRight: "10px" }}
                    >
                      <UserRound size={16} />
                      {showDoctors === hospital.id
                        ? "Hide Doctors"
                        : "View Doctors"}
                    </button>

                    <button
                      onClick={() => getDirections(hospital)}
                      style={{ marginTop: "10px" }}
                    >
                      <MapPin size={16} />
                      Get Directions
                    </button>

                    {showDoctors === hospital.id && (
                      <div
                        style={{
                          marginTop: "18px",
                          paddingTop: "15px",
                          borderTop: "1px solid #ddd",
                        }}
                      >
                        <h3>Doctor Availability</h3>

                        {hospitalDoctors.length === 0 && (
                          <p>No doctors listed for this hospital yet.</p>
                        )}

                        {hospitalDoctors.map((doctor) => (
                          <div
                            key={doctor.id || doctor.name}
                            style={{
                              background: "#f8fafc",
                              padding: "15px",
                              borderRadius: "12px",
                              marginTop: "12px",
                            }}
                          >
                            <h3>{doctor.name}</h3>
                            <p>
                              <strong>{doctor.specialization}</strong>
                            </p>
                            <p>
                              <Clock size={15} /> {doctor.available_time}
                            </p>

                            {doctor.available ? (
                              <>
                                <span className="badge success">✓ Available</span>
                                <button
                                  onClick={() =>
                                    onBook({ doctor, hospital })
                                  }
                                >
                                  <CalendarDays size={16} />
                                  Book Appointment
                                </button>
                              </>
                            ) : (
                              <span className="badge danger">
                                <AlertTriangle size={15} /> Currently
                                Unavailable
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredHospitals.length === 0 && (
              <div className="service-card">
                <Search />
                <div>
                  <h3>No hospitals found</h3>
                  <p>Try searching for another hospital, doctor or location.</p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default FindHealthcare;