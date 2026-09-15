import { useState } from "react";

import RoleSelection from "./pages/RoleSelection";
import Home from "./pages/Home";
import FindHealthcare from "./pages/FindHealthcare";
import Booking from "./pages/Booking";
import MedicineSearch from "./pages/MedicineSearch";
import Emergency from "./pages/Emergency";
import Health444 from "./pages/Health444";
import HospitalDashboard from "./pages/HospitalDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import EmergencyDashboard from "./pages/EmergencyDashboard";

function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("home");
  const [booking, setBooking] = useState(null);

  function changeRole() {
    setRole(null);
    setPage("home");
    setBooking(null);
  }

  function startBooking(selection) {
    setBooking(selection);
    setPage("booking");
  }

  if (role === null) {
    return <RoleSelection onSelect={setRole} />;
  }

  // Patient flow
  if (role === "patient") {
    if (page === "find") {
      return (
        <FindHealthcare
          onNavigate={setPage}
          onBook={startBooking}
          onChangeRole={changeRole}
        />
      );
    }

    if (page === "booking") {
      return (
        <Booking
          selection={booking}
          onNavigate={setPage}
          onChangeRole={changeRole}
        />
      );
    }

    if (page === "medicine") {
      return <MedicineSearch onNavigate={setPage} onChangeRole={changeRole} />;
    }

    if (page === "emergency") {
      return <Emergency onNavigate={setPage} onChangeRole={changeRole} />;
    }

    if (page === "444") {
      return <Health444 onNavigate={setPage} onChangeRole={changeRole} />;
    }

    return <Home onNavigate={setPage} onChangeRole={changeRole} />;
  }

  // Hospital / Staff
  if (role === "hospital") {
    return <HospitalDashboard onChangeRole={changeRole} />;
  }

  // Government
  if (role === "government") {
    return <GovernmentDashboard onChangeRole={changeRole} />;
  }

  // Emergency responder dashboard
  if (role === "emergency") {
    return <EmergencyDashboard onChangeRole={changeRole} />;
  }

  // 444 Health Assistance
  if (role === "444") {
    return <Health444 onNavigate={setPage} onChangeRole={changeRole} />;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>PrajaReach</h1>
      <h2>{role} Dashboard</h2>
      <button onClick={changeRole}>Change Role</button>
    </div>
  );
}

export default App;