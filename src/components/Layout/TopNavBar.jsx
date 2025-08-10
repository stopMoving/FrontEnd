import React from "react";
import styled from "styled-components";

// --- 스타일 정의 ---
const NavContainer = styled.header`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 600px;
  height: 50px; /* 상단 바 높이 */
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f2f5;
  z-index: 100;
`;

const NavSection = styled.div`
  flex: 1; // 각 섹션이 공간을 1:1:1 비율로 차지
  display: flex;
  align-items: center;
`;

const LeftSection = styled(NavSection)`
  justify-content: flex-start;
`;

const CenterSection = styled(NavSection)`
  justify-content: center;
`;

const RightSection = styled(NavSection)`
  justify-content: flex-end;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PageContainer = styled.div`
  padding-top: 56px;
`;

// --- 컴포넌트 본체 ---
function TopNavBar({ leftControls, title, rightControls }) {
  return (
    <>
      <NavContainer>
        <LeftSection>{leftControls}</LeftSection>
        <CenterSection>{title}</CenterSection>
        <RightSection>{rightControls}</RightSection>
      </NavContainer>
    </>
  );
}

// IconButton을 TopNavBar의 서브 컴포넌트로 export하여 일관성 유지
TopNavBar.IconButton = IconButton;

export default TopNavBar;
