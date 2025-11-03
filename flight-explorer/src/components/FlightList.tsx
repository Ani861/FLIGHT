import { useState } from "react";
import type { Flight } from "../types/flight";
import FlightCard from "./FlightCard";
import FlightDetails from "./FlightDetails";

const ITEMS_PER_PAGE = 6;

export default function FlightList({ flights }: { flights: Flight[] }) {
  const [selected, setSelected] = useState<Flight | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(flights.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFlights = flights.slice(startIndex, endIndex);

  return (
    <div className="list">
      {flights.length === 0 && <div className="muted">No flights found.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentFlights.map(f => (
          <FlightCard key={f.id} flight={f} onOpen={f => setSelected(f)} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <FlightDetails flight={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
