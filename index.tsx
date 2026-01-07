
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const RootApp = () => {
  useEffect(() => {
    // On laisse un petit délai pour que le premier rendu soit fluide
    const timer = setTimeout(() => {
      document.body.classList.add('app-ready');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<RootApp />);
