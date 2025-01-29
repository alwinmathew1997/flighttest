import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, AlertCircle } from 'lucide-react';
import { Flight } from '../types/flight';
import { api } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

const REFRESH_INTERVAL = 15000; // 30 seconds

export const FlightBoard: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const data = await api.getFlights();
      setFlights(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flight data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Flight['status']) => {
    switch (status) {
      case 'On Time': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Boarding': return 'bg-blue-100 text-blue-800';
      case 'Departed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{error}</p>
          <button
            onClick={fetchFlights}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Plane className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Flight Status Board</h1>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((flight) => (
              <tr
                key={flight.id}
                onClick={() => navigate(`/flight/${flight.id}`)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {flight.flightNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flight.airline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flight.origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flight.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(flight.departureTime).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(flight.status)}`}>
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};