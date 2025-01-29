import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FlightBoard } from './components/FlightBoard';
import { FlightDetail } from './components/FlightDetail';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<FlightBoard />} />
            <Route path="/flight/:id" element={<FlightDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;