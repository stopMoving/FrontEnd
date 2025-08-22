import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { create } from "zustand";
import checkImage from "../../src/assets/icons/check.svg";

const useToasterStore = create((set, get) => ({
  toasts: [],

  addToast: (type, message) => {
    const newToast = { id: Date.now(), type, message };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    return newToast;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  toaster: (type, message) => {
    const newToast = get().addToast(type, message);
    setTimeout(() => get().removeToast(newToast.id), 2000);
  },
}));

export const useToaster = () => useToasterStore((state) => state.toaster);

const ToastContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  gap: 24px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledToast = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #ff0000;
  pointer-events: all;
  cursor: pointer;

  position: relative;
  top: -8px;
  opacity: 0;
  transition: top 0.2s ease-in-out, opacity 0.2s ease-in-out;

  ${(props) =>
    props.isMounted &&
    css`
      top: 0;
      opacity: 1;
    `}

  ${(props) => {
    switch (props.type) {
      case "info":
        return css`
          background-color: #299d65;
        `;
      case "warn":
        return css`
          background-color: #fff;
          border: 1px solid #ff0000;
        `;
      default:
        return css`
          background-color: #333333;
        `;
    }
  }}
`;

function Toast({ type, message, onClick }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
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
