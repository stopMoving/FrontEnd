import React from "react";
import styled from "styled-components";

const StyledHr = styled.hr`
  border-top-color: #dedede;
  width: auto;
  height: 1px;
  background-color: #dedede;
`;

const Text = styled.span`
  color: #dedede;
  white-space: nowrap;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > ${StyledHr} {
    flex-grow: 1;
  }
`;

function HorizontalRule({ className = "", children }) {
  if (children) {
    return (
      <Container className={className}>
        <StyledHr />
        <Text>{children}</Text>
        <StyledHr />
      </Container>
    );
  }

  return <StyledHr className={className} />;
}

export default HorizontalRule;
