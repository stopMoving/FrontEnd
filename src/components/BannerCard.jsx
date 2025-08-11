import React from "react";
import styled from "styled-components";

// --- 아이콘 임포트 ---
import { ReactComponent as NextIcon } from "../assets/icons/nextIcon.svg";

const BannerCard = ({ title, description }) => {
  return (
    <CardContainer>
      <TextContent>
        <h3>{title}</h3>
        <p>{description}</p>
      </TextContent>
      <ImagePlaceholder>도서관 그림</ImagePlaceholder>
      <NextIcon width={24} height={24} />
    </CardContainer>
  );
};

export default BannerCard;

const CardContainer = styled.div`
  /* 레이아웃 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0; /* 중요: 아이템 너비가 줄어들지 않도록 설정 */

  /* 크기 */
  width: 250px;
  height: 200px;
  padding: 20px;

  /* 디자인 */
  background-color: #e7efda; /* 검색창과 동일한 연두색 배경 */
  border-radius: 24px; /* 부드러운 둥근 모서리 */
  color: #333;

  /* 아이콘 위치 */
  & > svg {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: #949494;
  }
`;

const TextContent = styled.div`
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    line-height: 1.3; /* 줄 간격 */
    white-space: pre-line;
  }
  p {
    font-size: 14px;
    color: #7b7b7b;
    line-height: 1.4;
    white-space: pre-line;
  }
`;

const ImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end; /* 오른쪽 아래에 배치 */

  width: 80px;
  height: 60px;
  background-color: #c4c4c4;
  border-radius: 8px;
  color: white;
  font-size: 12px;
`;
