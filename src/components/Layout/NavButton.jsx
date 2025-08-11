import React from "react";
import styled from "styled-components";

// --- 스타일 정의 ---

// isActive prop에 따라 글자 색상과 굵기를 변경합니다.
const IconLabel = styled.span`
  font-size: 12px;
  color: ${(props) => (props.isActive ? "#333" : "#6F6F6F")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  transition: color 0.2s;
`;

// 버튼 컨테이너는 상태에 따라 크게 달라지지 않으므로 심플하게 유지합니다.
const ButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 65px;
  height: 46px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

// --- 컴포넌트 본체 ---

/**
 * 아이콘과 텍스트를 표시하는 재사용 가능한 내비게이션 버튼
 * @param {React.ComponentType} component - 렌더링할 아이콘 컴포넌트
 * @param {string} label - 버튼 텍스트
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {boolean} isActive - 현재 활성화 상태 여부
 */
function NavButton({ component: IconComponent, label, onClick, isActive }) {
  // 활성화 상태에 따라 아이콘에 전달할 색상을 결정합니다.
  const iconColor = isActive ? "#333" : "#6F6F6F"; // 활성: 파란색, 비활성: 회색

  return (
    <ButtonContainer onClick={onClick}>
      {/* 아이콘 컴포넌트를 렌더링하고, 동적으로 색상을 전달합니다. */}
      <IconComponent fill={iconColor} width={24} height={24} />
      <IconLabel isActive={isActive}>{label}</IconLabel>
    </ButtonContainer>
  );
}

export default NavButton;
