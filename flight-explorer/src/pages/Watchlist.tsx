import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import FlightCard from '../components/FlightCard';
import FlightDetails from '../components/FlightDetails';
import type { Flight } from '../types/flight';

const ITEMS_PER_PAGE = 6;

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const totalPages = Math.ceil(watchlist.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFlights = watchlist.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-md mb-6">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Watchlist</h1>
          <div className="text-sm text-gray-600">{watchlist.length} {watchlist.length === 1 ? 'flight' : 'flights'}</div>
        </div>
      </div>
      {watchlist.length === 0 ? (
        <p className="text-gray-600">No flights in your watchlist yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFlights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onOpen={setSelectedFlight}
              />
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
          
          <FlightDetails 
            flight={selectedFlight} 
            onClose={() => setSelectedFlight(null)} 
          />
        </>
      )}
    </div>
  );
};

export default Watchlist;