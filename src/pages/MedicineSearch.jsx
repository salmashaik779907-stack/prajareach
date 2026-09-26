import { useEffect, useState } from "react";
import { Search, Pill, Hospital, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { getMedicines } from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const asText = (value) => String(value || "").toLowerCase();

function MedicineSearch({ onNavigate, onChangeRole }) {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await getMedicines();
        if (!active) return;
        setMedicines(data || []);
        setError("");
      } catch {
        if (active) {
          setError("Medicine listings could not be loaded. Please try again.");
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

  const query = search.trim().toLowerCase();
  const filtered = medicines.filter((medicine) =>
    [medicine.name, medicine.category, medicine.hospital_name].some((value) =>
      asText(value).includes(query)
    )
  );
  const availableCount = medicines.filter((medicine) => medicine.available).length;

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <BrandLogo />
          <div>
            <h1>PrajaReach</h1>
            <p>Medicine Availability</p>
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
          <h2>Medicine Search</h2>
          <p>
            Search the demo medicine directory by name, category or hospital.
            Confirm availability directly with the hospital or pharmacy.
          </p>
        </section>

        <div className="search-wrap">
          <Search size={20} className="search-icon" />
          <input
            type="search"
            aria-label="Search medicines"
            placeholder="Search medicine, category or hospital..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <section className="quick-grid" aria-label="Medicine search summary">
          <div className="quick-card teal">
            <div className="quick-icon"><Pill size={20} /></div>
            <div>
              <h3>{filtered.length} results</h3>
              <p>{query ? "Matching demo listings" : "All demo listings"}</p>
            </div>
          </div>
          <div className="quick-card green">
            <div className="quick-icon"><CheckCircle size={20} /></div>
            <div>
              <h3>{availableCount} available</h3>
              <p>Availability shown in the directory</p>
            </div>
          </div>
        </section>

        {error && (
          <div className="emergency-box" role="alert" style={{ marginTop: "20px" }}>
            <div>
              <strong>We could not load medicine listings</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div style={{ margin: "26px 0 20px" }}>
          <strong>{query ? `${filtered.length} matching medicines` : "Available demo medicines"}</strong>
        </div>

        {loading ? (
          <div className="service-card">
            <Search />
            <div>
              <h3>Loading medicines…</h3>
              <p>Fetching the demo directory.</p>
            </div>
          </div>
        ) : (
          <section>
            {filtered.map((medicine) => (
              <div
                key={medicine.id || `${medicine.name}-${medicine.hospital_name}`}
                className={`service-card ${medicine.available ? "green" : "red"}`}
                style={{ marginBottom: "15px" }}
              >
                <div className="service-icon"><Pill /></div>
                <div>
                  <h3>{medicine.name || "Medicine not named"}</h3>
                  <p><strong>Category:</strong> {medicine.category || "Not listed"}</p>
                  <p><Hospital size={15} /> {medicine.hospital_name || "Hospital not listed"}</p>
                  {medicine.available ? (
                    <span className="badge success">
                      <CheckCircle size={16} /> Available in demo listing
                    </span>
                  ) : (
                    <span className="badge danger">
                      <XCircle size={16} /> Not available in demo listing
                    </span>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="service-card">
                <Search />
                <div>
                  <h3>No medicines found</h3>
                  <p>Try another medicine, category or hospital name.</p>
                </div>
              </div>
            )}
          </section>
        )}

        <p className="prototype-note">
          Prototype demo • Medicine stock data is illustrative. Confirm current
          availability and dosage suitability with a qualified pharmacist or clinician.
        </p>
      </main>
    </div>
  );
}

export default MedicineSearch;