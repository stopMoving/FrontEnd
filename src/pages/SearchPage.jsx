import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import useBookStore from "../store/useBookStore";
import { useNavigate } from "react-router-dom";
import { bookAPI } from "../lib/api";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const { scannedBooks } = useBookStore();
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const handleBookClick = (isbn) => {
    navigate(`/search/book/info/${isbn}`);
  };

  const fetchRecommendBook = async () => {
    try {
      const response = await instance.get("preferences/recommendations/", {
        params: { mode: "combined" },
      });

      const recommendedBookData = response.data?.results;

      if (recommendedBookData && Array.isArray(recommendedBookData) && recommendedBookData.length > 0) {
        const randomIndex = Math.floor(Math.random() * recommendedBookData.length);
        setRecommendBook(recommendedBookData[randomIndex]);
      } else {
        setRecommendBook(null);
      }
    } catch (error) {
      console.error("추천 도서 불러오기 실패: ", error);
      setRecommendBook(null);
    }
  }

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      setLoading(true);
      const timer = setTimeout(async () => {
        try {
          const data = await bookAPI.searchBooks(searchQuery);

          const results = data?.results || [];
          setBooks(results);
          setIsSearched(true);

          if (Array.isArray(results) && results.length === 0) {
            fetchRecommendBook();
          } else {
            setRecommendBook(null);
          }
        } catch (error) {
          console.error("검색 오류: ", error);
          setBooks([]);
          setIsSearched(true);
        } finally {
          setLoading(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setBooks([]);
      setIsSearched(false);
    }
  }, [searchQuery]);

  return (
    <PageWrap>
      <Header>
        <BackButton type="button" onClick={onBack}>
          <BackIcon width={24} height={24} />
        </BackButton>

        <SectionTitle>나눔된 책 검색</SectionTitle>
      </Header>

      <SearchContainer>
        <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
        <SearchInput
          type="text"
          placeholder="책 제목을 검색하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <BookListWrap>
        {loading ? (
          <MessageWrap>
            <Notification>검색 중입니다...</Notification>
          </MessageWrap>
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookWrap
              key={book.isbn}
              onClick={() => handleBookClick(book.isbn)}
            >
              <Cover>
                {book?.cover_url ? (
                  <CoverImg src={book?.cover_url} alt="" />
                ) : (
                  <CoverFallback />
                )}
              </Cover>

              <BookInfoWrap>
                <Title>{book?.title || "-"}</Title>

                <Sub>{book?.author || "-"}</Sub>
                <Sub>{book?.publisher || "-"}</Sub>
                <Sub>{book?.published_date || "-"}</Sub>
              </BookInfoWrap>
            </BookWrap>
          ))
        ) : isSearched ? (
          <MessageWrap>
            <SearchIcon width={72} height={72} />
            <Notification>
              <span className="highlight">"{searchQuery}"</span> 은 <br />
              북작북작에 나눔되지 않았습니다.
            </Notification>
          </MessageWrap>
        ) : (
          <MessageWrap>
            <Notification>검색어를 입력해 주세요.</Notification>
          </MessageWrap>
        )}
      </BookListWrap>
    </PageWrap>
  );
}

const PageWrap = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  margin: 0 auto;
  background: #ffffff;
  padding: 38px 20px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  background: none;
  border: 0;
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  // margin: 0 auto;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 42px;
  background-color: #e6f4f0;
  border: none;
  border-radius: 20px;
  padding: 4px 16px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  background-color: #e6f4f0;
  border: none;
  color: #000000;
  cursor: pointer;
  padding: 8px 10px;
`;

const BookListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const BookWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 101px;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

const Cover = styled.div`
  width: 79px;
  height: 101px;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const CoverFallback = styled.div`
  width: 79px;
  height: 101px;
  border-radius: 5px;
  background-color: #d9d9d9;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BookInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 60px;
  gap: 16px;
`;

const Notification = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #6f6f6f;

  .highlight {
    color: #000000;
  }
`;

const RecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 335px;
  min-height: 193px;
  background-color: #F4F4F4;
  border-radius: 5px;
  padding: 16px 0;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #6F6F6F;
  margin-bottom: 8px;
`;

const RecommendBookWrap = styled.div`
  width: 106px;
  height: 129px;
  margin-bottom: 8px;
`;

const RecommendBook = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  text-align: center;
`;
