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
  { key: "symptom", title: "Check Symptoms", desc: "Get basic guidance on common symptoms.", icon: <Stethoscope /> },
  { key: "medicine", title: "Medicine Help", desc: "Ask about medicine availability.", icon: <Pill /> },
  { key: "hospital", title: "Find a Hospital", desc: "Locate the nearest hospital.", icon: <HeartPulse /> },
  { key: "emergency", title: "Emergency", desc: "Connect to emergency assistance.", icon: <Ambulance /> },
];

const GUIDANCE = {
  symptom:
    "For fever, drink fluids and rest. If fever lasts more than 3 days or is very high, visit a doctor.",
  medicine:
    "Tell us the medicine name and we will check availability at nearby hospitals and pharmacies.",
  hospital:
    "The nearest hospitals are Praja General Hospital (Kurnool) and Rural Health Centre (Anantapur).",
  emergency:
    "For emergencies, call 108 immediately. An ambulance can be requested from the Emergency section.",
};

function Health444({ onNavigate, onChangeRole }) {
  const [language, setLanguage] = useState("English");
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("");

  function handleOption(key) {
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
          <span>Voice-based Healthcare</span>
          <h2>444 Health Assistance</h2>
          <p>
            Get healthcare help from any phone — no smartphone or internet
            required.
          </p>
        </section>

        <div className="emergency-box">
          <div>
            <strong>📞 Call 444 for health assistance</strong>
            <p>Available in multiple local languages.</p>
          </div>
          <a href="tel:444">
            <button>
              <PhoneCall size={16} /> Call 444
            </button>
          </a>
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