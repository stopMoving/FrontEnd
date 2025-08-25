import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import NavButton from "./NavButton";

// SVGR로 SVG 파일 호출
import { ReactComponent as BookShareIcon } from "../../assets/icons/shareIcon.svg";
import { ReactComponent as BookTakeIcon } from "../../assets/icons/takeIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as AiIcon } from "../../assets/icons/AI.svg";
import { ReactComponent as MypageIcon } from "../../assets/icons/mypageIcon.svg";

import { ReactComponent as BookShareIconActive } from "../../assets/icons/shareIcon2.svg";
import { ReactComponent as BookTakeIconActive } from "../../assets/icons/takeIcon2.svg";
import { ReactComponent as HomeIconActive } from "../../assets/icons/homeIcon2.svg";
import { ReactComponent as AiIconActive } from "../../assets/icons/Ai2.svg";
import { ReactComponent as MypageIconActive } from "../../assets/icons/mypageIcon2.svg";

const navItems = [
  {
    id: 1,
    label: "책 나눔하기",
    component: BookShareIcon,
    activeComponent: BookShareIconActive,
    path: "/barcode/library/select/give",
  },
  {
    id: 2,
    label: "책 데려가기",
    component: BookTakeIcon,
    activeComponent: BookTakeIconActive,
    path: "/barcode/library/select/take",
  },
  {
    id: 3,
    label: "홈",
    component: HomeIcon,
    activeComponent: HomeIconActive,
    path: "/",
  },
  {
    id: 4,
    label: "AI",
    component: AiIcon,
    activeComponent: AiIconActive,
    path: "/ai/recommand",
  },
  {
    id: 5,
    label: "마이페이지",
    component: MypageIcon,
    activeComponent: MypageIconActive,
    path: "/mypage",
  },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 정보를 가져오는 훅
  const currentPath = location.pathname; // 현재 URL 경로

  return (
    <BottomNav>
      {navItems.map((item) => {
        // 현재경로 & 버튼경로 일치 확인
        const isActive = currentPath === item.path;
        const IconComponent = isActive ? item.activeComponent : item.component;

        return (
          <NavButton
            key={item.id}
            label={item.label}
            component={IconComponent}
            onClick={() => navigate(item.path)}
            isActive={isActive}
          />
        );
      })}
    </BottomNav>
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
  height: 70px;
  background-color: white;
  border-top: 1px solid #dedede;
  z-index: 90;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
