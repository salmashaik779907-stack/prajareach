import {
  Search,
  CalendarDays,
  Pill,
  Ambulance,
  PhoneCall,
  Languages,
  Mic,
  WifiOff,
  Hospital,
  Droplet,
  Navigation,
  ArrowLeft,
} from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function Home({ onNavigate, onChangeRole }) {
  // The 5 core services. Keys map to existing routes in App.jsx.
  const services = [
    {
      key: "find",
      title: "Find Healthcare",
      desc: "Hospitals, doctors and services near you.",
      icon: <Search />,
      color: "blue",
    },
    {
      key: "booking",
      title: "Book Appointment",
      desc: "Reserve a doctor slot and get a token.",
      icon: <CalendarDays />,
      color: "green",
    },
    {
      key: "medicine",
      title: "Medicine Search",
      desc: "Check medicine availability at hospitals.",
      icon: <Pill />,
      color: "teal",
    },
    {
      key: "emergency",
      title: "Emergency Support",
      desc: "Request an ambulance and emergency help.",
      icon: <Ambulance />,
      color: "red",
    },
    {
      key: "444",
      title: "444 Health Assistance",
      desc: "Voice-based help from any phone.",
      icon: <PhoneCall />,
      color: "purple",
    },
  ];

  // Quick actions that connect to existing pages only.
  const quickActions = [
    {
      key: "find",
      title: "Nearby Emergency Hospital",
      desc: "Locate the closest emergency-ready hospital.",
      icon: <Hospital />,
      color: "orange",
    },
    {
      key: "emergency",
      title: "Blood Bank Search",
      desc: "Check blood group availability nearby.",
      icon: <Droplet />,
      color: "red",
    },
    {
      key: "find",
      title: "Get Directions",
      desc: "Open directions to a hospital or service.",
      icon: <Navigation />,
      color: "blue",
    },
  ];

  // Informational support items (not buttons).
  const supportItems = [
    { title: "Local Languages", desc: "Help in your language", icon: <Languages /> },
    { title: "Voice Assistance", desc: "Speak to get help", icon: <Mic /> },
    { title: "Basic Offline Info", desc: "Works without internet", icon: <WifiOff /> },
    { title: "Emergency Support", desc: "24×7 assistance", icon: <Ambulance /> },
  ];

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
        {onChangeRole && (
          <button className="nav-btn" onClick={onChangeRole}>
            <ArrowLeft size={16} /> Change Role
          </button>
        )}
      </header>

      <main className="main">
        <section className="welcome">
          <span>Patient Dashboard</span>
          <h2>Welcome to PrajaReach</h2>
          <p>
            Your gateway to nearby hospitals, doctors, medicines and emergency
            help — online or from any phone, even without internet.
          </p>
        </section>

        <div className="section-head">
          <h2>Main Services</h2>
          <p>Choose a service to get started.</p>
        </div>

        <section className="services">
          {services.map((service) => (
            <button
              key={service.title}
              className={`service-card ${service.color}`}
              onClick={() => onNavigate(service.key)}
            >
              <div className="service-icon">{service.icon}</div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </button>
          ))}
        </section>

        <div className="section-head">
          <h2>Quick Health Support</h2>
          <p>Fast access to essential help.</p>
        </div>

        <section className="quick-grid">
          {quickActions.map((action) => (
            <button
              key={action.title}
              className={`quick-card ${action.color}`}
              onClick={() => onNavigate(action.key)}
            >
              <div className="quick-icon">{action.icon}</div>
              <div>
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
            </button>
          ))}
        </section>

        <div className="section-head">
          <h2>PrajaReach Support</h2>
        </div>

        <section className="support-strip">
          {supportItems.map((item) => (
            <div className="support-item" key={item.title}>
              <div className="service-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="emergency-box" style={{ marginTop: "28px" }}>
          <div>
            <strong>🚨 In an emergency? Call 108 now</strong>
            <p>24×7 ambulance and emergency response support.</p>
          </div>
          <a href="tel:108">
            <button>
              <PhoneCall size={16} /> Call 108
            </button>
          </a>
        </section>

        <p className="prototype-note">
          Prototype demo • Some services use demonstration data while live
          integrations are being connected.
        </p>
      </main>
    </div>
  );
}

export default Home;