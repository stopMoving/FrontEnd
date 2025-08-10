import styled from "styled-components";

export default function ConfirmPanel({
  step = 1,
  copy,
  book,
  loading = false,
  onPrimary,   // step1: 다시 찍기, step2: 아니오(완료)
  onSecondary, // step1: 확인 → step2로, step2: 네(추가)
}) {
  return (
    <Wrap>
      {step === 1 ? (
        <>
          <Title>{copy.step1Title}</Title>

          <BookRow>
            <Cover src={book?.image} alt="" />
            <Meta>
              <Main>{book?.title || "제목 없음"}</Main>
              <Sub>{book?.author || "-"}</Sub>
              <Isbn>ISBN {book?.isbn || "-"}</Isbn>
            </Meta>
          </BookRow>

          <Actions>
            {/* step1: 첫 번째 버튼이 "다시 찍기" */}
            <Btn onClick={onPrimary} disabled={loading}>
              {loading ? "처리 중..." : copy.step1Primary}
            </Btn>
            {/* step1: 두 번째 버튼이 "확인" (→ step2로) */}
            <Btn ghost onClick={onSecondary} disabled={loading}>
              {copy.step1Secondary}
            </Btn>
          </Actions>
        </>
      ) : (
        <>
          <Title>{copy.step2Title}</Title>
          <Desc>{copy.step2Desc}</Desc>
          <Actions>
            {/* step2: 첫 번째 버튼은 "아니오, 완료" */}
            <Btn onClick={onPrimary}>{copy.step2Primary}</Btn>
            {/* step2: 두 번째 버튼은 "네, 추가" */}
            <Btn ghost onClick={onSecondary}>{copy.step2Secondary}</Btn>
          </Actions>
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: min(520px, 92vw);
  border-radius: 16px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
`;

const Title = styled.h3`
  margin: 4px 0 16px;
  font-size: 18px;
`;

const Desc = styled.p`
  margin: 6px 0 16px;
  color: #6b7280;
`;

const BookRow = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 14px;
  align-items: center;
`;

const Cover = styled.img`
  width: 88px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  background: #f1f2f4;
`;

const Meta = styled.div``;

const Main = styled.div`
  font-weight: 700;
  line-height: 1.3;
`;

const Sub = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: #6b7280;
`;

const Isbn = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #9ca3af;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
`;

const Btn = styled.button`
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  color: #fff;
  background: #111;

  ${({ ghost }) =>
    ghost &&
    `
    background:#fff;
    color:#111;
    border-color:#e6e8ec;
  `}
`;