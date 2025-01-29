
# Flight Status Board

A real-time flight status board application built with React, TypeScript, and Tailwind CSS. This application provides live flight information updates and detailed flight views.

## Features

- 🛫 Real-time flight status updates
- 🔄 Auto-refresh every 30 seconds
- 📱 Responsive design
- 🎯 Detailed flight information
- ⚡ Fast and efficient
- 🚨 Comprehensive error handling

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios
- Vitest & React Testing Library

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Clone the repository:

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server


## API Endpoints

The application uses the following API endpoints:

- `GET /flights` - Retrieve all flights
- `GET /flights/:id` - Retrieve specific flight details

Base URL: `https://flight-status-mock.core.travelopia.cloud`

## Testing

The application includes comprehensive tests using Vitest and React Testing Library. Tests cover:

- Component rendering
- API interactions
- Loading states
- Error handling
- User interactions


## Error Handling

The application implements robust error handling:

- API request failures
- Network errors
- Component errors (via Error Boundary)
- Loading states
- Data validation

