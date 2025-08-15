import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";

const fetchBookDetail = async (bookId) => {
  console.log(`${bookId} 책 상세 정보 요청`);
  return {
    id: bookId,
    title: "어린이를 위한 습관의 힘",
    author: "이소영",
    publisher: "출판사A",
    originalPrice: 18000,
    discountedPrice: 3600,
    isbn: "979-11-9691-803-3",
    summary:
      "이 책은 어린이들이 좋은 습관을 형성할 수 있도록 돕는 구체적인 방법들을 소개합니다. 줄거리가 길어질 경우, 이 텍스트는 네 번째 줄에서 잘리게 될 것입니다. 습관의 중요성을 깨닫고, 일상생활 속에서 작은 성공을 경험하며 자신감을 키울 수 있도록 안내합니다. 이 부분은 화면에 보이지 않아야 합니다.이 부분은 화면에 보이지 않아야 합니다.이 부분은 화면에 보이지 않아야 합니다.",
    quantity: 2,
    imageUrl: "https://placehold.co/199x253?text=초대형책",
  };
};

const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBookData = async () => {
      const data = await fetchBookDetail(bookId);
      setBook(data);
    };
    loadBookData();
  }, [bookId]);

  if (!book) {
    return <PageWrapper>로딩 중...</PageWrapper>;
  }

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
      </TopNavBar>

      <ContentContainer>
        <BookImage src={book.imageUrl} alt={book.title} />
        <Title>{book.title}</Title>

        <InfoList>
          <InfoItem>{book.author}</InfoItem>
          <InfoItem>{book.publisher}</InfoItem>
          <InfoItem>
            <OriginalPrice>
              {book.originalPrice.toLocaleString()}원
            </OriginalPrice>
          </InfoItem>
        </InfoList>

        <PriceInfo>{book.discountedPrice.toLocaleString()}원</PriceInfo>

        <IsbnInfo>ISBN 코드 : {book.isbn}</IsbnInfo>

        <Divider />

        <SummarySection>
          <SectionTitle>책 소개</SectionTitle>
          <SummaryText>{book.summary}</SummaryText>
        </SummarySection>
      </ContentContainer>

      <BottomNavBar>
        <QuantityButton>수량 : {book.quantity}권</QuantityButton>
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
  background-color: #fff;
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
  padding: 60px 20px 100px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
`;

const BookImage = styled.img`
  display: block;
  width: 199px;
  height: 253px;
  margin: 24px auto 32px;
  background-color: #f0f0f0;
  border-radius: 8px;
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
  color: #6f6f6f;
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
