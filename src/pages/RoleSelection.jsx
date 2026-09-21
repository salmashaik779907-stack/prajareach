import {
  UserRound,
  Hospital,
  Building2,
  Ambulance,
  PhoneCall,
  Languages,
  Mic,
  WifiOff,
} from "lucide-react";

import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function RoleSelection({ onSelect }) {
  const roles = [
    {
      key: "patient",
      className: "patient",
      icon: <UserRound size={30} />,
      title: "Patient",
      desc: "Find doctors, hospitals & medicines",
      chips: ["Find Healthcare", "Book Token", "Medicines"],
      cta: "Continue as Patient",
    },
    {
      key: "hospital",
      className: "hospital",
      icon: <Hospital size={30} />,
      title: "Hospital / Staff",
      desc: "Manage doctors, schedules & patients",
      chips: ["Doctors", "Schedules", "Patients"],
      cta: "Continue as Hospital",
    },
    {
      key: "government",
      className: "government",
      icon: <Building2 size={30} />,
      title: "Government",
      desc: "Monitor healthcare services & reports",
      chips: ["Reports", "Hospitals", "Shortages"],
      cta: "Continue as Government",
    },
    {
      key: "emergency",
      className: "emergency",
      icon: <Ambulance size={30} />,
      title: "Emergency",
      desc: "Get urgent healthcare assistance",
      chips: ["Ambulance", "Emergency Hospital", "Blood Bank"],
      cta: "Get Emergency Help",
    },
    {
      key: "444",
      className: "tele",
      icon: <PhoneCall size={30} />,
      title: "444 Health Assistance",
      desc: "Get simple healthcare guidance",
      chips: ["Voice Help", "Local Language", "Basic Guidance"],
      cta: "Start 444 Assistance",
    },
  ];

  const support = [
    { icon: <Languages />, label: "Local Languages" },
    { icon: <Mic />, label: "Voice Assistance" },
    { icon: <WifiOff />, label: "Basic Offline Support" },
    { icon: <Ambulance />, label: "Emergency Support" },
  ];

  return (
    <div className="role-page">
      <div className="role-container">
        <div className="role-logo">
          <BrandLogo />
          <h1>PrajaReach</h1>
          <p className="role-tagline">
            Right Doctor • Right Hospital • Right Time
          </p>
        </div>

        <div className="sih-badge">SIH 2026 • HealthTech</div>

        <div className="role-heading">
          <h2>Welcome to PrajaReach</h2>
          <p className="role-subtitle">
            Connecting Patients, Hospitals & Government
          </p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <button
              key={role.key}
              className={`role-card ${role.className}`}
              onClick={() => onSelect(role.key)}
            >
              <div className="role-icon">{role.icon}</div>

              <h3>{role.title}</h3>
              <p>{role.desc}</p>

              <div className="role-chips">
                {role.chips.map((chip) => (
                  <span className="role-chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>

              <span className="role-cta">{role.cta} →</span>
            </button>
          ))}
        </div>

        <div className="role-support">
          <h3>PrajaReach Support</h3>
          <div className="role-support-grid">
            {support.map((item) => (
              <div className="role-support-item" key={item.label}>
                <span className="role-support-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="role-footer">
          <strong>No smartphone? No internet? No problem.</strong>
          <p>
            PrajaReach connects patients, hospitals, government and emergency
            healthcare support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;