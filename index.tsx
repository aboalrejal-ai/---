
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { LogoProvider } from './contexts/LogoProvider';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <LogoProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LogoProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
