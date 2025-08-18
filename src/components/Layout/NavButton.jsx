import React from "react";
import styled from "styled-components";

const IconLabel = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? "#11B55F" : "#6F6F6F")};
  font-weight: ${(props) => (props.$isActive ? "700" : "500")};
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
  const iconColor = isActive ? "#11B55F" : "#6F6F6F";

  return (
    <ButtonContainer onClick={onClick}>
      <IconComponent fill={iconColor} width={24} height={24} />
      <IconLabel $isActive={isActive}>{label}</IconLabel>
    </ButtonContainer>
  );
}

export default NavButton;
