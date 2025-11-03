import { useEffect, useState } from "react";
import { fetchFlights } from "../api/flights";
import type { Flight } from "../types/flight";
import FlightSearch from "../components/FlightSearch";
import FlightList from "../components/FlightList";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filtered, setFiltered] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<{ origin?: string; destination?: string; airline?: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await fetchFlights();
      if (!mounted) return;
      setFlights(data);
      setFiltered(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(flights);
      return;
    }
    setFiltered(
      flights.filter(f => {
        if (query.origin && f.origin.code !== query.origin) return false;
        if (query.destination && f.destination.code !== query.destination) return false;
        if (query.airline && !f.airline.toLowerCase().includes(query.airline.toLowerCase())) return false;
        return true;
      })
    );
  }, [query, flights]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flight Explorer
          </h1>
          <p className="text-lg text-gray-600">
            Search flights, view real-time details, and manage your watchlist with ease.
          </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-8">
          <section className="mb-8">
            <FlightSearch onSearch={q => setQuery(q)} onReset={() => setQuery(null)} />
          </section>

          <section>
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-lg text-gray-600">Loading flights...</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Available Flights {filtered.length > 0 && `(${filtered.length})`}
                  </h2>
                  {query && (
                    <button
                      onClick={() => setQuery(null)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No flights found</h3>
                    <p className="mt-2 text-gray-600">
                      Try adjusting your search criteria or check back later for more flights.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <FlightList flights={filtered} />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
