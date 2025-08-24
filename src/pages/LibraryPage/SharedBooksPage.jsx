import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import axios from "../../lib/axios";
import LoadingPage from "../../pages/LoadingPage";

const SharedBooksPage = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const libraryName = searchParams.get("name") || "도서관";

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`library/booklist/${libraryId}/`);
        setBooks(response.data);
      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("책 목록을 불러오는 데 실패했습니다.");
        }
        console.error("Failed to fetch book list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [libraryId]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <LoadingPage />;
  if (error)
    return (
      <PageWrapper>
        <TopNavBar>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon />
          </BackButton>
        </TopNavBar>
        <StatusContainer>
          😥
          <br />
          {error}
        </StatusContainer>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <PageTitle>{libraryName}의 모든 나눔 책</PageTitle>
      </TopNavBar>

      <ContentContainer>
        <SearchInputContainer>
          <SearchIconWrapper>
            <SearchIcon fill={"#6F6F6F"} width={24} height={24} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder={`${libraryName}에 있는 책을 검색해보세요`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </SearchInputContainer>

        <BookList>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              // key와 onClick 이벤트에 isbn 사용
              <BookListItem
                key={book.isbn}
                onClick={() =>
                  navigate(`/library/${libraryId}/book/${book.isbn}`)
                }
              >
                <BookImage src={book.cover} alt={book.title} />
                <BookInfo>
                  <BookTitle>{book.title}</BookTitle>
                  <InfoText>{book.author}</InfoText>
                  <InfoText>{book.publisher}</InfoText>
                </BookInfo>
              </BookListItem>
            ))
          ) : (
            <StatusContainer>
              {searchQuery ? "검색 결과가 없습니다." : "나눔된 책이 없습니다."}
            </StatusContainer>
          )}
        </BookList>
      </ContentContainer>
    </PageWrapper>
  );
};

export default SharedBooksPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  overflow: hidden;
`;

const TopNavBar = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 600px;
  height: 60px;
  background-color: #fff;
  // border-bottom: 1px solid #f0f0f0;
  z-index: 10;
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: black;
`;

const ContentContainer = styled.main`
  padding: 60px 20px 20px;
  width: 100%;
  box-sizing: border-box;

  flex: 1;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 60px 16px 16px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const BookImage = styled.img`
  width: 79px;
  height: 101px;
  border-radius: 8px;
  background-color: #f0f0f0;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #dedede;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #868686;
  margin: 0;
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 53%;
  left: 16px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 50px;
  border: none;
  background-color: #e6f4f0;
  padding: 0 20px 0 48px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    transition: 0.2s ease-in-out;
    outline: none;
    // box-shadow: 0 0 0 2px #11b55f;
  }
`;

const StatusContainer = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #6f6f6f;
  line-height: 1.6;
`;
