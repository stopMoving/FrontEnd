import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// Swiper 관련 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// 아이콘 및 컴포넌트 import (경로는 실제 프로젝트에 맞게 수정)
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/fullStarIcon.svg";
import { ReactComponent as StarOutlineIcon } from "../../assets/icons/outlineStar.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/icons/nextIcon.svg";
import BookCard from "../../components/BookCard";

// --- 목업(Mockup) 데이터 ---
const fetchLibraryPageData = async (libraryId) => {
  console.log(`${libraryId} 페이지 데이터 요청`);

  const sharedBooksData = [
    {
      id: 101,
      title: "증정책 제목",
      author: "저자",
      imageUrl: "https://placehold.co/120x168?text=증정책",
    },
    {
      id: 102,
      title: "대형책 제목",
      author: "저자",
      imageUrl: "https://placehold.co/120x168?text=대형책",
    },
    {
      id: 103,
      title: "증정책 제목",
      author: "저자",
      imageUrl: "https://placehold.co/120x168?text=증정책",
    },
    {
      id: 104,
      title: "대형책 제목",
      author: "저자",
      imageUrl: "https://placehold.co/120x168?text=대형책",
    },
  ];

  return {
    library: {
      id: libraryId,
      name: "김영삼도서관",
      imageUrl: "https://placehold.co/80x80/E6F4F0/4F614A?text=도서관",
    },
    sharedBooks: [...sharedBooksData, ...sharedBooksData, ...sharedBooksData],
    recommendedBooks: [
      {
        id: 201,
        title: "취향 맞춤 책 1",
        author: "저자1",
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 202,
        title: "취향 맞춤 책 2",
        author: "저자2",
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 203,
        title: "취향 맞춤 책 3",
        author: "저자3",
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 204,
        title: "취향 맞춤 책 4",
        author: "저자4",
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 205,
        title: "취향 맞춤 책 5",
        author: "저자5",
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 206,
        title: "취향 맞춤 책 6",
        author: "저자6",
        imageUrl: "https://placehold.co/100x140",
      },
    ],
  };
};

const LibraryPage = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  useEffect(() => {
    const loadData = async () => {
      const pageData = await fetchLibraryPageData(libraryId);
      setData(pageData);
    };
    loadData();
  }, [libraryId]);

  if (!data) {
    return <PageContainer>로딩 중...</PageContainer>;
  }

  const { library, sharedBooks, recommendedBooks } = data;

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon width={24} height={24} />
          </BackButton>
        </Header>

        <LibraryHeader>
          <LibraryImage src={library.imageUrl} alt={library.name} />
          <LibraryTitle to={`/library/${library.id}`}>
            {library.name}
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

        <SwiperSection>
          <SectionHeader>
            <SectionTitle>{library.name}에 나눔된 모든 책</SectionTitle>
            <MoreLink to={`/library/${library.id}/shared`}>
              더보기 <ChevronRightIcon width={16} height={16} />
            </MoreLink>
          </SectionHeader>
          <CenteredSwiperWrapper>
            <Swiper
              modules={[Navigation, Autoplay, Mousewheel]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              mousewheel={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              spaceBetween={16}
              navigation={true} // 버튼이 필요 없다면 false로 변경
            >
              {sharedBooks.map((book, index) => (
                <SwiperSlide
                  key={`${book.id}-${index}`}
                  style={{ width: "120px" }}
                >
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </CenteredSwiperWrapper>
        </SwiperSection>

        <SearchPlaceholder>
          {/* 여기에 검색 컴포넌트를 작성하면 됩니다 */}
          🔍 {library.name}에 있는 책을 검색해보세요!
        </SearchPlaceholder>

        <Section>
          <SectionHeader>
            <SectionTitle>OO님과 취향이 유사한 분들이 좋아한 책</SectionTitle>
          </SectionHeader>
          <HorizontalScroll>
            {recommendedBooks.slice(0, 6).map((book) => (
              <BookCardWrapper key={book.id}>
                <BookCard book={book} />
              </BookCardWrapper>
            ))}
          </HorizontalScroll>
        </Section>
      </PageContainer>
    </PageWrapper>
  );
};

export default LibraryPage;

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh; /* 화면 높이로 고정 */
  max-width: 600px;
  margin: 0 auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
  padding: 60px 16px 16px 16px;
  background-color: #fff;
  flex-grow: 1;
`;

const Header = styled.header`
  display: flex;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const LibraryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const LibraryImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const LibraryTitle = styled(Link)`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-grow: 1;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffd700;
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
`;

const MoreLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;
  text-decoration: none;
`;

const SearchPlaceholder = styled.div`
  width: 100%;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 50px;
  color: #888;
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 10px; /* 스크롤바 공간 확보 */

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const BookCardWrapper = styled.div`
  flex: 0 0 110px; /* 너비 고정 */
`;

const SwiperSection = styled(Section)`
  background-color: #e6f4f0;
  border-radius: 16px;
  padding: 20px;
`;

const CenteredSwiperWrapper = styled.div`
  padding: 20px 0; /* 위아래 여백을 주어 커진 슬라이드가 잘리지 않게 함 */

  .swiper-slide {
    transition: transform 0.3s ease-out;
    transform: scale(0.85); /* 기본 슬라이드 크기를 약간 줄임 */
    opacity: 0.7;
  }

  .swiper-slide-active {
    transform: scale(
      1
    ); /* 활성화된 슬라이드만 원래 크기로 복원 (또는 더 크게) */
    opacity: 1;
  }

  /* Swiper의 이전/다음 버튼 스타일 수정 */
  .swiper-button-prev,
  .swiper-button-next {
    color: #4f614a;
    top: 50%;
    transform: translateY(-50%);
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px !important; /* 아이콘 크기 조정 */
  }
`;
