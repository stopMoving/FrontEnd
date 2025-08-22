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

  useEffect(() => {
    if (searchQuery.length > 0) {
      setLoading(true);
      const timer = setTimeout(async () => {
        try {
          const data = await bookAPI.searchBooks(searchQuery);
          setBooks(data.results);
          setIsSearched(true);
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
        <SearchIcon fill={"#6F6F6F"} width={21} height={21} />
        <SearchInput
          type="text"
          placeholder="책 제목을 검색하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
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

// 두 줄로 나오는 거 수정
const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 100px;
  gap: 30px;
`;

const Notification = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #6f6f6f;

  .highlight {
    color: #000000;
  }
`;

const PageWrap = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px 20px 0;
`;

const Header = styled.div`
  position: relative;
  height: 52px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  margin-bottom: 8px;
`;

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 42px;
  background-color: #f0f2f5;
  border: none;
  border-radius: 20px;
  padding: 4px 16px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  font-size: 16px;
  font-weight: 600;
  background-color: #f0f2f5;
  border: none;
  color: #6f6f6f;
  cursor: pointer;
  padding: 8px;
  
  &:focus {
  outline: none;
  }
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
  flex-shrink: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 75%;
  width: 100%;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;
