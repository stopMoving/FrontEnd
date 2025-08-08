import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/*Pretandard 폰트 불러오기*/
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%

  /*Pretandard 폰트 불러오기*/
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f0f2f5;
}

#root {
  display: flex;
  justify-content: center;  
}

`;

export default GlobalStyle;
