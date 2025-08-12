import styled, { css } from "styled-components";

export default function ConfirmPanel({
  mode = "give",
  step = 1,
  book,
  loading = false,
  onPrimary,   // step1: 다시 찍기, step2: 아니오(완료)
  onSecondary, // step1: 확인 → step2로, step2: 네(추가)
}) {
  const STEP1_TITLE = "이 책이 맞는지 확인해주세요!";
  const STEP1_PRIMARY = "다시 찍기";
  const STEP1_SECONDARY = "확인";
  const STEP2_PRIMARY = "아니오, 완료";
  const STEP2_SECONDARY = "네, 추가";

  const step2 = mode === "give"
  ? { title: "책 등록이 완료되었습니다!",     desc: "다른 책도 나눔하시겠어요?" }
  : { title: "책 데려가기가 완료되었습니다!", desc: "다른 책도 데려가시겠어요?" };

  return (
    <Wrap>
      {step === 1 ? (
        <>
          <Title>{STEP1_TITLE}</Title>

          <BookWrap>
            {book?.image
              ? <Cover src={book?.image} alt="" />
              : <CoverFallback />}
          </BookWrap>

          <BookTitle>{book?.title || "제목 없음"}</BookTitle>

          <Meta>
            <Sub>저자 | {book?.author || "-"}</Sub>
            <Sub>출판사 | {book?.publisher || "-"}</Sub>
            {/* 취소선 넣기 */}
            <Sub>가격 | <del>{book?.regular_price || "-"}</del>원</Sub>
          </Meta>
            <Price>
                {book?.price || "-"}{mode === "give" ? "P" : "원"}
            </Price>
            <Isbn>ISBN 코드: {book?.isbn || "-"}</Isbn>
            
          <Buttons>
            <Btn onClick={onPrimary} disabled={loading}>
              {STEP1_PRIMARY}
            </Btn>
            <Btn ghost onClick={onSecondary} disabled={loading}>
              {STEP1_SECONDARY}
            </Btn>
          </Buttons>
        </>
      ) : (
        <>
          <Title>{step2.title}</Title>
          <Desc>{step2.desc}</Desc>
          <Buttons>
            <Btn onClick={onPrimary}>{STEP2_PRIMARY}</Btn>
            <Btn ghost onClick={onSecondary}>{STEP2_SECONDARY}</Btn>
          </Buttons>
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 335px;
  height: 560px;
  border-radius: 10px;
  background: #ffffff;
  padding: 40px 16px;
  gap: 40px;
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
  width: 139px;
  height: 177px;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 40px;
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
  text-align: left;
  margin: 0 auto;
  gap: 4px;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  font-size: 16px;
  font-weight: 600;
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
  margin: 16px;
`;

const Desc = styled.p`
  margin: 6px 0 16px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 35px;
`;

const Btn = styled.button`
  font-size: 18px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 10px;
  line-height: 1;
  border: 1px solid #000000;
  color: #000000;
  background: #ffffff;
  transition: transform .02s ease;

  &:active { transform: translateY(1px); }
`;