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
import useLibrarySidebarStore from "../../store/useLibrarySidebarStore";
import { useToaster } from "../../store/useToasterStore";
import LoadingPage from "../LoadingPage";

const LibraryPage = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { state } = useLocation();
  const libraryName = state?.name;

  // 도서관 URL 저장
  const [libraryImageUrl, setLibraryImageUrl] = useState(null);

  // toast 불러오기
  const toast = useToaster();

  // 도서관 전역상태 가져오기
  const { myLibraries, fetchMyLibraries } = useLibrarySidebarStore();

  const [sharedBooks, setSharedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false); // 즐겨찾기 버튼 로딩

  // 즐겨찾기 되어있는지 확인
  useEffect(() => {
    if (myLibraries.length > 0) {
      const isFav = myLibraries.some((lib) => lib.id === parseInt(libraryId));
      setIsFavorite(isFav);
    }
  }, [myLibraries, libraryId]);

  useEffect(() => {
    if (!libraryName) {
      setError("도서관 정보를 찾을 수 없습니다.");
      setIsLoading(false);
      // navigate(-1);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Promise.all을 사용해 두 API를 동시에 호출
        const [
          sharedBooksResponse,
          recommendedBooksResponse,
          libraryImageResponse,
        ] = await Promise.all([
          axios.get(`library/booklist/${libraryId}/`),
          axios.get(`library/recommendations/${libraryId}/`),
          axios.get(`library/image/${libraryId}/`),
        ]);

        setSharedBooks(sharedBooksResponse.data);
        setRecommendedBooks(recommendedBooksResponse.data.results);
        setLibraryImageUrl(libraryImageResponse.data.library_image_url);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [libraryId, libraryName]);

  //즐겨찾기 함수
  const handleToggleFavorite = async () => {
    setIsTogglingFavorite(true);
    try {
      const response = await axios.post("users/my-libraries/modify/", {
        library_id: parseInt(libraryId),
      });
      setIsFavorite(response.data.in_my_lib);
      await fetchMyLibraries();
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      toast(err, "내 도서관 등록/해제에 실패했습니다.");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  if (isLoading) return <LoadingPage />;
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
          <LibraryImage imageUrl={libraryImageUrl} />
          <LibraryTitle to={`/library/detail/${libraryId}`}>
            {libraryName}
            <InfoIcon width={16} height={16} />
          </LibraryTitle>
          <FavoriteButton
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
          >
            {isFavorite ? (
              <StarIcon width={28} height={28} />
            ) : (
              <StarOutlineIcon width={28} height={28} />
            )}
          </FavoriteButton>
        </LibraryHeader>

        <Section>
          <SectionHeader>
            <SectionTitle>
              {user?.nickname || "회원"}님과
              <br />
              취향이 유사한 분들이 좋아한 책
            </SectionTitle>
          </SectionHeader>

          <SwiperSection>
            <CenteredSwiperWrapper>
              <Swiper
                modules={[Navigation, Autoplay, Mousewheel]}
                slidesPerView={3}
                spaceBetween={15}
                centeredSlides={true}
                navigation={true}
                initialSlide={1}
              >
                {recommendedBooks.map((book) => (
                  <SwiperSlide
                    key={book.isbn}
                    style={{ width: "120px" }}
                    onClick={() =>
                      navigate(`/library/${libraryId}/book/${book.isbn}`)
                    }
                  >
                    <BookCard
                      book={{
                        title: book.title,
                        author: book.author,
                        imageUrl: book.cover_url,
                      }}
                      onClick={() =>
                        navigate(`/library/${libraryId}/book/${book.isbn}`)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </CenteredSwiperWrapper>
          </SwiperSection>
        </Section>

        <SearchPlaceholder
          onClick={() =>
            navigate(
              `/library/${libraryId}/shared?name=${encodeURIComponent(
                libraryName
              )}`
            )
          }
        >
          <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
          {libraryName}에 있는 책을 검색해보세요!
        </SearchPlaceholder>

        <Section>
          <SectionHeader>
            <SectionTitle>{libraryName}에 나눔된 모든 책</SectionTitle>
            <MoreLink
              to={{
                pathname: `/library/${libraryId}/shared`,
                search: `?name=${encodeURIComponent(libraryName)}`,
              }}
            >
              더보기 <ChevronRightIcon width={16} height={16} />
            </MoreLink>
          </SectionHeader>
          <HorizontalScroll>
            {sharedBooks.map((book, index) => (
              <BookCardWrapper
                key={`shared-${index}`}
                onClick={() =>
                  navigate(`/library/${libraryId}/book/${book.isbn}`)
                }
              >
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
  padding: 20px 20px 20px;
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

  background-image: url(${(props) => props.imageUrl});
  background-size: cover; // 원 꽉 채우기
  background-position: center; // 이미지 중앙이 보이게
  background-repeat: no-repeat;
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
  margin-bottom: 4px;
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
  background-color: #e6f4f0;
  border-radius: 50px;
  color: #6f6f6f;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  flex-start: left;
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
  flex: 0 0 110px;
  display: flex;
  cursor: pointer;
`;

const SwiperSection = styled(Section)`
  background-color: #e6f4f0;
  padding: 30px 20px 20px;
  width: calc(100% + 40px);
  margin: 0 -20px 32px -20px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
`;
//padding: 30px; 20px;
const CenteredSwiperWrapper = styled.div`
  .swiper {
    overflow: visible;
  }

  .swiper-slide {
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    transform: scale(0.85);
    opacity: 0.7;
  }

  .swiper-slide-active {
    transform: scale(1.1);
    opacity: 1;
    z-index: 1;
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
