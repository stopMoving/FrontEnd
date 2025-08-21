import styled from "styled-components";

export default function DonateHistoryPanel({
    activeTab = 2
}) {
    return (
      <Wrap>
        <BookWrap>
          <BookCover>
          {/* <BookCover>
            {book?.image
              ? <CoverImg src={book?.image} alt="" />
              : <CoverFallback />}
          </BookCover> */}
            <CoverFallback />
          </BookCover>

          <Info>
            {/* <Title>{book?.title || "-"}</Title> */}
            <Title>책 제목</Title>

            <Meta>
              <Sub>김영삼 도서관</Sub>
              <Sub>2권</Sub>
              <Sub>2025.08.02</Sub>
              <Sub>3600원</Sub>
            </Meta>
          </Info>
        </BookWrap>
      </Wrap>
    )
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 20px;
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Sub = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;