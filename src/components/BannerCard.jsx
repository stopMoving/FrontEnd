import React from "react";
import styled from "styled-components";

/**
 * 메인 페이지 가이드 배너 카드 컴포넌트
 * @param {string} title - 배너 제목
 * @param {string} description - 배너 설명
 * @param {React.ComponentType} icon - 렌더링할 아이콘 컴포넌트
 */
const BannerCard = ({ step, title, description, icon: IconComponent }) => {
  return (
    <CardContainer>
      <TextContent>
        {step && <StepLabel>{step}</StepLabel>}
        <h3>{title}</h3>
        <p>{description}</p>
      </TextContent>
      <IconWrapper>
        {/* 전달받은 아이콘 컴포넌트를 렌더링합니다. */}
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
  height: 213px; /* 높이를 조금 줄여서 더 간결하게 */
  padding: 24px;

  background-color: #f5f5f5; /* 이미지와 유사한 밝은 회색 */
  border-radius: 24px;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TextContent = styled.div`
  h3 {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
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
  color: #4f614a; /* 아이콘 색상 */
`;

const StepLabel = styled.div`
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 10px;

  background-color: #e6f4f0; /* 연한 녹색 배경 */
  color: #11b55f; /* 짙은 녹색 글씨 */

  border-radius: 50px; /* 알약 모양 */
  font-size: 14px;
  font-weight: bold;
`;
