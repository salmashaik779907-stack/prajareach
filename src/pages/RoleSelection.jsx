import {
  UserRound,
  Hospital,
  Building2,
  Ambulance,
  PhoneCall,
  HeartPulse,
} from "lucide-react";

import BrandLogo from "../components/BrandLogo";
import "../styles.css";

function RoleSelection({ onSelect }) {

  return (

    <div className="role-page">

      <div className="role-container">

        <div className="role-logo">

          <BrandLogo />

          <h1>PrajaReach</h1>

          <p>
            Right Doctor • Right Hospital • Right Time
          </p>

        </div>

        <div className="sih-badge">
          SIH 2026 • HealthTech
        </div>

        <div className="role-heading">

          <h2>Welcome to PrajaReach</h2>

          <p>
            Choose how you want to continue
          </p>

        </div>

        <div className="role-grid">

          {/* Patient */}

          <button
            className="role-card patient"
            onClick={() => onSelect("patient")}
          >

            <div className="role-icon">
              <UserRound size={32} />
            </div>

            <h3>Patient</h3>

            <p>
              Find doctors, hospitals and healthcare services.
            </p>

            <span>
              Continue as Patient →
            </span>

          </button>

          {/* Hospital */}

          <button
            className="role-card hospital"
            onClick={() => onSelect("hospital")}
          >

            <div className="role-icon">
              <Hospital size={32} />
            </div>

            <h3>Hospital / Staff</h3>

            <p>
              Manage doctors, schedules, patients and services.
            </p>

            <span>
              Continue as Hospital →
            </span>

          </button>

          {/* Government */}

          <button
            className="role-card government"
            onClick={() => onSelect("government")}
          >

            <div className="role-icon">
              <Building2 size={32} />
            </div>

            <h3>Government</h3>

            <p>
              Monitor healthcare services, hospitals,
              shortages and emergencies.
            </p>

            <span>
              Continue as Government →
            </span>

          </button>

          {/* Emergency */}

          <button
            className="role-card emergency"
            onClick={() => onSelect("emergency")}
          >

            <div className="role-icon">
              <Ambulance size={32} />
            </div>

            <h3>Emergency</h3>

            <p>
              Get urgent healthcare assistance quickly.
            </p>

            <span>
              Get Emergency Help →
            </span>

          </button>

          {/* 444 */}

          <button
            className="role-card tele"
            onClick={() => onSelect("444")}
          >

            <div className="role-icon">
              <PhoneCall size={32} />
            </div>

            <h3>444 Health Assistance</h3>

            <p>
              Get voice-based healthcare assistance
              from any phone.
            </p>

            <span>
              Start 444 Assistance →
            </span>

          </button>

        </div>

        <div className="role-footer">

          <strong>
            No smartphone? No internet? No problem.
          </strong>

          <p>
            PrajaReach connects patients, hospitals,
            government and emergency healthcare support.
          </p>

        </div>

      </div>

    </div>

  );
}

export default RoleSelection;