import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StepHeader from "../StepHeader";

export default function BookListPanel({
  mode,
  title,
  description,
  items=[],
  buttonLabel,
  disabled = false,
  onBack,
  onNext,
  onQuantityChange,
  onAddClick,
}) {
  const navigate = useNavigate();
  console.log('BookListPanel에 전달된 mode 값:', mode);

  return (
    <Wrap>
      <StepHeader
        title={title}
        activeStep={3}    // ← STEP 3 화면
        onBack={onBack}
      />

      <Inner>
        <SectionTitle>{description}</SectionTitle>
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

              <Author>{book?.author || "-"}</Author>

              <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>

              <SubWrap>
                <QuantityWrap>
                  <QuantityBtn onClick={() => onQuantityChange(book.isbn, -1)}>-</QuantityBtn>
                  <Quantity>{book.quantity}권</Quantity>
                  <QuantityBtn onClick={() => onQuantityChange(book.isbn, 1)}>+</QuantityBtn>
                </QuantityWrap>

                {mode === "give" ? (
                  <Point>500P</Point>
                ) : (
                <Price>{book?.price || "2000"}원</Price>
                )}
              </SubWrap>
            </BookInfoWrap>
          </BookWrap>
        ))}
        </BookListWrap>
      </Inner>

      <AddButton onClick={onAddClick}>+</AddButton>

      <BottomBar>
        <NextBtn disabled={disabled} onClick={onNext}>
          {buttonLabel}
        </NextBtn>
      </BottomBar>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #FFFFFF;
  margin: 0 auto;
  position: relative;

  /* 고정 헤더 공간 확보 + 하단 버튼 여유 */
  padding-top: 156px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const SectionTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const BookListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 117px;
  gap: 8px;
`;

const Cover = styled.div`
  width: 79px;
  height: 101px;
  flex-shrink: 0;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 75%;
  width: 100%;
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

const SubWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuantityWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const QuantityBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #F4F4F4;
  border-radius: 5px;
  border: 1px solid #DEDEDE;
  font-size: 16px;
  font-weight: 400;
`;

const Quantity = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const Point = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

const AddButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 84px;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  color: #FFFFFF;
  background-color: #11B55F;
  border-radius: 50px;
  border: none;
  font-size: 40px;
  z-index: 100;
  cursor: pointer;
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border-top: 1px solid #DEDEDE;
  bottom: 0;
  width: 100%;
  padding: 16px 20px;
  z-index: 10;
`;

const NextBtn = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  color: #FFFFFF;
  background: #11B55F;
  cursor: "pointer";
`;