import React from "react";
import styled from "styled-components";

const StyledHr = styled.hr`
  border: none;
  width: auto;
  height: 1px;
  background-color: #e1e1e1;
`;

const Text = styled.span`
  color: #636363;
  /* 텍스트가 줄바꿈되지 않도록 설정 (선택 사항) */
  white-space: nowrap;
`;

// 자식으로 포함된 StyledHr 컴포넌트에만 flex-grow를 적용
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > ${StyledHr} {
    flex-grow: 1;
  }
`;

function HorizontalRule({ className = "", children }) {
  // children prop이 있을 경우, 텍스트를 포함한 구분선을 렌더링합니다.
  if (children) {
    return (
      <Container className={className}>
        <StyledHr />
        <Text>{children}</Text>
        <StyledHr />
      </Container>
    );
  }

  // children prop이 없을 경우, 일반 구분선만 렌더링합니다.
  return <StyledHr className={className} />;
}

export default HorizontalRule;
