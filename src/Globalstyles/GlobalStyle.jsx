import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

html, body, #root {
  height: 100%;

  webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f0f2f5;
}

input, textarea, [contenteditable] {
  -webkit-user-select: text;
  user-select: text;
}

#root {
  display: flex;
  justify-content: center;  
}
`;

export default GlobalStyle;
