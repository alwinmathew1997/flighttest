import axios from 'axios';
import { Flight, FlightDetail } from '../types/flight';

const API_BASE_URL = 'https://flight-status-mock.core.travelopia.cloud';

export const api = {
  getFlights: async (): Promise<Flight[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flights`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch flights');
    }
  },

  getFlight: async (id: string): Promise<FlightDetail> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flights/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch flight details');
    }
  }
};