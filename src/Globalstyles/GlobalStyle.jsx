import { createGlobalStyle } from "styled-components";

// 본 서비스가 웹앱임을 고려하여 반응형 글로벌 스타일 구성
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
