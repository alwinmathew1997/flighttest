import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FlightBoard } from '../components/FlightBoard';
import { api } from '../services/api';
import { vi } from 'vitest';

vi.mock('../services/api', () => ({
  api: {
    getFlights: vi.fn()
  }
}));

const mockFlights = [
  {
    id: '1',
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2024-03-14T10:00:00Z',
    status: 'On Time'
  }
];

describe('FlightBoard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (api.getFlights as any).mockResolvedValueOnce([]);
    render(
      <BrowserRouter>
        <FlightBoard />
      </BrowserRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders flights data successfully', async () => {
    (api.getFlights as any).mockResolvedValueOnce(mockFlights);
    
    render(
      <BrowserRouter>
        <FlightBoard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('AA123')).toBeInTheDocument();
      expect(screen.getByText('American Airlines')).toBeInTheDocument();
      expect(screen.getByText('JFK')).toBeInTheDocument();
      expect(screen.getByText('LAX')).toBeInTheDocument();
    });
  });

  it('renders error state when API fails', async () => {
    (api.getFlights as any).mockRejectedValueOnce(new Error('API Error'));
    
    render(
      <BrowserRouter>
        <FlightBoard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch flight data')).toBeInTheDocument();
    });
  });
});