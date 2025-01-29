import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plane, Clock, MapPin, ArrowLeft, AlertCircle } from 'lucide-react';
import { FlightDetail as FlightDetailType } from '../types/flight';
import { api } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<FlightDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlightDetail = async () => {
      if (!id) return;
      try {
        const data = await api.getFlight(id);
        console.log("data",data)
        setFlight(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch flight details');
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error || !flight) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{error || 'Flight not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Flight Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Flight Board
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 p-6">
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-white mr-3" />
            <h1 className="text-2xl font-bold text-white">
              Flight {flight.flightNumber}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Flight Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Airline</label>
                  <p className="text-gray-900">{flight.airline}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Aircraft</label>
                  <p className="text-gray-900">{flight.flightNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p className="text-gray-900">{flight.status}</p>
                </div>
                {flight.delayMinutes && (
                  <div>
                    <label className="text-sm text-gray-500">Delay</label>
                    <p className="text-red-600">{flight.delayMinutes} minutes</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Route Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <label className="text-sm text-gray-500">Origin</label>
                    <p className="text-gray-900">{flight.origin}</p>
                    {flight.weather?.origin && (
                      <p className="text-sm text-gray-500">{flight.weather.origin}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <label className="text-sm text-gray-500">Destination</label>
                    <p className="text-gray-900">{flight.destination}</p>
                    {flight.weather?.destination && (
                      <p className="text-sm text-gray-500">{flight.weather.destination}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <label className="text-sm text-gray-500">Departure Time</label>
                    <p className="text-gray-900">{new Date(flight.departureTime).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};