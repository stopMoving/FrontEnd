import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BottomNavBar from "../../components/Layout/BottomNavBar";
import { ReactComponent as BookTwinkleIcon } from "../../assets/icons/bookTwinkle.svg";

// mock 데이터
const mockAiBooks = [
  {
    id: 1,
    title: "선택된 책",
    author: "저자",
    imageUrl: "https://placehold.co/135x177?text=대형책",
  },
  {
    id: 2,
    title: "책 제목 01",
    author: "저자01",
    imageUrl: "https://placehold.co/78x101?text=책01",
  },
  {
    id: 3,
    title: "책 제목 02",
    author: "저자02",
    imageUrl: "https://placehold.co/78x101?text=선택된+책",
  },
  {
    id: 4,
    title: "책 제목 03",
    author: "저자03",
    imageUrl: "https://placehold.co/78x101?text=책03",
  },
  {
    id: 5,
    title: "책 제목 04",
    author: "저자04",
    imageUrl: "https://placehold.co/78x101?text=책04",
  },
  {
    id: 6,
    title: "책 제목 05",
    author: "저자05",
    imageUrl: "https://placehold.co/79x101?text=책05",
  },
  {
    id: 7,
    title: "책 제목 06",
    author: "저자06",
    imageUrl: "https://placehold.co/79x101?text=책06",
  },
  {
    id: 8,
    title: "책 제목 07",
    author: "저자07",
    imageUrl: "https://placehold.co/79x101?text=책07",
  },
];

const AiRecommendPage = () => {
  const [activeBook, setActiveBook] = useState(null);

  useEffect(() => {
    if (mockAiBooks.length > 0) {
      setActiveBook(mockAiBooks[0]);
    }
  }, []);

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
            <ActiveBookImage src={activeBook.imageUrl} alt={activeBook.title} />
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
              setActiveBook(mockAiBooks[swiper.realIndex]);
            }}
          >
            {mockAiBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCover src={book.imageUrl} alt={book.title} />
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
`;
const ActiveBookTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
`;
const ActiveBookAuthor = styled.p`
  font-size: 12px;
  color: #868686;
`;

const DisplaySection = styled.div`
  background-color: #b5e8cd;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px 0;
  margin: 0 20px;
  margin-bottom: -128px;
`;
