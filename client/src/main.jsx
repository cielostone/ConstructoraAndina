import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

// Error Trap
window.onerror = function (message, source, lineno, colno, error) {
  rootElement.innerHTML = `
    <div style="color: red; padding: 20px; font-family: monospace;">
      <h1>Something went wrong</h1>
      <p><strong>Error:</strong> ${message}</p>
      <p><strong>Source:</strong> ${source}:${lineno}:${colno}</p>
      <pre>${error?.stack || ''}</pre>
    </div>
  `;
};

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (e) {
  window.onerror(e.message, null, null, null, e);
}
