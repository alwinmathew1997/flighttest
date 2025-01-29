export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
  gate?: string;
  terminal?: string;
  estimatedArrival?: string;
}

export interface FlightDetail extends Flight {
  aircraft?: string;
  duration?: string;
  delayMinutes?: number;
  weather?: {
    origin: string;
    destination: string;
  };
}