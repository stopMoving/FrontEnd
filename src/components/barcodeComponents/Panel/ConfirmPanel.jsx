import styled, { css } from "styled-components";

export default function ConfirmPanel({
  mode = "give",
  step = 1,
  book,
  loading = false,
  onPrimary,   // step1: 다시 찍기, step2: 아니오(완료)
  onSecondary, // step1: 확인 → step2로, step2: 네(추가)
}) {
  const STEP1_TITLE = "이 책이 맞는지 확인해주세요.";
  const STEP1_PRIMARY = "다시 찍기";
  const STEP1_SECONDARY = "확인";

  return (
    <Wrap $step={step}>
      {step === 1 && (
        <>
          <Title>{STEP1_TITLE}</Title>

          <BookWrap>
            {book?.image
              ? <Cover src={book?.image} alt="" />
              : <CoverFallback />}
          </BookWrap>

          <BookTitle>{book?.title || "제목 없음"}</BookTitle>

          <Meta>
            <Sub>{book?.author || "-"}</Sub>
            {/* <Sub>출판사 | {book?.publisher || "-"}</Sub> */}
            <Sub>{book?.published_date}</Sub>
            {mode === "take" && (
              <Sub>가격 | <del>{book?.regular_price || "-"}</del>원</Sub>
            )}
          </Meta>
<<<<<<< HEAD

          {mode === "give" ? (
            <Point>500P</Point>
          ) : (
            <Price>({book?.price}원 || "2000원")</Price>
          )}

          <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>

          <QuantityWrap>
            <QuantityBtn>-</QuantityBtn>
            <Quantity>1권</Quantity>
            <QuantityBtn>+</QuantityBtn>
          </QuantityWrap>
          
=======
            <Price>
                {book?.price || "-"}{mode === "give" ? "P" : "원"}
            </Price>
            <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>
            
>>>>>>> 72b31f74fd623f9014c8ae49b1ca770c11bde409
          <Buttons>
            <AgainBtn onClick={onPrimary} disabled={loading}>
              {STEP1_PRIMARY}
            </AgainBtn>
            <OkBtn onClick={onSecondary} disabled={loading}>
              {STEP1_SECONDARY}
            </OkBtn>
          </Buttons>
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 335px;
  height: ${({ $step }) => ($step === 1 ? "560px" : "232px")};
  border-radius: 10px;
  background: #ffffff;
  padding: 40px 16px;
  gap: 40px;
  transition: height 0.2s ease;
`;

const Title = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
  margin: 4px 0 16px;
  line-height: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BookWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 177px;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 15px;
  gap: 10px;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CoverFallback = styled.div`
  width: 100%;
  height: 100%;
  background: #575757;
`;

const BookTitle = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
  margin: 4px 0 16px;
  line-height: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
  width: max-content;
  text-align: center;
  margin: 0 auto;
  gap: 4px;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const Point = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin: 10px;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin: 8px;
`;

const Isbn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 15px;
`;

const QuantityWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const QuantityBtn = styled.div`
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
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 25px;
`;

const AgainBtn = styled.button`
  font-size: 18px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 10px;
  line-height: 1;
  border: 1px solid #DEDEDE;
  color: #000000;
  background: #F4F4F4;
  transition: transform .02s ease;

  &:active {
    transform: translateY(1px);
  }

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      background: #11B55F;
      color: #FFFFFF;
      border-color: #11B55F;
    `}
`;

const OkBtn = styled.button`
  font-size: 18px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 10px;
  line-height: 1;
  border: 1px solid #11B55F;
  color: #FFFFFF;
  background: #11B55F;
  transition: transform .02s ease;

  &:active {
    transform: translateY(1px);
`;