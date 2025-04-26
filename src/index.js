import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './Routes'; // Import the AppRoutes component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes /> {/* Render AppRoutes instead of App */}
  </React.StrictMode>
);