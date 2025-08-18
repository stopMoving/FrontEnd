import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const fetchLibraryPageData = async (libraryId) => {
  console.log(`${libraryId} 페이지 데이터 요청`);
  const sharedBooksData = [
    {
      id: 101,
      title: "여행의 이유 (아주 긴 제목 테스트용 텍스트)",
      author: "김영하",
      publisher: "문학동네",
      publicationDate: "2025.04.17",
      imageUrl: "https://placehold.co/80x112?text=책1",
    },
    {
      id: 102,
      title: "달러구트 꿈 백화점",
      author: "이미예",
      publisher: "팩토리나인",
      publicationDate: "2025.07.08",
      imageUrl: "https://placehold.co/80x112?text=책2",
    },
    // ... 더 많은 책 데이터
    {
      id: 103,
      title: "아몬드",
      author: "손원평",
      publisher: "창비",
      publicationDate: "2025.03.31",
      imageUrl: "https://placehold.co/80x112?text=책3",
    },
    {
      id: 104,
      title: "불편한 편의점",
      author: "김호연",
      publisher: "나무옆의자",
      publicationDate: "2025.04.20",
      imageUrl: "https://placehold.co/80x112?text=책4",
    },
    {
      id: 105,
      title: "코스모스",
      author: "칼 세이건",
      publisher: "사이언스북스",
      publicationDate: "2024.12.20",
      imageUrl: "https://placehold.co/80x112?text=책5",
    },
  ];
  return {
    library: {
      id: libraryId,
      name: "김영삼 도서관",
    },
    sharedBooks: [...sharedBooksData, ...sharedBooksData, ...sharedBooksData],
  };
};

const SharedBooksPage = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const pageData = await fetchLibraryPageData(libraryId);
      setData(pageData);
    };
    loadData();
  }, [libraryId]);

  if (!data) {
    return <PageWrapper>로딩 중...</PageWrapper>;
  }

  const { library, sharedBooks } = data;

  const filteredBooks = sharedBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </TopNavBar>

      <ContentContainer>
        <ListHeader>{library.name}에 나눔된 모든 책</ListHeader>

        <SearchInputContainer>
          <SearchIconWrapper>
            <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder={`${library.name}에 있는 책을 검색해보세요!`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputContainer>

        <BookList>
          {filteredBooks.map((book, index) => (
            <BookListItem
              key={`${book.id}-${index}`}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <BookImage src={book.imageUrl} alt={book.title} />
              <BookInfo>
                <BookTitle>{book.title}</BookTitle>
                <InfoText>{book.author}</InfoText>
                <InfoText>{book.publisher}</InfoText>
                <InfoText>{book.publicationDate}</InfoText>
              </BookInfo>
            </BookListItem>
          ))}
        </BookList>
      </ContentContainer>
    </PageWrapper>
  );
};

export default SharedBooksPage;

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding-top: 30px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const TopNavBar = styled.header`
  width: 100%;
  padding-top: 50px;
  max-width: 600px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 10;

  left: 50%;
  transform: translateX(-50%);
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ContentContainer = styled.main`
  padding: 60px 20px 20px;
  width: 100%;
  background-color: white;

  @media (max-width: 480px) {
    padding: 60px 16px 16px;
  }
`;

const ListHeader = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

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
  color: #555;
  margin: 0;
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  pointer-events: none; /* 아이콘 뒤로 클릭이 통과되도록 */
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 50px;
  border: none;
  background-color: #e6f4f0;
  padding: 0 20px 0 48px;
  font-size: 14px;
  box-sizing: border-box;

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #11b55f;
  }
`;
