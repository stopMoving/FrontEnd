import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import axios from "../../lib/axios";

import BottomNavBar from "../../components/Layout/BottomNavBar";
import { ReactComponent as BookTwinkleIcon } from "../../assets/icons/bookTwinkle.svg";
import useUserStore from "../../store/useUserStore";

const CATEGORIES = [
  "소설/시/희곡",
  "만화",
  "어린이",
  "인문학",
  "에세이",
  "수험서/자격증",
  "경제경영",
  "과학",
];

const AiRecommendPage = () => {
  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;

  const navigate = useNavigate();
  // 큐레이션 state
  const [activeBook, setActiveBook] = useState(null);
  const [books, setBooks] = useState([]);

  //  카테고리별 책목록 관리 state
  const [similarBooks, setSimilarBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [isSimilarLoading, setIsSimilarLoading] = useState(false);

  // 전체페이지 로딩 및 에러 관리 state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const aiBooksPromise = axios.get("preferences/recommendations/", {
          params: { mode: "combined" },
        });
        const similarBooksPromise = axios.get("preferences/recommendations/", {
          params: { mode: "activity", category: CATEGORIES[0] }, // 첫 카테고리로 초기 데이터 요청
        });

        const [aiBooksResponse, similarBooksResponse] = await Promise.all([
          aiBooksPromise,
          similarBooksPromise,
        ]);

        // 큐레이션 책 데이터
        const fetchedBooks = aiBooksResponse.data.results;
        setBooks(fetchedBooks);
        if (fetchedBooks.length > 0) {
          setActiveBook(fetchedBooks[0]);
        }

        // 카테고리별 책 데이터
        setSimilarBooks(similarBooksResponse.data.results);
      } catch (err) {
        console.error("초기 데이터 로딩 실패:", err);
        setError("추천 도서를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryClick = async (category) => {
    if (activeCategory === category || isSimilarLoading) return;
    setActiveCategory(category);
    setIsSimilarLoading(true);
    try {
      const response = await axios.get("preferences/recommendations/", {
        params: { mode: "activity", category },
      });
      setSimilarBooks(response.data.results);
    } catch (err) {
      console.error("카테고리별 도서 로딩 실패:", err);
      setSimilarBooks([]);
    } finally {
      setIsSimilarLoading(false);
    }
  };

  if (isLoading) {
    return <StatusContainer>AI가 추천 도서를 고르는 중...</StatusContainer>;
  }

  if (error) {
    return <StatusContainer>{error}</StatusContainer>;
  }

  return (
    <PageWrapper>
      <TopBanner>
        <BookTwinkleIcon />
        <BannerText>오늘은 이런 책 어때요?</BannerText>
      </TopBanner>

      <SimilarBooksSection>
        <SectionHeader>{`${userNickName}님이\n데려간 책과 비슷한 책이에요`}</SectionHeader>
        <CategoryTabs>
          {CATEGORIES.map((category) => (
            <CategoryTab
              key={category}
              isActive={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>
        <BookList>
          {isSimilarLoading ? (
            <PlaceholderText>책을 찾고 있어요...</PlaceholderText>
          ) : similarBooks.length > 0 ? (
            similarBooks.slice(0, 3).map((book) => (
              <BookItem
                key={book.isbn}
                onClick={() => navigate(`/search/book/info/${book.isbn}`)}
              >
                <BookItemImage src={book.cover_url} alt={book.title} />
                <BookItemInfo>
                  <BookItemTitle>{book.title}</BookItemTitle>
                  <BookItemAuthor>
                    {`${book.author.split(")")[0].trim()})`}
                  </BookItemAuthor>
                </BookItemInfo>
              </BookItem>
            ))
          ) : (
            <PlaceholderText>
              책을 데려가고 AI로 더 많은 책을 추천받아봐요!
            </PlaceholderText>
          )}
        </BookList>
      </SimilarBooksSection>

      <SectionTitle>{`${userNickName}님을\n잘 아는 AI 큐레이션`}</SectionTitle>

      <DisplaySection>
        {activeBook && (
          <ActiveBookDisplay
            onClick={() => navigate(`/search/book/info/${activeBook.isbn}`)}
          >
            <ActiveBookImage
              src={activeBook.cover_url}
              alt={activeBook.title}
            />
            <ActiveBookTitle>{activeBook.title}</ActiveBookTitle>
            <ActiveBookAuthor>{activeBook.author}</ActiveBookAuthor>
          </ActiveBookDisplay>
        )}
      </DisplaySection>

      <CurationSection>
        <SwiperWrapper>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={8}
            onSlideChange={(swiper) => {
              setActiveBook(books[swiper.realIndex]);
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCover src={book.cover_url} alt={book.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      </CurationSection>

      <BottomNavBar />
    </PageWrapper>
  );
};

export default AiRecommendPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  padding-bottom: 70px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBanner = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #e6f4f0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const BannerText = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: black;
`;

const CurationSection = styled.section`
  padding: 100px 20px 30px;
  margin: 0 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 24px;
  white-space: pre-wrap;
`;

const SwiperWrapper = styled.div`
  .swiper-slide {
    width: 79px;
    height: 101px;
    transition: transform 0.3s ease-out;
    opacity: 0.6;
  }

  .swiper-slide-active {
    opacity: 1;

    img {
      border: 2px solid black;
    }
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: #d9d9d9;
`;

const ActiveBookDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
`;
const ActiveBookImage = styled.img`
  width: 135px;
  height: 177px;
  border-radius: 8px;
  background-color: #d9d9d9;
  margin-bottom: 8px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #dedede;
`;

const ActiveBookTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;

  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const ActiveBookAuthor = styled.p`
  font-size: 12px;
  color: #868686;

  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const DisplaySection = styled.div`
  background-color: #b5e8cd;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px 0;
  margin: 0 20px;
  margin-bottom: -128px;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #6f6f6f;
`;

// 카테고리별 책

const SimilarBooksSection = styled.section`
  padding: 16px 0 16px;
  color: black;
  font-size: 16px;
`;

const SectionHeader = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

const CategoryTabs = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  margin-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTab = styled.button`
  flex-shrink: 0;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 20px;
  background-color: white;
  border: ${(props) =>
    props.isActive ? "1px solid #000" : "1px solid #DEDEDE"};
  color: ${(props) => (props.isActive ? "#000" : "#6F6F6F")};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;

  &:last-child {
    margin-right: 0;
  }
`;

const BookList = styled.div`
  padding: 0 20px;
  min-height: 200px; /* 로딩 중 레이아웃 깨짐 방지 */
`;

const BookItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const BookItemImage = styled.img`
  min-width: 79px;
  max-width: 80px;
  height: 101px;
  border-radius: 4px;
  background-color: #f0f0f0;
  margin-right: 16px;
  object-fit: cover;
  border: 1px solid #dedede;
`;

const BookItemInfo = styled.div`
  width: calc(100% - 95px);
`;

const BookItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;
`;

const BookItemAuthor = styled.p`
  font-size: 14px;
  color: #868686;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaceholderText = styled.p`
  text-align: center;
  color: ##868686;
  font-size: 16px;
  padding: 80px 20px;
`;
