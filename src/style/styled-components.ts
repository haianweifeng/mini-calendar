import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #1677ff;
    --color-error: #ff4d4f;
    --color-border: #e5e7eb;
    --color-text: rgba(0, 0, 0, 0.88);
  }
`;

export default GlobalStyle;