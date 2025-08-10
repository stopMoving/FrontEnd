import styled from "styled-components";
import ConfirmPanel from "../../components/barcodeComponents/ConfirmPanel";

const DEFAULT_COPY = {
  give: {
    step1Title: "이 책이 맞는지 확인해주세요!",
    step1Primary: "다시 찍기",
    step1Secondary: "확인",
    step2Title: "책 등록이 완료되었습니다!",
    step2Desc: "다른 책도 나눔하시겠어요?",
    step2Primary: "아니오, 완료",
    step2Secondary: "네, 추가",
  },
  take: {
    step1Title: "이 책이 맞는지 확인해주세요!",
    step1Primary: "다시 찍기",
    step1Secondary: "확인",
    step2Title: "책 데려가기가 완료되었습니다!",
    step2Desc: "다른 책도 데려가시겠어요?",
    step2Primary: "아니오, 완료",
    step2Secondary: "네, 추가",
  },
};

export default function ConfirmModal({
  open,
  step,
  mode = "give",       // ← give/take
  copy,                 // ← 있으면 이걸 우선 적용 (선택)
  book,
  loading,
  onPrimary,
  onSecondary,
  onClose,
}) {
  if (!open) return null;
  const finalCopy = copy || DEFAULT_COPY[mode] || DEFAULT_COPY.give;

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <ConfirmPanel
          step={step}
          copy={finalCopy}
          book={book}
          loading={loading}
          onPrimary={onPrimary}
          onSecondary={onSecondary}
        />
      </Sheet>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: grid;
  place-items: center;
  z-index: 999;
`;

const Sheet = styled.div`
  transform: translateY(0);
  animation: pop .12s ease-out;
  @keyframes pop {
    from { transform: translateY(8px); opacity: .8; }
    to   { transform: translateY(0); opacity: 1; }
  }
`;