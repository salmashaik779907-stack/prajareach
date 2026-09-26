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

const services = [
  {
    key: "find",
    title: "Find Doctor / Hospital",
    desc: "Search nearby facilities, doctors, specialties and availability.",
    icon: <Search />,
    color: "blue",
  },
  {
    key: "booking",
    title: "Appointment Access",
    desc: "Choose a date and time, then get a demo booking token.",
    icon: <CalendarDays />,
    color: "green",
  },
  {
    key: "medicine",
    title: "Medicine Search",
    desc: "Search demo medicine availability by name or category.",
    icon: <Pill />,
    color: "teal",
  },
  {
    key: "emergency",
    title: "Emergency Support",
    desc: "Open the existing emergency support and ambulance request page.",
    icon: <Ambulance />,
    color: "red",
  },
  {
    key: "444",
    title: "444 Health Help",
    desc: "Open simple, general health-guidance categories.",
    icon: <PhoneCall />,
    color: "purple",
  },
];

const quickActions = [
  {
    key: "find",
    title: "Check Doctor Availability",
    desc: "Compare demo doctors, specialties and appointment windows.",
    icon: <Hospital />,
    color: "orange",
  },
  {
    key: "emergency",
    title: "Blood Bank Search",
    desc: "Check demo blood-group availability on the emergency page.",
    icon: <Droplet />,
    color: "red",
  },
  {
    key: "find",
    title: "Get Directions",
    desc: "Open directions to a hospital from the healthcare results.",
    icon: <Navigation />,
    color: "blue",
  },
  {
    key: "444",
    title: "444 Health Help",
    desc: "Browse general health-guidance categories.",
    icon: <PhoneCall />,
    color: "purple",
  },
];

const patientSteps = [
  { number: "1", title: "Find", desc: "Search a hospital, doctor or specialty." },
  { number: "2", title: "Check", desc: "Review hospital details and availability." },
  { number: "3", title: "Book", desc: "Select a date and time for your visit." },
  { number: "4", title: "Token", desc: "Receive a demo appointment confirmation." },
];

const supportItems = [
  { title: "Local Languages", desc: "Guidance labels in familiar languages", icon: <Languages /> },
  { title: "Voice Assistance", desc: "Prototype speech preview", icon: <Mic /> },
  { title: "Basic Offline Info", desc: "Simple help without a live connection", icon: <WifiOff /> },
  { title: "Emergency Support", desc: "Quick access to the emergency page", icon: <Ambulance /> },
];

function Home({ onNavigate, onChangeRole }) {
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
            Find nearby care, check demo availability, book an appointment and
            get a simple confirmation from one patient dashboard.
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
          <h2>Your care journey</h2>
          <p>Follow these steps to complete a demo appointment.</p>
        </div>

        <section className="quick-grid" aria-label="Patient booking steps">
          {patientSteps.map((step) => (
            <div className="quick-card blue" key={step.number}>
              <div className="quick-icon">{step.number}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
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
            <strong>🚨 Need urgent help?</strong>
            <p>
              Open the demo emergency support page for available options. For
              immediate danger, contact your local emergency services.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => onNavigate("emergency")}>
              <Ambulance size={16} /> Emergency Support
            </button>
            <a className="nav-btn" href="tel:108">
              <PhoneCall size={16} /> Call 108
            </a>
          </div>
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