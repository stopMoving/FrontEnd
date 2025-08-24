import styled, { css } from "styled-components";

export default function ConfirmPanel({
  mode = "give",
  book,
  loading = false,
  quantity,
  onQuantityChange,
  onPrimary,
  onSecondary,
}) {
  return (
    <Wrap>
        <>
          <Title>이 책이 맞는지 확인해주세요.</Title>

          <BookWrap>
            {book?.image
              ? <Cover src={book?.image} alt="" />
              : <CoverFallback />}
          </BookWrap>

          <BookTitle>{book?.title || "제목 없음"}</BookTitle>

          <Meta>
            <Sub>{book?.author || "-"}</Sub>
            <Sub>{book?.published_date}</Sub>
            {mode === "take" && (
              <Sub><del>{book?.regular_price || "-"}</del>원</Sub>
            )}
          </Meta>

          {mode === "give" ? (
            <Point>{500 * quantity}P</Point>
          ) : (
            <Price>{book?.price * quantity || "2000"}원</Price>
          )}

          <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>

          <QuantityWrap>
            <QuantityBtn onClick={() => onQuantityChange(-1)}>-</QuantityBtn>
            <Quantity>{quantity}권</Quantity>
            <QuantityBtn onClick={() => onQuantityChange(1)}>+</QuantityBtn>
          </QuantityWrap>
          
          <Buttons>
            <AgainBtn onClick={onPrimary} disabled={loading}>
              다시 스캔
            </AgainBtn>
            <OkBtn onClick={onSecondary} disabled={loading}>
              확인
            </OkBtn>
          </Buttons>
        </>
      
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 335px;
  border-radius: 10px;
  background: #ffffff;
  padding: 16px;
`;

const Title = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;

const BookWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 177px;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 8px;
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
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  width: 100%;
  text-align: center;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 4px;
  margin-bottom: 8px;
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
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin: 4px;
`;

const Isbn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

const QuantityWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  gap: 75px;
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
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

const AgainBtn = styled.button`
  width: 144px;
  height: 47px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid #DEDEDE;
  color: #000000;
  background: #F4F4F4;
  transition: transform .02s ease;

  &:active {
    transform: translateY(1px);
  }
`;

const OkBtn = styled.button`
  width: 144px;
  height: 47px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid #11B55F;
  color: #FFFFFF;
  background: #11B55F;
  transition: transform .02s ease;

  &:active {
    transform: translateY(1px);
`;