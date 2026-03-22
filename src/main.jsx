import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#2d1018',
              color: '#fdf4ec',
              border: '1px solid rgba(245,200,66,0.15)',
              fontFamily: "'Outfit', sans-serif",
            },
            success: { iconTheme: { primary: '#f5c842', secondary: '#2d1018' } },
            error:   { iconTheme: { primary: '#fb7185', secondary: '#2d1018' } },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
