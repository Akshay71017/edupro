import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

  :root {
    --primary-dark: #0A1929;
    --secondary-dark: #132F4C;
    --accent-color: #2196F3;
    --accent-light: #64B5F6;
    --highlight: #00BFA6;
    --text-primary: #ffffff;
    --text-secondary: #B2BAC2;
    --error: #FF4842;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--primary-dark);
    color: var(--text-primary);
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyles; 