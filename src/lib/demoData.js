// PrajaReach demo data. Fallback when Supabase is unavailable.

export const demoHospitals = [
  { id: 1, name: "Praja General Hospital", location: "Kurnool", phone: "9876543210", emergency_available: true, services: ["Emergency", "General Medicine", "Cardiology"] },
  { id: 2, name: "Rural Health Centre", location: "Anantapur", phone: "9876543211", emergency_available: true, services: ["General Medicine", "Pharmacy"] },
  { id: 3, name: "Community Care Hospital", location: "Nandyal", phone: "9876543212", emergency_available: false, services: ["General Medicine", "Pediatrics"] },
];

export const demoDoctors = [
  { id: 1, name: "Dr. Anjali Rao", specialization: "General Medicine", available: true, available_time: "9:00 AM - 1:00 PM", hospital_id: 1, hospital_name: "Praja General Hospital" },
  { id: 2, name: "Dr. Rahul Kumar", specialization: "Cardiology", available: true, available_time: "2:00 PM - 5:00 PM", hospital_id: 1, hospital_name: "Praja General Hospital" },
  { id: 3, name: "Dr. Priya Sharma", specialization: "General Medicine", available: true, available_time: "10:00 AM - 2:00 PM", hospital_id: 2, hospital_name: "Rural Health Centre" },
  { id: 4, name: "Dr. Suresh Reddy", specialization: "Pediatrics", available: false, available_time: "4:00 PM - 7:00 PM", hospital_id: 2, hospital_name: "Rural Health Centre" },
  { id: 5, name: "Dr. Kavya Singh", specialization: "General Medicine", available: true, available_time: "9:00 AM - 12:00 PM", hospital_id: 3, hospital_name: "Community Care Hospital" },
];

export const demoMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Fever / Pain", available: true, hospital_name: "Praja General Hospital" },
  { id: 2, name: "ORS Sachet", category: "Dehydration", available: true, hospital_name: "Rural Health Centre" },
  { id: 3, name: "Amoxicillin 250mg", category: "Antibiotic", available: false, hospital_name: "Community Care Hospital" },
  { id: 4, name: "Insulin Injection", category: "Diabetes", available: true, hospital_name: "Praja General Hospital" },
  { id: 5, name: "Cetirizine 10mg", category: "Allergy", available: true, hospital_name: "Rural Health Centre" },
  { id: 6, name: "Metformin 500mg", category: "Diabetes", available: true, hospital_name: "Community Care Hospital" },
];

export const demoEmergencyRequests = [
  { id: 1, emergency_type: "Road Accident", patient_name: "Ravi Teja", patient_phone: "9000000001", location: "Kurnool Bypass", ambulance_required: true, status: "Pending", created_at: new Date().toISOString() },
  { id: 2, emergency_type: "Cardiac Emergency", patient_name: "Lakshmi Devi", patient_phone: "9000000002", location: "Anantapur Main Road", ambulance_required: true, status: "Accepted", created_at: new Date().toISOString() },
];

export const demoReports = [
  { id: 1, report_type: "Medicine Shortage", hospital_name: "Community Care Hospital", location: "Nandyal", description: "Insulin and ORS stock running low.", status: "Open", created_at: new Date().toISOString() },
  { id: 2, report_type: "Doctor Shortage", hospital_name: "Rural Health Centre", location: "Anantapur", description: "No pediatrician available this week.", status: "Under Review", created_at: new Date().toISOString() },
];

export const demoAppointments = [
  { id: 1, doctor_name: "Dr. Anjali Rao", specialization: "General Medicine", hospital_name: "Praja General Hospital", token: 7, status: "Confirmed", created_at: new Date().toISOString() },
];

export const demoBloodBanks = [
  { id: 1, name: "Praja Blood Bank", location: "Kurnool", phone: "9800000001", groups: ["A+", "B+", "O+", "AB+"] },
  { id: 2, name: "Red Cross Blood Centre", location: "Anantapur", phone: "9800000002", groups: ["A-", "B-", "O-", "O+"] },
  { id: 3, name: "LifeLine Blood Bank", location: "Nandyal", phone: "9800000003", groups: ["A+", "AB+", "O+"] },
];
