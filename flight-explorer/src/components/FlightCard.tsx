import type { Flight } from "../types/flight";
import { useWatchlist } from "../context/WatchlistContext";
import { formatDateTime } from "../utils/format";
import { FiInfo, FiStar } from 'react-icons/fi'

export default function FlightCard({
  flight,
  onOpen
}: {
  flight: Flight;
  onOpen: (f: Flight) => void;
}) {
  const { add, remove, has } = useWatchlist();
  const inWatch = has(flight.id);

  return (
    <div className="card row animated-card">
      <div>
        <div className="row gap-sm">
          <div className="dot dot-sky"></div>
          <div className="h5">{flight.airline} · {flight.flightNumber}</div>
        </div>
        <div className="muted small">
          {flight.origin.code} ({flight.origin.city}) <span className="mx-1">→</span> {flight.destination.code} ({flight.destination.city})
        </div>
        <div className="meta">
          <span>Dep: {formatDateTime(flight.departure.scheduled)}</span>
          <span className={`chip ${flight.status.toLowerCase().includes("delay") ? "chip-warn" : flight.status.toLowerCase().includes("cancel") ? "chip-danger" : "chip-ok"}`}>{flight.status}</span>
        </div>
      </div>

      <div className="col gap-sm">
        <button onClick={() => onOpen(flight)} className="btn btn-outline">
          <FiInfo className="inline-icon" aria-hidden="true" /> Details
        </button>
        <button
          onClick={() => (inWatch ? remove(flight.id) : add(flight))}
          className={`btn ${inWatch ? "btn-danger" : "btn-success"}`}
        >
          <FiStar className="inline-icon" aria-hidden="true" /> {inWatch ? "Remove" : "Watch"}
        </button>
      </div>
    </div>
  );
}
