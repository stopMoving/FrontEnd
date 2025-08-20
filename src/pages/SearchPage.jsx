import { useEffect, useState } from "react"
import styled, { css } from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import useBookStore from "../store/useBookStore";
import { useNavigate } from "react-router-dom";
import { bookAPI } from "../lib/axios";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const { scannedBooks } = useBookStore();
    const navigate = useNavigate();

    const onBack = () => {
      navigate(-1);
    }

    const handleBookClick = (isbn) => {
      navigate(`/search/book/info/${isbn}`)
    }

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
          <BookWrap key={book.isbn} onClick={() => handleBookClick(book.isbn)}>
            <Cover>
              {book?.cover_url
              ? <CoverImg src={book?.cover_url} alt="" />
              : <CoverFallback />}
            </Cover>

            <BookInfoWrap>
              <Title>{book?.title || "-"}</Title>

              <SubWrap>
                <Author>{book?.author || "-"}</Author>
                <Publisher>{book?.publisher || "-"}</Publisher>
                <PublishedDate>{book?.published_date || "-"}</PublishedDate>
              </SubWrap>
            </BookInfoWrap>
          </BookWrap>
        ))
      ) : isSearched ? (
        <MessageWrap>
          <SearchIcon width={72} height={72} />
          <Notification>
            <span className="highlight">"{searchQuery}"</span> 은 <br/>북작북작에 나눔되지 않았습니다.
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
  color: #6F6F6F;

  .highlight {
    color: #000000;
  }
`;

const PageWrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  margin: 0 auto;
  padding: 30px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 93%;
  height: 42px;
  background-color: #E6F4F0;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  margin: 10px auto;
  margin-bottom: 10px;

  svg {
    margin-right: 8px;
    color: #888;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  background-color: #E6F4F0;
  border: none;
  color: #000000;
  cursor: pointer;
  padding: 16px 10px;
`;

const BookListWrap = styled.div`
  width: min(520px, 92vw);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 10px;
  gap: 8px;
`;

const BookWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 117px;
  gap: 16px;
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
`

const CoverFallback = styled.div`
  width: 79px;
  height: 117px;
  border-radius: 5px;
  background-color: #D9D9D9;
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
  line-height: 1;
  gap: 8px;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const Author = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
  margin-bottom: 4px;
`;

const Publisher = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
  margin-bottom: 4px;
`;

const PublishedDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
  margin-bottom: 4px;
`;