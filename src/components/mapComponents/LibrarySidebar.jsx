import React, { useEffect } from "react";
import styled from "styled-components";
import useLibrarySidebarStore from "../../store/useLibrarySidebarStore";
import { useNavigate } from "react-router-dom";

// 아이콘 임포트 (경로는 실제 프로젝트에 맞게 수정)
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/fullStarIcon.svg";

// 개별 도서관 아이템 컴포넌트
const LibraryItem = ({ library }) => {
  const navigate = useNavigate();
  // 클릭 시 상세 페이지로 이동
  const handleClick = () => navigate(`/library/${library.id}`);

  return (
    <ItemContainer onClick={handleClick}>{library.place_name}</ItemContainer>
  );
};

const LibrarySidebar = () => {
  const {
    isOpen,
    toggleSidebar,
    myLibraries,
    nearbyLibraries,
    isLoading,
    error,
    fetchNearbyLibraries,
  } = useLibrarySidebarStore();

  // 사이드바가 열릴 때마다 주변 도서관 데이터를 가져옵니다.
  useEffect(() => {
    if (isOpen) {
      fetchNearbyLibraries();
    }
  }, [isOpen, fetchNearbyLibraries]);

  return (
    <>
      {/* 사이드바 뒤의 어두운 배경 */}
      <Backdrop isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen}>
        <Header>
          <BackButton onClick={toggleSidebar}>
            <BackIcon width={24} height={24} />
          </BackButton>
          <BellIcon width={24} height={24} />
        </Header>

        <Content>
          <Section>
            <SectionTitle>
              내 도서관 <StarIcon width={16} height={16} fill="#FFD700" />
            </SectionTitle>
            {myLibraries.map((lib) => (
              <LibraryItem key={lib.id} library={lib} />
            ))}
          </Section>

          <Section>
            <SectionTitle>전체 도서관</SectionTitle>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>{error}</p>}
            {!isLoading &&
              !error &&
              nearbyLibraries.map((lib) => (
                <LibraryItem key={lib.id} library={lib} />
              ))}
          </Section>
        </Content>
      </SidebarContainer>
    </>
  );
};

export default LibrarySidebar;

// --- Styled Components ---

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: white;
  z-index: 100;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 24px 16px;
  overflow-y: auto;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ItemContainer = styled.div`
  padding: 12px 0;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;
