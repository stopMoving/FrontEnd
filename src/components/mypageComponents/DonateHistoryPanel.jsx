import { useEffect, useState } from "react";
import styled from "styled-components";
import { userAPI } from "../../lib/api";

export default function DonateHistoryPanel({
  activeTab = 1
}) {
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonatedBooks = async () => {
      try {
        const books = await userAPI.getDonatedBooks();
        setDonatedBooks(books);
      } catch (error) {
        console.error("나눔 내역 로딩 실패: ", error);
        setDonatedBooks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonatedBooks();
  }, []);

  if (isLoading) {
    return (
    <MessageWrap>
      <Notification>나눔 내역을 불러오는 중...</Notification>;
    </MessageWrap>
    )
  }

  if (donatedBooks.length === 0) {
    return (
    <MessageWrap>
      <Notification>나눔한 책이 없습니다.</Notification>;
    </MessageWrap>
    )
  }

  return (
    <Wrap>
      {donatedBooks.map((book, index) => (
        <BookWrap key={index}>
          <BookCover>
            {book?.cover ? (
              <CoverImg src={book?.cover} alt="" />
            ) : (
              <CoverFallback />
            )}
          </BookCover>

          <Info>
            <Title>{book?.title || "-"}</Title>

            <Meta>
              <Sub>
                <span>{book?.library_name}</span>
                <span>•</span>
                <span>{book?.quantity}권</span>
              </Sub>
              <Sub>{book?.created_at.split("T")[0]}</Sub>
              <Sub>+ {500 * book?.quantity}P</Sub>
            </Meta>
          </Info>
        </BookWrap>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;
  gap: 16px;
`;

const BookWrap = styled.div`
  height: 129px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const BookCover = styled.div`
  width: 106px;
  height: 129px;
  flex-shrink: 0;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const CoverFallback = styled.div`
  width: 106px;
  height: 129px;
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

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
  width: 100%;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Sub = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  gap: 4px;
`;

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
`;