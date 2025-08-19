// import { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import styled from "styled-components";
// import useUserStore from "../../store/useUserStore";

// export default function ImageUploadPanel({
//   onClose,
//   onConfirm,
// }) {
//   const inputRef = useRef(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const token = useUserStore((state) => state.token);
//   // const [opened, setOpened] = useState(false); // 자동 오픈 시도 플래그

//   // useEffect(() => {
//   //   if (inputRef.current) {
//   //     openPicker();
//   //     setOpened(true);
//   //   }
//   // }, []);

//   const openPicker = () => {
//     if (!inputRef.current) return;
//     try {
//       if (typeof inputRef.current.showPicker === "function") {
//         inputRef.current.showPicker();
//       } else {
//         inputRef.current.click();
//       }
//     } catch (e) {
//       // iOS 사파리 등에서 사용자 제스처가 아니면 막힐 수 있음
//       // setOpened(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) {
//       onClose();
//       return;
//     }

//     setIsProcessing(true);

//     const reader = new FileReader();
//     const img = new Image();

//     reader.onload = () => { img.src = reader.result; };
//     img.onload = async () => {
//       const codeReader = new BrowserMultiFormatReader();
//       try {
//         const res = await codeReader.decodeFromImageElement(img);
//         const digits = res.text.replace(/[0-9]/g, "");

//         if (!/^97[89]\d{10}$/.test(digits)) {
//           throw new Error("유효한 ISBN 바코드가 아닙니다.");
//         }

//         const accessToken = token?.access_token;
//         if (!accessToken) {
//           throw new Error("로그인이 필요합니다.");
//         }

//         const url = `https://stopmoving.o-r.kr/bookinfo/donate/?isbn=${digits}`;
//         const fetchRes = await fetch(url, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         const textBody = await res.text();
//         let data = textBody ? JSON.parse(textBody) : null;
        
//         if (!fetchRes.ok) {
//           throw new Error(data?.detail || `조회 실패 (${fetchRes.status})`);
//         }

//         onClose();
//         onConfirm(data);

//       } catch (err) {
//         console.error("❌ 이미지 인식 실패:", err);
//         alert(err.message || "이미지에서 바코드 인식 실패");
//         onClose();
//       } finally {
//         setIsProcessing(false);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   // 같은 파일 재선택 허용
//   const resetValue = (e) => { e.target.value = ""; };

//   return (
//     <PanelWrap>
//       <TopBar />
      
//       <InputContainer>
//         <Title>바코드 사진 업로드</Title>

//         {/* 실제 파일 인풋은 숨김 */}
//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           onClick={resetValue}
//           style={{ display: "none" }}
//         />

//         <BottomBar>
//         {!isProcessing && (
//           <OpenBtn type="button" onClick={openPicker}>
//             사진 첨부
//           </OpenBtn>
//         )}
//         </BottomBar>
//       </InputContainer>
//     </PanelWrap>
//   );
// }

// const PanelWrap = styled.div`
//   width: 100%;
//   max-width: 600px;
//   min-height: 521px;
//   background: #FFFFFF;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border-radius: 10px 10px 0 0;
//   padding-bottom: 20px;
// `;

// const TopBar = styled.div`
//   width: 80px;
//   height: 4px;
//   background-color: #11B55F;
//   border-radius: 2px;
//   margin-top: 16px;
//   margin-bottom: 24px;
// `;

// const Title = styled.div`
//   text-align: center;
//   font-weight: 500;
//   font-size: 20px;
//   margin-bottom: 40px;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 0 20px;
//   width: 100%;
// `;

// const BottomBar = styled.div`
//   position: fixed;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 20px;
//   width: 100%;
//   max-width: 600px;
//   padding: 0 20px;
// `;

// const OpenBtn= styled.button`
//   width: 100%;
//   height: 52px;
//   border-radius: 5px;
//   font-size: 18px;
//   font-weight: 600;
//   border: 0;
//   color: #FFFFFF;
//   background: #11B55F;
//   cursor: pointer;
// `;

// src/pages/BarcodePage/ImageUploadPanel.jsx

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { bookAPI, utils } from "../../lib/axios";

export default function ImageUploadPanel({
  onClose,
  // ✅ onDetected 프롭스는 제거합니다.
  onConfirm,
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

    reader.onload = () => { img.src = reader.result; };
    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const res = await codeReader.decodeFromImageElement(img);
        // ✅ 바코드에서 숫자만 추출
        const digits = utils.extractDigits(res.text);

        if (!utils.validateISBN(digits)) {
          throw new Error("유효한 ISBN 바코드가 아닙니다.");
        }

        const data = await bookAPI.getBookByISBN(digits);

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

  const resetValue = (e) => { e.target.value = ""; };

  return (
    <PanelWrap>
      <TopBar />
      
      <InputContainer>
        <Title>바코드 사진 업로드</Title>
        <Description>바코드가 선명하게 보이는 사진을 업로드해주세요.</Description>

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
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding-bottom: 20px;
`;

const TopBar = styled.div`
  width: 80px;
  height: 4px;
  background-color: #11B55F;
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
  color: #6B7280;
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

const OpenBtn= styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  border: 0;
  color: #FFFFFF;
  background: #11B55F;
  cursor: pointer;
`;