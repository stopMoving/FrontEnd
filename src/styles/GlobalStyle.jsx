import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *   {
    box-sizing: border-box;
    }
    
  body, h1, p, ul, li {
  margin: 0;
  padding: 0;
    }
`;

export default GlobalStyle;
