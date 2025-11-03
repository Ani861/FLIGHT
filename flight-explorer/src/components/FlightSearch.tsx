import { useState } from "react";
import type React from "react";

type Query = {
  origin?: string;
  destination?: string;
  airline?: string;
};

type Props = {
  onSearch: (q: Query) => void;
  onReset?: () => void;
};

export default function FlightSearch({ onSearch, onReset }: Props) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [airline, setAirline] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({
      origin: origin.trim().toUpperCase() || undefined,
      destination: destination.trim().toUpperCase() || undefined,
      airline: airline.trim() || undefined
    });
  }

  function reset(e?: React.SyntheticEvent) {
    e?.preventDefault();
    setOrigin("");
    setDestination("");
    setAirline("");
    onReset?.();
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-field">
        <label className="label">Origin</label>
        <input
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="input w-40"
          placeholder="JFK"
        />
      </div>

      <div className="form-field">
        <label className="label">Destination</label>
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="input w-40"
          placeholder="LAX"
        />
      </div>

      <div className="form-field">
        <label className="label">Airline</label>
        <input
          value={airline}
          onChange={e => setAirline(e.target.value)}
          className="input w-48"
          placeholder="American"
        />
      </div>

      <div className="actions">
        <button type="submit" className="btn btn-primary">Search</button>
        <button onClick={reset} className="btn btn-outline">Reset</button>
      </div>
    </form>
  );
}
