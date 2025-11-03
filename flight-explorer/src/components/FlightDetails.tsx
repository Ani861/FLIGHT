import type { Flight } from "../types/flight";
import { formatDateTime } from "../utils/format";

export default function FlightDetails({
  flight,
  onClose
}: {
  flight: Flight | null;
  onClose: () => void;
}) {
  if (!flight) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="row between">
          <div>
            <h2 className="h5">{flight.airline} · {flight.flightNumber}</h2>
            <p className="muted small">{flight.origin.code} → {flight.destination.code}</p>
          </div>
          <button onClick={onClose} className="btn btn-outline">Close</button>
        </div>

        <div className="grid-2 gap">
          <div className="panel">
            <h3 className="h6">Departure</h3>
            <p className="small">Scheduled: {formatDateTime(flight.departure.scheduled)}</p>
            <p className="small">Actual: {formatDateTime(flight.departure.actual)}</p>
            <p className="small">Terminal: {flight.departure.terminal ?? "-"}</p>
            <p className="small">Gate: {flight.departure.gate ?? "-"}</p>
          </div>
          <div className="panel">
            <h3 className="h6">Arrival</h3>
            <p className="small">Scheduled: {formatDateTime(flight.arrival.scheduled)}</p>
            <p className="small">Estimated: {formatDateTime(flight.arrival.estimated)}</p>
            <p className="small">Terminal: {flight.arrival.terminal ?? "-"}</p>
            <p className="small">Gate: {flight.arrival.gate ?? "-"}</p>
          </div>
        </div>

        <div className="grid-3 gap top">
          <div className="badge badge-ok">Status: {flight.status}</div>
          <div className="badge badge-info">Aircraft: {flight.aircraft ?? "-"}</div>
          <div className="badge badge-accent">Duration: {flight.duration ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
