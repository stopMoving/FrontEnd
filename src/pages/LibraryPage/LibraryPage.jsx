import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

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

        <SectionHeader>
          <SectionTitle>{library.name}에 나눔된 모든 책</SectionTitle>
          <MoreLink to={`/library/${library.id}/shared`}>
            더보기 <ChevronRightIcon width={16} height={16} />
          </MoreLink>
        </SectionHeader>
        <SwiperSection>
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
              navigation={true}
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
          <SearchIcon width={20} height={20} /> {library.name}에 있는 책을
          검색해보세요!
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

  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 24px;
  }
`;

const LibraryImage = styled.img`
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

  @media (max-width: 480px) {
    font-size: 28px;
  }
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
  gap: 8px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  min-width: 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
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
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-center: center;
  gap: 8px;
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
  flex: 0 0 110px;
`;

const SwiperSection = styled(Section)`
  background-color: #e6f4f0;
  padding: 20px 0;
  margin-bottom: 32px;

  width: calc(100% + 40px);
  margin-left: -16px;
  margin-right: -16px;

  // min-height: 300px
  // overflow: hidden;
`;

const CenteredSwiperWrapper = styled.div`
  .swiper {
    padding: 20px 0 !important;
  }

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
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px !important;
  }
`;
