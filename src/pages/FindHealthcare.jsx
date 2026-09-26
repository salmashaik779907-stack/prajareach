import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  UserRound,
  CalendarDays,
  AlertTriangle,
  Ambulance,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { getHospitals, getDoctors } from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const asText = (value) => String(value || "").toLowerCase();

function doctorMatches(doctor, query) {
  return [
    doctor.name,
    doctor.specialization,
    doctor.hospital_name,
    doctor.available_time,
  ].some((value) => asText(value).includes(query));
}

function FindHealthcare({ onNavigate, onBook, onChangeRole }) {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showDoctors, setShowDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [hospitalData, doctorData] = await Promise.all([
          getHospitals(),
          getDoctors(),
        ]);
        if (!active) return;
        setHospitals(hospitalData || []);
        setDoctors(doctorData || []);
        setError("");
      } catch {
        if (active) {
          setError("Healthcare listings could not be loaded. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const doctorsFor = (hospital) =>
    doctors.filter(
      (doctor) =>
        String(doctor.hospital_id) === String(hospital.id) ||
        doctor.hospital_name === hospital.name
    );

  const query = search.trim().toLowerCase();
  const filteredHospitals = hospitals.filter((hospital) => {
    const hospitalDoctors = doctorsFor(hospital);
    const searchableValues = [
      hospital.name,
      hospital.location,
      hospital.phone,
      ...(hospital.services || []),
      ...hospitalDoctors.flatMap((doctor) => [
        doctor.name,
        doctor.specialization,
        doctor.hospital_name,
        doctor.available_time,
      ]),
    ];
    return !query || searchableValues.some((value) => asText(value).includes(query));
  });

  const matchingDoctors = query
    ? doctors.filter((doctor) => doctorMatches(doctor, query))
    : [];
  const availableDoctorCount = doctors.filter((doctor) => doctor.available).length;

  function getDirections(hospital) {
    if (!hospital?.name || !hospital?.location) return;
    const locationQuery = encodeURIComponent(`${hospital.name} ${hospital.location}`);
    window.open(
      `https://www.openstreetmap.org/search?query=${locationQuery}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function toggleDoctors(hospitalId) {
    setShowDoctors((current) => (current === hospitalId ? null : hospitalId));
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
            Search the demo directory by hospital, doctor, specialty, location
            or service, then check availability before you travel.
          </p>
        </section>

        <div className="search-wrap">
          <Search size={20} className="search-icon" />
          <input
            type="search"
            aria-label="Search hospitals and doctors"
            placeholder="Search hospital, doctor, specialty, location or service..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <section className="quick-grid" aria-label="Healthcare search summary">
          <div className="quick-card blue">
            <div className="quick-icon"><MapPin size={20} /></div>
            <div>
              <h3>{filteredHospitals.length} hospitals</h3>
              <p>Matching facilities in the directory</p>
            </div>
          </div>
          <div className="quick-card teal">
            <div className="quick-icon"><UserRound size={20} /></div>
            <div>
              <h3>{query ? matchingDoctors.length : doctors.length} doctors</h3>
              <p>{query ? "Doctors matching your search" : "Doctors in the directory"}</p>
            </div>
          </div>
          <div className="quick-card green">
            <div className="quick-icon"><Clock size={20} /></div>
            <div>
              <h3>{availableDoctorCount} available</h3>
              <p>Check a listed time before booking</p>
            </div>
          </div>
        </section>

        {error && (
          <div className="emergency-box" role="alert" style={{ marginTop: "20px" }}>
            <div>
              <strong>We could not load the directory</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div style={{ margin: "26px 0 20px" }}>
          <strong>
            {query ? `${filteredHospitals.length} matching hospitals` : "All hospitals"}
          </strong>
        </div>

        {loading ? (
          <div className="service-card">
            <Search />
            <div>
              <h3>Loading hospitals and doctors…</h3>
              <p>Fetching the latest demo availability.</p>
            </div>
          </div>
        ) : (
          <section>
            {filteredHospitals.map((hospital) => {
              const hospitalDoctors = doctorsFor(hospital);
              const availableDoctors = hospitalDoctors.filter(
                (doctor) => doctor.available
              );
              return (
                <div
                  key={hospital.id || hospital.name}
                  className="service-card blue"
                  style={{ marginBottom: "18px", alignItems: "flex-start" }}
                >
                  <div className="service-icon">
                    <MapPin />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3>{hospital.name}</h3>

                    <p>
                      <MapPin size={15} /> {hospital.location || "Location not listed"}
                    </p>
                    <p>
                      <Phone size={15} /> {hospital.phone || "Phone not listed"}
                    </p>
                    <p>
                      {hospital.emergency_available ? (
                        <span className="badge success">
                          <Ambulance size={14} /> Emergency available
                        </span>
                      ) : (
                        <span className="badge pending">
                          Emergency service unavailable
                        </span>
                      )}
                      <span className="badge info">
                        {availableDoctors.length} of {hospitalDoctors.length} doctors available
                      </span>
                    </p>
                    <p>
                      <strong>Services:</strong>{" "}
                      {(hospital.services || []).join(", ") || "Not listed"}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <button type="button" onClick={() => toggleDoctors(hospital.id)}>
                        <UserRound size={16} />
                        {showDoctors === hospital.id
                          ? "Hide Doctors"
                          : "View Doctors & Availability"}
                      </button>
                      <button type="button" onClick={() => getDirections(hospital)}>
                        <MapPin size={16} /> Get Directions
                      </button>
                    </div>

                    {showDoctors === hospital.id && (
                      <div
                        style={{
                          marginTop: "18px",
                          paddingTop: "15px",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <h3>Doctor Availability</h3>
                        <p>Specialty and listed time are shown for this hospital.</p>

                        {hospitalDoctors.length === 0 && (
                          <p>No doctors listed for this hospital yet.</p>
                        )}

                        {hospitalDoctors.map((doctor) => (
                          <div
                            key={doctor.id || `${hospital.id}-${doctor.name}`}
                            style={{
                              background: "#f8fafc",
                              padding: "15px",
                              borderRadius: "12px",
                              marginTop: "12px",
                            }}
                          >
                            <h3>{doctor.name}</h3>
                            <p>
                              <strong>Specialty:</strong> {doctor.specialization || "Not listed"}
                            </p>
                            <p>
                              <Clock size={15} /> {doctor.available_time || "Time not listed"}
                            </p>

                            {doctor.available ? (
                              <>
                                <span className="badge success">
                                  <CheckCircle size={15} /> Available
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onBook({ doctor, hospital })}
                                >
                                  <CalendarDays size={16} /> Book Appointment
                                </button>
                              </>
                            ) : (
                              <span className="badge danger">
                                <AlertTriangle size={15} /> Currently unavailable
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
                  <p>Try a hospital, doctor, specialty, location or service name.</p>
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