import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadScript } from '@react-google-maps/api';
import App from './App';
import './index.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places']} // Load the "places" library
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadScript>
    </React.StrictMode>
  </QueryClientProvider>
);