import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body, h1, p, ul, li {
    margin: 0;
    paading: 0;
  }
`;

export default GlobalStyle;
