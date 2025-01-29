import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FlightDetail } from '../components/FlightDetail';
import { api } from '../services/api';
import { vi } from 'vitest';

vi.mock('../services/api', () => ({
  api: {
    getFlight: vi.fn()
  }
}));

const mockFlight = {
  id: '1',
  flightNumber: 'AA123',
  airline: 'American Airlines',
  origin: 'JFK',
  destination: 'LAX',
  departureTime: '2024-03-14T10:00:00Z',
  status: 'On Time',
  aircraft: 'Boeing 737',
  gate: 'A1',
  terminal: 'T1'
};

describe('FlightDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (id: string) => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </BrowserRouter>
    );
  };

  it('renders loading state initially', () => {
    (api.getFlight as any).mockResolvedValueOnce(mockFlight);
    renderWithRouter('1');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders flight details successfully', async () => {
    (api.getFlight as any).mockResolvedValueOnce(mockFlight);
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('AA123')).toBeInTheDocument();
      expect(screen.getByText('American Airlines')).toBeInTheDocument();
      expect(screen.getByText('Boeing 737')).toBeInTheDocument();
    });
  });

  it('renders error state when API fails', async () => {
    (api.getFlight as any).mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch flight details')).toBeInTheDocument();
    });
  });
});