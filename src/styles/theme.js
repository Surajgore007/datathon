// src/styles/theme.js
export const theme = {
    colors: {
      primary: '#6B46C1',
      secondary: '#4A5568',
      background: '#F7FAFC',
      white: '#FFFFFF',
      gray: '#718096',
    },
    borderRadius: '8px',
    transitions: '0.3s ease-in-out',
  };
  
  // src/styles/GlobalStyles.js
  import { createGlobalStyle } from 'styled-components';
  
  export const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: ${props => props.theme.colors.secondary};
    }
  `;