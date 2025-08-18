import { useEffect, useState } from "react"
import styled from "styled-components";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loadint, setLoading] = useState(false);

    const mockBooks = [];

    useEffect(() => {
      if (searchQuery.length > 0) {
        setLoading(true);
        const timer = setTimeout(() => {
          const filteredBooks = mockBooks.filter((book) =>
          book.title.includes(searchQuery)
          );
        setBooks(filteredBooks);
        setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } else {
        setBooks([]);
      }
    }, [searchQuery]);
}

return (
  <Wrap>
    <TopBar>
      <BackButton type="button" onClick={onBack}>
        <BackIcon width={24} height={24} />
      </BackButton>

      <SearchButton onClick={handleSearchClick}>
      <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
        관심있는 책을 검색해보세요!
    </SearchButton>
    </TopBar>

    <BookListWrap>
      {items.map((book) => (
        <BookWrap key={book.isbn}>
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
</Wrap>
)

const Wrap = styled.header`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: #fff;
  z-index: 30px;
  border-bottom: 1px solid #000000;
`;

const TopBar = styled.div`
  position: relative;
  height: 50px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  padding: 0 10px;
`

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  width: 100%;
  height: 42px;
  background-color: #f0f2f5;
  border: none;
  border-radius: 50px;
  color: #6f6f6f;
  cursor: pointer;
  font-size: 14px;
  padding: 16px 16px;
`;

const Inner = styled.div`
  padding: 0 16px;
  display: grid;
  gap: 20px;
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

const Isbn = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px;
`;