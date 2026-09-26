import { useState } from "react";
import {
  PhoneCall,
  Mic,
  Languages,
  HeartPulse,
  Ambulance,
  Pill,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

const LANGUAGES = ["English", "हिन्दी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ"];

const HELP_OPTIONS = [
  {
    key: "symptom",
    title: "General Symptom Guidance",
    desc: "Read general comfort and monitoring information.",
    icon: <Stethoscope />,
  },
  {
    key: "medicine",
    title: "Medicine Information",
    desc: "Find demo listings and learn safe next steps.",
    icon: <Pill />,
  },
  {
    key: "hospital",
    title: "Find a Hospital",
    desc: "Search demo hospitals, services and directions.",
    icon: <HeartPulse />,
  },
  {
    key: "emergency",
    title: "Emergency Support",
    desc: "Open the existing emergency support page.",
    icon: <Ambulance />,
  },
];

const GUIDANCE = {
  symptom:
    "General information only: rest, drink fluids and monitor symptoms. This is not a diagnosis. Contact a qualified clinician for persistent, severe or worsening symptoms.",
  medicine:
    "Use Medicine Search to view illustrative listings. Do not start, stop or change a medicine without advice from a qualified clinician or pharmacist.",
  hospital:
    "Use Find Healthcare to search demo hospitals and check listed services. Confirm details directly with the hospital before travelling.",
  emergency:
    "For immediate danger, contact your local emergency services. The button below opens the existing Emergency page; this prototype is not a live emergency dispatch service.",
};

function Health444({ onNavigate, onChangeRole }) {
  const [language, setLanguage] = useState("English");
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("");

  function handleOption(key) {
    if (key === "emergency") {
      if (onNavigate) onNavigate("emergency");
      return;
    }
    setResponse(GUIDANCE[key]);
  }

  function toggleMic() {
    // Prototype only: no real speech service is connected.
    setListening((prev) => !prev);
    if (!listening) {
      setResponse(
        "🎤 Voice input is a prototype preview. In the full version, 444 would understand your spoken request."
      );
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <BrandLogo />
          <div>
            <h1>PrajaReach</h1>
            <p>444 Health Assistance</p>
          </div>
        </div>
        <div className="header-actions">
          {onNavigate && (
            <button className="nav-btn" onClick={() => onNavigate("home")}>
              <ArrowLeft size={16} /> Home
            </button>
          )}
          {onChangeRole && (
            <button className="nav-btn" onClick={onChangeRole}>
              Change Role
            </button>
          )}
        </div>
      </header>

      <main className="main">
        <section className="welcome">
          <span>Prototype Health Help</span>
          <h2>444 Health Assistance</h2>
          <p>
            Explore simple, general health-guidance categories. This interface
            does not diagnose conditions or replace a qualified healthcare professional.
          </p>
        </section>

        <div className="emergency-box">
          <div>
            <strong>📞 444 Health Help</strong>
            <p>Prototype interface for general guidance. No live call or emergency service is connected here.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => onNavigate && onNavigate("emergency")}>
              <Ambulance size={16} /> Open Emergency Support
            </button>
            <a className="nav-btn" href="tel:444">
              <PhoneCall size={16} /> Call 444
            </a>
          </div>
        </div>

        <section style={{ marginTop: "25px" }}>
          <h3>
            <Languages size={18} /> Choose Language
          </h3>
          <div className="chip-row">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                className={`chip ${language === lang ? "active" : ""}`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "25px" }}>
          <h3>How can we help?</h3>
          <div className="services">
            {HELP_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className="service-card purple"
                onClick={() => handleOption(opt.key)}
              >
                <div className="service-icon">{opt.icon}</div>
                <div>
                  <h3>{opt.title}</h3>
                  <p>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "25px", textAlign: "center" }}>
          <button
            className={`mic-btn ${listening ? "listening" : ""}`}
            onClick={toggleMic}
          >
            <Mic size={28} />
          </button>
          <p style={{ marginTop: "10px" }}>
            {listening ? "Listening… (prototype)" : "Tap to speak (prototype)"}
          </p>
        </section>

        {response && (
          <section className="service-card green" style={{ marginTop: "20px" }}>
            <div className="service-icon">
              <HeartPulse />
            </div>
            <div>
              <h3>Assistance ({language})</h3>
              <p>{response}</p>
            </div>
          </section>
        )}

        <p className="prototype-note">
          Prototype demo • Voice recognition and AI responses are illustrative
          and not connected to a live service.
        </p>
      </main>
    </div>
  );
}

export default Health444;