import { supabase, isSupabaseConfigured } from "./supabaseClient";
import {
  demoHospitals,
  demoDoctors,
  demoMedicines,
  demoEmergencyRequests,
  demoReports,
  demoAppointments,
} from "./demoData";

// Every helper tries Supabase first (when configured) and silently
// falls back to demo data so the prototype never shows a blank page.

async function safeSelect(query, fallback) {
  if (!isSupabaseConfigured || !supabase) return fallback;
  try {
    const { data, error } = await query;
    if (error || !data || data.length === 0) return fallback;
    return data;
  } catch (err) {
    console.warn("Supabase unavailable, using demo data:", err?.message);
    return fallback;
  }
}

export async function getHospitals() {
  return safeSelect(supabase?.from("hospitals").select("*"), demoHospitals);
}

export async function getDoctors() {
  return safeSelect(supabase?.from("doctors").select("*"), demoDoctors);
}

export async function getMedicines() {
  return safeSelect(supabase?.from("medicines").select("*"), demoMedicines);
}

export async function getAppointments() {
  return safeSelect(supabase?.from("appointments").select("*"), demoAppointments);
}

export async function getEmergencyRequests() {
  return safeSelect(
    supabase
      ?.from("emergency_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    demoEmergencyRequests
  );
}

export async function getReports() {
  return safeSelect(
    supabase
      ?.from("hospital_reports")
      .select("*")
      .order("created_at", { ascending: false }),
    demoReports
  );
}

// Write helpers: only persist when Supabase is configured, otherwise
// resolve so the demo flow continues without errors.

export async function saveAppointment(appointment) {
  if (!isSupabaseConfigured || !supabase) return { demo: true };
  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointment])
      .select();
    if (error) throw error;
    return { data, demo: false };
  } catch (err) {
    console.warn("Could not save appointment, demo mode:", err?.message);
    return { demo: true };
  }
}

export async function createEmergencyRequest(request) {
  if (!isSupabaseConfigured || !supabase) return { demo: true };
  try {
    const { data, error } = await supabase
      .from("emergency_requests")
      .insert([request])
      .select();
    if (error) throw error;
    return { data, demo: false };
  } catch (err) {
    console.warn("Could not save emergency request, demo mode:", err?.message);
    return { demo: true };
  }
}

export async function updateEmergencyRequest(id, status) {
  if (!isSupabaseConfigured || !supabase) return { demo: true };
  try {
    const { error } = await supabase
      .from("emergency_requests")
      .update({ status })
      .eq("id", id);
    if (error) throw error;
    return { demo: false };
  } catch (err) {
    console.warn("Could not update emergency request, demo mode:", err?.message);
    return { demo: true };
  }
}
