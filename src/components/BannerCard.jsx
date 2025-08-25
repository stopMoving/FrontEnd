import React from "react";
import styled from "styled-components";

const BannerCard = ({ step, title, description, icon: IconComponent }) => {
  return (
    <CardContainer>
      <TextContent>
        {step && <StepLabel>{step}</StepLabel>}
        <h3>{title}</h3>
        <p>{description}</p>
      </TextContent>
      <IconWrapper>
        <IconComponent width={68} height={68} />
      </IconWrapper>
    </CardContainer>
  );
};

export default BannerCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;

  width: 280px;
  height: 213px;
  padding: 24px;

  background-color: #f4f4f4;
  border-radius: 24px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border: 1px solid #f4f4f4;

  color: black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

const TextContent = styled.div`
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    line-height: 1.4;
    white-space: pre-line;
  }
  p {
    font-size: 13px;
    color: #7b7b7b;
    line-height: 1.5;
    white-space: pre-line;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #4f614a;
`;

const StepLabel = styled.div`
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 10px;

  background-color: transparent;
  border: 1px solid #11b55f;
  color: #11b55f;

  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
`;
