import styled from "styled-components";
import ConfirmPanel from "../../components/barcodeComponents/Panel/ConfirmPanel";

export default function ConfirmModal({
  open,
  step,
  mode= "give",       // ← give/take
  book,
  loading,
  onPrimary,
  onSecondary,
  onClose,
}) {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <ConfirmPanel
          step={step}
          mode={mode}
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
    from {
      transform: translateY(8px);
      opacity: .8;
    }
    to   {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;