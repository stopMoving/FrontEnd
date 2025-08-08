import styled from "styled-components";

// 현재 보고있는 화면에 꽉차게 스타일 적용하기
const FullScreenContainer = styled.div`
  width: 100vw; /* 뷰포트 너비의 100% */
  height: 100vh; /* 뷰포트 높이의 100% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  background-color: #ffffff;
`;

export default FullScreenContainer;
