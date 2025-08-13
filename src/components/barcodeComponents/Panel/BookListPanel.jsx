import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StepHeader from "../StepHeader";

export default function BookListPanel({
  mode,
  book,
  title,
  description,
  items=[],
  buttonLabel,
  disabled = false,
  onNext,
}) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <StepHeader
        title={title}
        activeStep={3}    // ← STEP 3 화면
        onBack={() => navigate(-1)}
      />

      <Inner>
        <SectionTitle>{description}</SectionTitle>
        {/* 바코드 찍은 책 목록 불러오기 */}
        <BookListWrap>
          <BookWrap>
            <Cover>
              {book?.image
              ? <Cover src={book?.image} alt="" />
              : <CoverFallback />}
            </Cover>
          
            <BookInfoWrap>
              <Title>
                {book?.title || "-"}
              </Title>

              <Meta>
                <Sub>저자 | {book?.author || "-"}</Sub>
                <Sub>출판사 | {book?.publisher || "-"}</Sub>
              </Meta>

              <Price>{book?.price || "-"}{mode === "give" ? "P" : "원"}</Price>
              <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>
            </BookInfoWrap>
          </BookWrap>
        </BookListWrap>
      </Inner>

      <BottomBar>
        <Button disabled={disabled} onClick={onNext}>
          {buttonLabel}
        </Button>
      </BottomBar>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  background: #fff;
  position: relative;

  /* 고정 StepHeader 높이만큼 여백 확보 */
  padding-top: 180px;
`;

const Inner = styled.div`
  padding: 0 16px;
  display: grid;
  gap: 20px;
`;

const SectionTitle = styled.div`
  width: min(520px, 92vw);
  font-size: 20px;
  font-weight: 600;
  margin: 0 auto;
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
`;

const Cover = styled.div`
  width: 79px;
  height: 117px;
  border-radius: 5px;
  object-fit: cover;
`;

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
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 10px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
  width: max-content;
  text-align: left;
  margin: 0 auto;
  gap: 4px;
  margin-bottom: 10px;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 10px;
`;

const Isbn = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 47px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  color: #FFFFFF;
  background: #11B55F;
  cursor: "pointer";
`;