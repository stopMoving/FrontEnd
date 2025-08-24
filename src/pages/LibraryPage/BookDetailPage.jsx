import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import axios from "../../lib/axios";
import LoadingPage from "../LoadingPage";

const BookDetailPage = () => {
  const { libraryId, isbn } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookData = async () => {
      console.log("페이지에서 받은 ISBN:", isbn);
      if (!libraryId || !isbn) {
        setError("책 정보를 찾을 수 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`library/book-detail/${libraryId}/`, {
          params: {
            isbn: isbn,
          },
        });
        const { data, book_cnt } = response.data;
        setBookData(data);
        setBookCount(book_cnt);
        console.log(bookCount);
      } catch (err) {
        if (err.response?.data?.detail) {
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
  }, [libraryId, isbn]);

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
  if (!bookData)
    return (
      <PageWrapper>
        <StatusContainer>책 정보가 없습니다.</StatusContainer>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </TopNavBar>

      <ContentContainer>
        <BookImageSection>
          <BookImage src={bookData.cover_url} alt={bookData.title} />
        </BookImageSection>

        <InfoWrapper>
          <TitleHeader>
            <Title>{bookData.title}</Title>
            <QuantityBadge>수량 : {bookCount || 0}권</QuantityBadge>
          </TitleHeader>

          <InfoList>
            <InfoItem>{bookData.author}</InfoItem>
            <InfoItem>{bookData.publisher}</InfoItem>
            <InfoItem>{bookData.published_date}</InfoItem>
            <InfoItem>
              <OriginalPrice>
                {bookData.regular_price.toLocaleString()}원
              </OriginalPrice>
            </InfoItem>
          </InfoList>

          <PriceInfo>{bookData.sale_price.toLocaleString()}원</PriceInfo>
          <IsbnInfo>ISBN 코드 : {bookData.isbn}</IsbnInfo>
          <Divider />

          <SummarySection>
            <SectionTitle>책 소개</SectionTitle>
            <SummaryText>
              {bookData.description || "제공된 책 소개가 없습니다."}
            </SummaryText>
          </SummarySection>
        </InfoWrapper>
      </ContentContainer>
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
  padding: 0 20px;
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
  background: none;
  border: none;
  cursor: pointer;
`;

const ContentContainer = styled.main`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 40px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookImageSection = styled.div`
  width: 100%;
  background-color: #e6f4f0;
  padding: 16px 0 0 16px;
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

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  flex: 1;
  min-width: 0; //flex 아이템의 크기가 줄어들 수 있도록 설정
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  color: #6f6f6f;
  font-size: 12px;
`;

const QuantityBadge = styled.span`
  background-color: #b5e8cd;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 4px;
`;

const InfoItem = styled.span`
  &:last-child {
    border-right: none;
  }
`;

const OriginalPrice = styled.del`
  text-decoration: line-through;
`;

const PriceInfo = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
`;

const IsbnInfo = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;

const Divider = styled.hr`
  border: none;
  margin: 32px 0;
`;

const SummarySection = styled.section`
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const SummaryText = styled.p`
  font-size: 12px;
  line-height: 1.6;
  color: black;
  font-weight: 500;
  text-indent: 0.6em;
  overflow: hidden;
`;

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
