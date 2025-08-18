import { useEffect, useState } from "react"
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import useBookStore from "../store/useBookStore";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { scannedBooks } = useBookStore();
    const navigate = useNavigate();

    const onBack = () => {
      navigate(-1);
    }

    const handleBookClick = (isbn) => {
      navigate(`/book-detail/${isbn}`)
    }

    useEffect(() => {
      if (searchQuery.length > 0) {
        setLoading(true);
        const timer = setTimeout(() => {
          const filteredBooks = scannedBooks.filter((book) =>
            book.title.includes(searchQuery)
          );
        setBooks(filteredBooks);
        setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } else {
        setBooks(scannedBooks);
      }
    }, [searchQuery, scannedBooks]);
    
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
        {books.map((book) => (
          <BookWrap key={book.isbn} onClick={() => handleBookClick(book.isbn)}>
            <Cover>
              {book?.image
              ? <CoverImg src={book?.image} alt="" />
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
        ))}
      </BookListWrap>
      
  </PageWrap>
  )
}

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

  svg {
    margin-right: 8px;
    color: #888;
  }
`;

const SearchInput = styled.input`
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
  gap: 8px;
`;

const BookWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 117px;
  gap: 16px;
  align-items: flex-start;
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
  line-height: 1;
  gap: 4px;
`;

const SubWrap = styled.div`
  gap: 8px;
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