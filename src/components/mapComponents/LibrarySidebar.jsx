import React, { useEffect } from "react";
import styled from "styled-components";
import useLibrarySidebarStore from "../../store/useLibrarySidebarStore";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/fullStarIcon.svg";

const LibraryItem = ({ library }) => {
  const navigate = useNavigate();
  const handleClick = () =>
    navigate(`/library/${library.id}`, {
      state: { name: library.name },
    });

  return <ItemContainer onClick={handleClick}>{library.name}</ItemContainer>;
};

const LibrarySidebar = () => {
  const {
    isOpen,
    toggleSidebar,
    myLibraries,
    isMyLibrariesLoading,
    myLibrariesError,
    allLibraries,
    isAllLibrariesLoading,
    allLibrariesError,
    fetchMyLibraries, // 내 도서관
    fetchAllLibraries, // 전체 도서관
  } = useLibrarySidebarStore();

  useEffect(() => {
    if (isOpen) {
      fetchMyLibraries();
      fetchAllLibraries();
    }
  }, [isOpen, fetchMyLibraries, fetchAllLibraries]);

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer $isOpen={isOpen}>
        <Header>
          <BackButton onClick={toggleSidebar}>
            <BackIcon width={24} height={24} />
          </BackButton>
        </Header>

        <Content>
          <Section>
            <SectionTitle>
              내 도서관 <StarIcon width={20} height={20} fill="#FFD700" />
            </SectionTitle>
            {isMyLibrariesLoading && <StatusText>불러오는 중...</StatusText>}
            {myLibrariesError && <StatusText>{myLibrariesError}</StatusText>}
            {!isMyLibrariesLoading &&
              !myLibrariesError &&
              myLibraries.map((lib) => (
                <LibraryItem key={lib.id} library={lib} />
              ))}
          </Section>

          <Section>
            <SectionTitle>전체 도서관</SectionTitle>
            {isAllLibrariesLoading && <StatusText>불러오는 중...</StatusText>}
            {allLibrariesError && <StatusText>{allLibrariesError}</StatusText>}
            {!isAllLibrariesLoading &&
              !allLibrariesError &&
              allLibraries.map((lib) => (
                <LibraryItem key={lib.id} library={lib} />
              ))}
          </Section>
        </Content>
      </SidebarContainer>
    </>
  );
};

export default LibrarySidebar;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: white;
  z-index: 100;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: -20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;

const Content = styled.div`
  padding: 24px 16px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-left: 8px;
  display: flex;
  color: #0d8847;
  align-items: center;
  gap: 4px;
`;

const ItemContainer = styled.div`
  padding: 10px 8px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color: 0.2s
  &:hover {
    color: #f0f2f5;
  }
`;

const StatusText = styled.p`
  padding: 12px 8px;
  color: #6f6f6f;
`;
