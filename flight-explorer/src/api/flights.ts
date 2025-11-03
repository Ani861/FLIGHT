import type { Flight } from "../types/flight";

const API_BASE = "https://flight-explorer-api.codewalnut.com";
const ENDPOINT = "/api/flights";

export async function fetchFlights(): Promise<Flight[]> {
  try {
    const res = await fetch(`${API_BASE}${ENDPOINT}`);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    const json = await res.json();
    if (!json?.flights) throw new Error("Malformed response");
    return json.flights as Flight[];
  } catch (err) {
    console.warn("Remote fetch failed, falling back to local mock:", err);
    
    try {
      const fallback = await fetch("/mock-flights.json");
      if (!fallback.ok) throw new Error("Fallback fetch failed");
      const json2 = await fallback.json();
      return json2.flights as Flight[];
    } catch (err2) {
      console.error("Both remote and fallback fetch failed", err2);
      return [];
    }
  }
}
