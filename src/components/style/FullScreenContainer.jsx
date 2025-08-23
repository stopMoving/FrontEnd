import styled from "styled-components";

// 현재 보고있는 화면에 꽉차게 스타일 적용하기
const FullScreenContainer = styled.div`
  width: 100vw;
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  background-color: #ffffff;
`;

export default FullScreenContainer;
