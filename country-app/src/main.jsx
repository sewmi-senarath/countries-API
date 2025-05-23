import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWrapper from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);