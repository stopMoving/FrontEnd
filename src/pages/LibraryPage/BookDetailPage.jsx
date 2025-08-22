import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import axios from "../../lib/axios";

const BookDetailPage = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookData = async () => {
      console.log("페이지에서 받은 ISBN:", isbn);
      if (!isbn) {
        setError("책 정보를 찾을 수 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`books/by-isbn/${isbn}/`);
        console.log(response.data);
        setBook(response.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError("책 정보를 불러오는 데 실패했습니다.");
        }
        console.error("Failed to fetch book details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [isbn]);

  if (isLoading)
    return (
      <PageWrapper>
        <StatusContainer>로딩 중...</StatusContainer>
      </PageWrapper>
    );
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
  if (!book)
    return (
      <PageWrapper>
        <StatusContainer>책 정보가 없습니다.</StatusContainer>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
      </TopNavBar>

      <ContentContainer>
        <BookImageSection>
          <BookImage src={book.cover_url} alt={book.title} />
        </BookImageSection>

        <InfoWrapper>
          <Title>{book.title}</Title>
          <InfoList>
            <InfoItem>{book.author}</InfoItem>
            <InfoItem>{book.publisher}</InfoItem>
            <InfoItem>{book.published_date}</InfoItem>
            <InfoItem>
              <OriginalPrice>
                {book.regular_price.toLocaleString()}원
              </OriginalPrice>
            </InfoItem>
          </InfoList>

          <PriceInfo>{book.sale_price.toLocaleString()}원</PriceInfo>
          <IsbnInfo>ISBN 코드 : {book.isbn}</IsbnInfo>
          <Divider />

          <SummarySection>
            <SectionTitle>책 소개</SectionTitle>
            <SummaryText>
              {book.description || "제공된 책 소개가 없습니다."}
            </SummaryText>
          </SummarySection>

          {book.libraries && book.libraries.length > 0 && (
            <>
              {/* <Divider /> */}
              {/* <SummarySection>
              <SectionTitle>이 책을 볼 수 있는 도서관</SectionTitle>
              {book.libraries.map((lib) => (
                <LibraryItem key={lib.library_id}>
                  <LibraryName>{lib.name}</LibraryName>
                  <LibraryInfo>
                    <span>{lib.distance_m}m</span>
                    <span>보유: {lib.total_books}권</span>
                    <span className="available">
                      대여 가능: {lib.available_books}권
                    </span>
                  </LibraryInfo>
                </LibraryItem>
              ))}
            </SummarySection> */}
            </>
          )}
        </InfoWrapper>
      </ContentContainer>

      <BottomNavBar>
        <QuantityButton>
          수량 : {book.libraries[0]?.available_books || 0}권
        </QuantityButton>
        <ReserveButton>예약</ReserveButton>
      </BottomNavBar>
    </PageWrapper>
  );
};

export default BookDetailPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const TopNavBar = styled.header`
  width: 100%;
  max-width: 600px;
  height: 60px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: #e6f4f0;
  z-index: 10;

  left: 50%;
  transform: translateX(-50%);
`;

const BackButton = styled.button`
  margin-left: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const BottomNavBar = styled.footer`
  width: 100%;
  max-width: 600px;
  height: 80px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 10;

  left: 50%;
  transform: translateX(-50%);
`;

const ContentContainer = styled.main`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 100px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
`;

const BookImageSection = styled.div`
  width: 100%;
  background-color: #e6f4f0;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const BookImage = styled.img`
  display: block;
  width: 199px;
  height: 253px;
  margin: 24px auto 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  border: 1px solid #dedede;
`;

const InfoWrapper = styled.div`
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #6f6f6f;
  font-size: 14px;
`;

const InfoItem = styled.span`
  padding-right: 8px;
  border-right: 1px solid #e0e0e0;
  &:last-child {
    border-right: none;
  }
`;

const OriginalPrice = styled.del`
  text-decoration: line-through;
`;

const PriceInfo = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

const IsbnInfo = styled.p`
  font-size: 14px;
  color: black;
  margin-top: 8px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 32px 0;
`;

const SummarySection = styled.section`
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const SummaryText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: black;
  text-indent: 1em;
  overflow: hidden;
`;

const ActionButton = styled.button`
  height: 52px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const QuantityButton = styled(ActionButton)`
  flex-basis: 80px;
  background-color: #b5e8cd;
  border-radius: 30px;
  font-size: 14px;
  color: black;
`;

const ReserveButton = styled(ActionButton)`
  flex: 1;
  background-color: #11b55f;
  font-size: 24px;
  color: white;
`;

// const LibraryItem = styled.div`
//   border: 1px solid #f0f0f0;
//   border-radius: 8px;
//   padding: 16px;
//   margin-bottom: 12px;
// `;

// const LibraryName = styled.h3`
//   font-size: 16px;
//   font-weight: 600;
//   margin: 0 0 8px 0;
// `;

// const LibraryInfo = styled.div`
//   display: flex;
//   gap: 12px;
//   font-size: 14px;
//   color: #555;

//   .available {
//     color: #11b55f;
//     font-weight: 500;
//   }
// `;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #666;
  text-align: center;
`;
