import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';

// v18
ReactDOM.createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

