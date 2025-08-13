import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import styled from "styled-components";

export default function ImageUpload({ onDetected, autoOpen = false }) {
  const inputRef = useRef(null);
  const [opened, setOpened] = useState(false); // 자동 오픈 시도 플래그

  useEffect(() => {
    if (!autoOpen || !inputRef.current) return;
    try {
      // 일부 브라우저는 showPicker 지원
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
        setOpened(true);
      } else {
        inputRef.current.click();
        setOpened(true);
      }
    } catch {
      // iOS 사파리 등에서 사용자 제스처가 아니면 막힐 수 있음
      setOpened(false);
    }
  }, [autoOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => { img.src = reader.result; };
    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const res = await codeReader.decodeFromImageElement(img);
        onDetected?.(res.text);
      } catch (err) {
        console.error("❌ 이미지 인식 실패:", err);
        alert("이미지에서 바코드 인식 실패");
      }
    };
    reader.readAsDataURL(file);
  };

  // 같은 파일 재선택 허용
  const resetValue = (e) => { e.target.value = ""; };

  const openPicker = () => {
    if (!inputRef.current) return;
    if (typeof inputRef.current.showPicker === "function") {
      inputRef.current.showPicker();
    } else {
      inputRef.current.click();
    }
  };

  return (
    <Wrap>
      {/* 실제 파일 인풋은 숨김 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        onClick={resetValue}
        style={{ display: "none" }}
      />

      {/* 자동으로 안 열렸을 때만 보조 버튼 안내 */}
      {!opened && (
        <Helper>
          갤러리가 자동으로 열리지 않으면 아래 버튼을 눌러 주세요.
        </Helper>
      )}

      {!opened && (
        <OpenBtn type="button" onClick={openPicker}>
          갤러리 열기
        </OpenBtn>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  gap: 12px;
`;

const Helper = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

const OpenBtn = styled.button`
  height: 48px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;