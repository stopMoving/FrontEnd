import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { bookAPI, utils } from "../../lib/api";

export default function ImageUploadPanel({
  onClose,
  onConfirm,
  mode,
  libraryId
}) {
  const inputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = useUserStore((state) => state.token);
  // const [opened, setOpened] = useState(false); // 자동 오픈 상태는 불필요

  const openPicker = () => {
    if (!inputRef.current) return;
    try {
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
      } else {
        inputRef.current.click();
      }
    } catch (e) {
      // 에러 처리
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      onClose();
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      img.src = reader.result;
    };
    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const res = await codeReader.decodeFromImageElement(img);
        // ✅ 바코드에서 숫자만 추출
        const digits = utils.extractDigits(res.text);

        if (!utils.validateISBN(digits)) {
          throw new Error("유효한 ISBN 바코드가 아닙니다.");
        }

        let data;
        if (mode === "give") {
          data = await bookAPI.getBookByISBN(digits);
        }
        else if (mode === "take") {
          const res = await bookAPI.getPickupBookDetail(digits, libraryId);
          data = {
            bookData: res.data,
            bookIds: res.book_ids,
          }
        }

        onClose(); // ✅ API 호출 성공 시 바텀 시트 닫기
        onConfirm(data); // ✅ onConfirm 콜백으로 책 데이터 전달
      } catch (err) {
        console.error("❌ 이미지 인식 실패:", err);
        alert(err.message || "이미지에서 바코드 인식 실패");
        onClose();
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetValue = (e) => {
    e.target.value = "";
  };

  return (
    <PanelWrap>
      <TopBar />

      <InputContainer>
        <Title>바코드 사진 업로드</Title>
        <Description>
          바코드가 선명하게 보이는 사진을 업로드해주세요.
        </Description>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          onClick={resetValue}
          style={{ display: "none" }}
        />

        <BottomBar>
          {!isProcessing && (
            <OpenBtn type="button" onClick={openPicker}>
              사진 첨부
            </OpenBtn>
          )}
        </BottomBar>

        {isProcessing && <p>바코드 인식 중...</p>}
      </InputContainer>
    </PanelWrap>
  );
}

const PanelWrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 521px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding-bottom: 20px;
`;

const TopBar = styled.div`
  width: 80px;
  height: 4px;
  background-color: #11b55f;
  border-radius: 2px;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const OpenBtn = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  border: 0;
  color: #ffffff;
  background: #11b55f;
  cursor: pointer;
`;
