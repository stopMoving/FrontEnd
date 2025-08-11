import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import NavButton from "./NavButton";

// SVG 파일을 React 컴포넌트로 불러옵니다.
import { ReactComponent as BookShareIcon } from "../../assets/icons/shareIcon.svg";
import { ReactComponent as BookTakeIcon } from "../../assets/icons/takeIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as AiIcon } from "../../assets/icons/AI.svg";
import { ReactComponent as MypageIcon } from "../../assets/icons/mypageIcon.svg";

const navItems = [
  { id: 1, Iconlabel: "책 나눔하기", component: BookShareIcon, path: "/" },
  { id: 2, Iconlabel: "책 데려가기", component: BookTakeIcon, path: "/" },
  { id: 3, Iconlabel: "홈", component: HomeIcon, path: "/" },
  { id: 4, Iconlabel: "AI", component: AiIcon, path: "/" },
  { id: 5, Iconlabel: "마이페이지", component: MypageIcon, path: "/" },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 정보를 가져오는 훅
  const currentPath = location.pathname; // 현재 URL 경로

  return (
    <>
      <BottomNav>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            label={item.Iconlabel}
            component={item.component} // 아이콘 '컴포넌트'를 그대로 전달
            onClick={() => navigate(item.path)}
            // 현재 경로와 버튼의 경로가 일치하는지 확인하여 활성화 상태를 전달
            isActive={currentPath === item.path}
          />
        ))}
      </BottomNav>
    </>
  );
};

export default BottomNavBar;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 600px;
  height: 70px; /* 하단 바 높이 */
  background-color: white;
  border-top: 1px solid #dedede;
  z-index: 100;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
