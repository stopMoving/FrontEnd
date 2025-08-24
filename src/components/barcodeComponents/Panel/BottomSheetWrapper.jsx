import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export default function BottomSheetWrapper({
    children,
    isOpen,
    onClose
}) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay
      onClick={onClose}
      onTouchMove={(e) => e.preventDefault()}
    >
      <Sheet
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        $isOpen={isOpen}
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
  transition: transform 0.3s ease-out;

  ${(props) => props.$isOpen && css`
    transform: translateY(0);
    `}
 `;