import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "../../lib/axios";

import BottomNavBar from "../../components/Layout/BottomNavBar";
import { ReactComponent as BookTwinkleIcon } from "../../assets/icons/bookTwinkle.svg";

const AiRecommendPage = () => {
  const [activeBook, setActiveBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAiBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("preferences/recommendations/", {
          params: { mode: "activity" },
        });
        const fetchedBooks = response.data.results;
        setBooks(fetchedBooks);

        // 데이터를 성공적으로 불러온 후 첫 번째 책을 activeBook으로 설정
        if (fetchedBooks.length > 0) {
          setActiveBook(fetchedBooks[0]);
        }
      } catch (err) {
        console.error("AI 추천 도서 로딩 실패:", err);
        setError("추천 도서를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiBooks();
  }, []);

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

      <PlaceholderSection>
        <p>"OO님이 수령한 책과 비슷한 책이에요" 섹션 (추후 구현)</p>
      </PlaceholderSection>

      <SectionTitle>OO님을 잘 아는 AI의 큐레이션</SectionTitle>

      <DisplaySection>
        {activeBook && (
          <ActiveBookDisplay>
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
`;

const TopBanner = styled.header`
  width: 100%;
  height: 170px;
  background-color: #f0f2f5;
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

const PlaceholderSection = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #aaa;
  font-size: 12px;
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
`;
const ActiveBookImage = styled.img`
  width: 135px;
  height: 177px;
  border-radius: 8px;
  background-color: #d9d9d9;
  margin-bottom: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
