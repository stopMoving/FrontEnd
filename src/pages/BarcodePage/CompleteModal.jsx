import styled from "styled-components";
import CompletePanel from "../../components/barcodeComponents/Panel/CompletePanel";
import { ReactComponent as CoinIcon } from "../../assets/icons/coinIcon.svg";
import { ReactComponent as BookHeartIcon } from "../../assets/icons/bookheartIcon.svg";

export default function CompleteModal({
  open,
  mode = "give",    // "give" | "take"
  count = 1,        // 처리한 권 수
  points = 0,       // 적립 포인트 (give일 때만 의미)
  onPrimary,        // 버튼 클릭 핸들러
  onClose,          // 오버레이 클릭 등으로 닫기
}) {
  if (!open) return null;

  const copy =
    mode === "give"
      ? {
          title: `총 ${count}권의 책 나눔하기 완료!`,
          description: `해당 책은 나눔책장에 두고 가주세요.`,
          Icon: CoinIcon,
          highlight: `${points.toLocaleString()} 포인트 적립`,
          buttonText: "포인트로 리워드 받기",
        }
      : {
          title: `총 ${count}권의 책 결제 완료!`,
          description: `해당 책은 나눔책장에서 데려가 주세요.`,
          Icon: BookHeartIcon,
          highlight: `책과 좋은 추억 만드세요!`,
          buttonText: "확인",
        };

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CompletePanel
          title={copy.title}
          description={copy.description}
          Icon={copy.Icon}
          highlight={copy.highlight}
          buttonText={copy.buttonText}
          onPrimary={onPrimary}
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
  animation: pop .14s ease-out;
  @keyframes pop {
    from { transform: translateY(8px); opacity: .85; }
    to   { transform: translateY(0);   opacity: 1; }
  }
`;