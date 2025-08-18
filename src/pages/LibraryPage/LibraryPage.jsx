import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "../../lib/axios";
import Button from "../../components/style/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/fullStarIcon.svg";
import { ReactComponent as StarOutlineIcon } from "../../assets/icons/outlineStar.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/icons/nextIcon.svg";
import BookCard from "../../components/BookCard";
import useUserStore from "../../store/useUserStore";

const mockRecommendedBooks = [
  {
    id: 201,
    title: "취향 맞춤 책 1",
    author: "저자1",
    imageUrl: "https://placehold.co/100x140?text=추천1",
  },
  {
    id: 202,
    title: "취향 맞춤 책 2",
    author: "저자2",
    imageUrl: "https://placehold.co/100x140?text=추천2",
  },
  {
    id: 203,
    title: "취향 맞춤 책 3",
    author: "저자3",
    imageUrl: "https://placehold.co/100x140?text=추천3",
  },
  {
    id: 204,
    title: "취향 맞춤 책 4",
    author: "저자4",
    imageUrl: "https://placehold.co/100x140?text=추천4",
  },
];

const LibraryPage = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { state } = useLocation();
  const libraryName = state?.name;

  const [sharedBooks, setSharedBooks] = useState([]); // API 나눔된 도서 목록
  const [recommendedBooks, setRecommendedBooks] = useState([]); // Mock 추천 도서 목록

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 3. API 호출 로직 단순화
  useEffect(() => {
    if (!libraryName) {
      setError("도서관 정보를 찾을 수 없습니다.");
      setIsLoading(false);
      // navigate(-1);
      return;
    }

    const loadBookList = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // API 호출: 나눔된 책 목록
        const response = await axios.get(`library/booklist/${libraryId}`);
        setSharedBooks(response.data);

        // 추천 도서는 Mock 데이터 유지
        setRecommendedBooks(mockRecommendedBooks);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("책 목록을 불러오는 중 문제가 발생했습니다.");
        }
        console.error("Failed to fetch book list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookList();
  }, [libraryId, libraryName, navigate]);

  if (isLoading)
    return (
      <PageWrapper>
        <StatusContainer>
          <h2>로딩 중...</h2>
        </StatusContainer>
      </PageWrapper>
    );
  if (error)
    return (
      <PageWrapper>
        <StatusContainer>
          <h2>😥</h2>
          <p>{error}</p>
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </StatusContainer>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon width={24} height={24} />
          </BackButton>
        </Header>

        <LibraryHeader>
          <LibraryImage />
          <LibraryTitle to={`/library/${libraryId}`}>
            {libraryName}
            <InfoIcon width={16} height={16} />
          </LibraryTitle>
          <FavoriteButton onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? (
              <StarIcon width={28} height={28} />
            ) : (
              <StarOutlineIcon width={28} height={28} />
            )}
          </FavoriteButton>
        </LibraryHeader>

        {/* --- 상단 스와이퍼 (추천 도서 - Mock) --- */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              {user?.nickname || "회원"}님과
              <br />
              취향이 유사한 분들이 좋아한 책
            </SectionTitle>
          </SectionHeader>
          {/* --- 수정: SwiperSection > CenteredSwiperWrapper 구조로 변경 --- */}
          <SwiperSection>
            <CenteredSwiperWrapper>
              <Swiper
                modules={[Navigation, Autoplay, Mousewheel]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                slidesPerView={"auto"}
                spaceBetween={16}
                centeredSlides={true}
                navigation={true}
              >
                {recommendedBooks.map((book, index) => (
                  <SwiperSlide key={`rec-${index}`} style={{ width: "120px" }}>
                    <BookCard book={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </CenteredSwiperWrapper>
          </SwiperSection>
        </Section>

        <SearchPlaceholder
          onClick={() =>
            navigate(`/library/${libraryId}/shared`, {
              state: { name: libraryName },
            })
          }
        >
          <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
          {libraryName}에 있는 책을 검색해보세요!
        </SearchPlaceholder>

        <Section>
          <SectionHeader>
            <SectionTitle>{libraryName}에 나눔된 모든 책</SectionTitle>
            <MoreLink to={`/library/${libraryId}/shared`}>
              더보기 <ChevronRightIcon width={16} height={16} />
            </MoreLink>
          </SectionHeader>
          <HorizontalScroll>
            {sharedBooks.map((book, index) => (
              <BookCardWrapper key={`shared-${index}`}>
                <BookCard book={{ ...book, imageUrl: book.cover }} />
              </BookCardWrapper>
            ))}
          </HorizontalScroll>
        </Section>
      </PageContainer>
    </PageWrapper>
  );
};

export default LibraryPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 20px 20px;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: -8px;
`;

const LibraryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const LibraryImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
  flex-shrink: 0;
`;

const LibraryTitle = styled(Link)`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-grow: 1;
  min-width: 0;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: -8px;
  flex-shrink: 0;
`;

const Section = styled.section`
  margin-bottom: 32px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
`;

const MoreLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: black;
  text-decoration: none;
  white-space: nowrap;
`;

const SearchPlaceholder = styled.div`
  width: 100%;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 50px;
  color: #6f6f6f;
  font-size: 14px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  width: calc(100% + 40px);
  padding: 4px 20px 10px 20px;
  margin: 0 -20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookCardWrapper = styled.div`
  flex: 0 0 110px; /* 카드 너비 고정 */
`;

const SwiperSection = styled(Section)`
  background-color: #e6f4f0;
  padding: 20px;
  width: calc(100% + 40px);
  margin: 0 -20px 32px -20px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
`;

const CenteredSwiperWrapper = styled.div`
  .swiper-slide {
    transition: transform 0.3s ease-out;
    transform: scale(0.85);
    opacity: 0.7;
  }

  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #4f614a;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;

  h2 {
    font-size: 48px;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    color: #6f6f6f;
    text-align: center;
    line-height: 1.6;
  }
`;
