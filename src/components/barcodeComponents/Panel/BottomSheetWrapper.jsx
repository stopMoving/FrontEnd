import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export default function BottomSheetWrapper({
    children,
    isOpen,
    onClose
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const sheetRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTranslateY(0);
    }
  }, [isOpen]);

  const onTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  }

  const onTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const newTranslateY = currentY - startY;

    if (newTranslateY >= 0) {
      setTranslateY(newTranslateY);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    const sheetHeight = sheetRef.current.offsetHeight;
    const dragThreshold = sheetHeight * 0.3;

    if (translateY > dragThreshold) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Sheet
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        isDragging={isDragging}
        style={{ transform: `translateY(${translateY}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
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
  z-index:999;
`;

const Sheet = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #FFFFFF;
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-width: 600px;
  max-height: 521px;
  margin: 0 auto;
  z-index: 1001;
  transform: translateY(100%);
  transition: ${(p) => (p.$isDragging ? "none" : "transform 0.3s ease-out")};

  ${(props) => props.$isOpen && css`
    transform: translateY(0);
    `}
 `;