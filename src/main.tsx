import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './views/App';
import GlobalStyle from './style/styled-components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <GlobalStyle />
  </StrictMode>,
);
