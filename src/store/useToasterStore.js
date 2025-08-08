import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { create } from "zustand";
import checkImage from "../../src/assets/icons/check.svg";

// --- 1. Zustand 스토어 생성 ---
// 상태와 상태를 변경하는 함수(액션)를 정의합니다.
const useToasterStore = create((set, get) => ({
  toasts: [],
  // 새 토스트를 목록에 추가하는 액션
  addToast: (type, message) => {
    const newToast = { id: Date.now(), type, message };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    return newToast;
  },
  // ID로 특정 토스트를 제거하는 액션
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  // add와 remove를 조합한 편리한 함수
  toaster: (type, message) => {
    const newToast = get().addToast(type, message);
    // 2초 후에 자동으로 토스트를 제거합니다.
    setTimeout(() => get().removeToast(newToast.id), 2000);
  },
}));

// --- 2. 외부에서 사용할 커스텀 훅 ---
// 컴포넌트에서 쉽게 toaster 함수를 호출할 수 있도록 합니다.
export const useToaster = () => useToasterStore((state) => state.toaster);

// --- 3. Styled-components 정의 ---

const ToastContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  gap: 24px;
  justify-content: center;
  align-items: center;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none; /* 컨테이너는 클릭되지 않도록 */
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledToast = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  pointer-events: all; /* 토스트 자체는 클릭 가능하도록 */
  cursor: pointer;

  /* 애니메이션을 위한 초기 상태 */
  position: relative;
  top: -8px;
  opacity: 0;
  transition: top 0.2s ease-in-out, opacity 0.2s ease-in-out;

  /* isMounted prop에 따른 마운트 애니메이션 */
  ${(props) =>
    props.isMounted &&
    css`
      top: 0;
      opacity: 1;
    `}

  /* type prop에 따른 배경색 동적 변경 */
  ${(props) => {
    switch (props.type) {
      case "info":
        return css`
          background-color: #299d65;
        `;
      case "warn":
        return css`
          background-color: #ff5733;
        `;
      default:
        return css`
          background-color: #333333;
        `;
    }
  }}
`;

// --- 4. 개별 Toast 컴포넌트 ---
// 애니메이션 상태를 자체적으로 관리합니다.
function Toast({ type, message, onClick }) {
  const [isMounted, setIsMounted] = useState(false);

  // 마운트 직후 애니메이션을 트리거합니다.
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10); // 아주 짧은 딜레이 후 실행
    return () => clearTimeout(timer);
  }, []);

  const icon = type === "info" ? checkImage : null;

  return (
    <StyledToast type={type} isMounted={isMounted} onClick={onClick}>
      {icon && <Icon src={icon} alt={type} />}
      {message}
    </StyledToast>
  );
}

// --- 5. Toaster 전체 컨테이너 컴포넌트 ---
// 스토어의 상태를 구독하고, 토스트 목록을 렌더링합니다.
export function Toaster() {
  const toasts = useToasterStore((state) => state.toasts);
  const removeToast = useToasterStore((state) => state.removeToast);

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClick={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainer>
  );
}
