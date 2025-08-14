import React from "react";
import styled from "styled-components";

const IconLabel = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? "#333" : "#6F6F6F")};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  transition: color 0.2s;
`;

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

function NavButton({ component: IconComponent, label, onClick, isActive }) {
  // 활성화 상태에 따라 아이콘에 전달할 색상을 결정합니다.
  const iconColor = isActive ? "#333" : "#6F6F6F"; // 활성: 파란색, 비활성: 회색

  return (
    <ButtonContainer onClick={onClick}>
      {/* 아이콘 컴포넌트를 렌더링하고, 동적으로 색상을 전달합니다. */}
      <IconComponent fill={iconColor} width={24} height={24} />
      <IconLabel $isActive={isActive}>{label}</IconLabel>
    </ButtonContainer>
  );
}

export default NavButton;
