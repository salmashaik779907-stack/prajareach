import { useEffect, useState } from "react";
import { Search, Pill, Hospital, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { getMedicines } from "../lib/hospitalService";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function MedicineSearch({ onNavigate, onChangeRole }) {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getMedicines().then((data) => {
      if (active) {
        setMedicines(data || []);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = medicines.filter((m) => {
    const text = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(text) ||
      (m.category || "").toLowerCase().includes(text) ||
      (m.hospital_name || "").toLowerCase().includes(text)
    );
  });

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
          <p>Check medicine availability at nearby hospitals and pharmacies.</p>
        </section>

        <div className="search-wrap">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search medicine by name, category or hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <strong>{filtered.length} medicines found</strong>
        </div>

        {loading ? (
          <p>Loading medicines…</p>
        ) : (
          <section>
            {filtered.map((medicine) => (
              <div
                key={medicine.id || medicine.name}
                className={`service-card ${medicine.available ? "green" : "red"}`}
                style={{ marginBottom: "15px" }}
              >
                <div className="service-icon">
                  <Pill />
                </div>
                <div>
                  <h3>{medicine.name}</h3>
                  <p>{medicine.category}</p>
                  <p>
                    <Hospital size={15} /> {medicine.hospital_name}
                  </p>
                  {medicine.available ? (
                    <span className="badge success">
                      <CheckCircle size={16} /> Available
                    </span>
                  ) : (
                    <span className="badge danger">
                      <XCircle size={16} /> Out of stock
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
                  <p>Try another medicine name, category or hospital.</p>
                </div>
              </div>
            )}
          </section>
        )}

        <p className="prototype-note">
          Prototype demo • Medicine stock data is illustrative.
        </p>
      </main>
    </div>
  );
}

export default MedicineSearch;