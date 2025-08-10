import React from "react";
import { Outlet, Link } from "react-router-dom"; // Link 예시를 위해 추가
import styled from "styled-components";
import bookShareIcon from "../../assets/icons/shareIcon";

const bottomNavItems = [
  { id: 1, iconLabel: "책 나눔하기", icon: "", path: "/" },
  { id: 2, iconLabel: "책 나눔하기", icon: "", path: "/" },
  { id: 3, iconLabel: "책 나눔하기", icon: "", path: "/" },
  { id: 4, iconLabel: "책 나눔하기", icon: "", path: "/" },
  { id: 5, iconLabel: "책 나눔하기", icon: "", path: "/" },
];

// 레이아웃 컴포넌트
const MainLayout = () => {
  return (
    <>
      <TopNav>
        <div className="logo">🏠</div>
        <div>
          <button>로그인</button>
        </div>
      </TopNav>

      <AppContainer>
        {/* 여기에 기능 구현하기 */}
        <Outlet />
      </AppContainer>

      <BottomNav>
        <Link to="/">책 기증</Link>
        <Link to="/">책 수령</Link>
        <Link to="/">홈</Link>
        <Link to="/map">도서관 지도</Link>
        <Link to="/">AI 추천</Link>
      </BottomNav>
    </>
  );
};

export default MainLayout;

// 상단 네비게이션 바
export const TopNav = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 600px;
  height: 50px; /* 상단 바 높이 */
  background-color: white;
  border-bottom: 1px solid #f0f2f5;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 100;

  .logo {
    font-weight: bold;
  }
  .icons > * {
    margin-left: 16px;
  }
`;

// 하단 네비게이션 바
export const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 600px;
  height: 60px; /* 하단 바 높이 */
  background-color: white;
  border-top: 1px solid #e5e7eb;
  z-index: 100;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// 콘텐츠를 담을 컨테이너
export const MainContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-height: 100%; /* 콘텐츠가 적어도 화면 전체 높이를 차지하도록 */
  background-color: white;

  /* 상단/하단 바 공간 확보를 위한 패딩 */
  /* 상단 바 높이(50px) + 추가 여백(20px) */
  padding-top: 80px;
  /* 하단 바 높이(60px) + 추가 여백(20px) */
  padding-bottom: 80px;
  /* 좌우 여백 */
  padding-left: 20px;
  padding-right: 20px;
`;
