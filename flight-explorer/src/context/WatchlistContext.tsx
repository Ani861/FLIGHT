import { createContext, useContext, type ReactNode } from "react";
import type { Flight } from "../types/flight";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WatchlistContextType = {
  watchlist: Flight[];
  add: (f: Flight) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useLocalStorage<Flight[]>("watchlist", []);

  function add(f: Flight) {
    setWatchlist(prev => {
      if (prev.find(p => p.id === f.id)) return prev;
      return [f, ...prev];
    });
  }

  function remove(id: string) {
    setWatchlist(prev => prev.filter(p => p.id !== id));
  }

  function has(id: string) {
    return watchlist.some(w => w.id === id);
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, add, remove, has }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
