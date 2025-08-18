// import { useRef, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import styled from "styled-components";
// import useUserStore from "../../store/useUserStore";
// import useBookStore from "../../store/useBookStore";
// import ConfirmModal from "../../pages/BarcodePage/ConfirmModal";


// export default function ISBNInputPanel({
//   onClose,
//   mode,
//   libraryId
// }) {
//   const navigate = useNavigate();
//   const [isbn, setIsbn] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [book, setBook] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [step, setStep] = useState(1);
//   const [retakeCount, setRetakeCount] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [searchParams] = useSearchParams();

//   // const libraryId = searchParams.get("branchId"); //LibrarySelectPage에서 넘어온 값
//   const token = useUserStore((state) => state.token);
//   const { addScannedBook } = useBookStore();
//   const inputRef = useRef(null);

//   console.log("ISBNInputPanel에서 읽은 libraryId: ", libraryId);

//   const formatIsbn = (isbn) => {
//     return isbn
//     ? isbn.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/,
//         "$1-$2-$3-$4-$5")
//     : "-";
//     };

//   const handleQuantityChange = (change) => {
//     setQuantity(prev => Math.max(1, prev + change));
//   };

//   // 스캔 성공 시 (조회)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isbn.length !== 13) {
//       alert("ISBN 13자리를 정확히 입력해주세요.");
//       if (inputRef.current) inputRef.current.focus(); //잘못된 입력 후 확인 눌렀을 때 커서 자동으로 입력칸으로
//       return;
//     }

//     setLoading(true);
    
//     const accessToken = token?.access_token;
//     if (!accessToken) {
//       alert("로그인이 필요해요. (토큰 없음)");
//       setLoading(false);
//       return;
//     }

//     try {
//       const url = `https://stopmoving.o-r.kr/bookinfo/donate/?isbn=${isbn}`;
//         const res = await fetch(url, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         const textBody = await res.text();
//         const data = textBody ? JSON.parse(textBody) : null;
        
//         if (!res.ok) {
//           if (res.status === 400) throw new Error("잘못된 요청입니다. ISBN을 확인해주세요.");
//           if (res.status === 502) throw new Error("외부 도서 API 오류입니다. 잠시 후 다시 시도해주세요.");
//           throw new Error(textBody || `조회 실패 (${res.status})`);
//         }

//         console.log("lookup payload ▶", data);

//         setBook({
//             image: data?.cover_url ?? null,
//             title: data?.title ?? "제목 없음",
//             author: data?.author ?? "-",
//             published_date: data?.published_date ?? "-",
//             regular_price: data?.regular_price ?? "-",
//             //내가 계산 x, 백엔드에서 넘겨주는 걸로
//             price: data?.regular_price ? Math.round(data.regular_price * 0.2) : null,
//             isbn: formatIsbn(isbn),
//         });

//         setQuantity(1);
//         setStep(1);
//         setModalOpen(true);

//     } catch (e) {
//       console.error("조회 실패: ", e);
//       alert(e.message || "도서 조회에 실패했어요. 잠시 후 다시 시도해 주세요.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // === step 1 버튼: 다시 찍기 ===
//   const handleRetake = () => {
//     setModalOpen(false);          // 모달 닫힘 → 카메라 재개
//     setStep(1);
//     setBook(null);
//     setRetakeCount((v) => v + 1); // 콜백 리셋(같은 코드 재스캔 대비)
//   };

//   // === step 1 버튼: 확인 -> 등록 API 호출 후 step 2===
//   const handleConfirm = async () => {
//     if (!book?.isbn) return;

//     addScannedBook({
//       ...book,
//       quantity: quantity,
//       isbn: book.isbn
//     });

//     setModalOpen(false);
//     navigate(`/barcode/booklist/${mode}?branchId=${encodeURIComponent(libraryId)}`);
//   };

//   const disabled = isbn.length !== 13 || loading;

import React, { useRef, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";

export default function ISBNInputPanel({ onClose, onConfirm }) { // ✅ onConfirm 프롭스를 받음
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useUserStore((state) => state.token);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isbn.length !== 13) {
      alert("ISBN 13자리를 정확히 입력해주세요.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setLoading(true);
    const accessToken = token?.access_token;
    if (!accessToken) {
        alert("로그인이 필요해요. (토큰 없음)");
        setLoading(false);
        return;
    }

    try {
        const url = `https://stopmoving.o-r.kr/bookinfo/donate/?isbn=${isbn}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const textBody = await res.text();
        const data = textBody ? JSON.parse(textBody) : null;
        
        if (!res.ok) {
          throw new Error(data?.detail || `조회 실패 (${res.status})`);
        }

        onClose(); // ✅ 바텀 시트를 먼저 닫음
        onConfirm(data); // ✅ onConfirm 콜백으로 책 데이터 전달

    } catch (e) {
        console.error("조회 실패:", e);
        alert(e.message || "도서 조회에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
        setLoading(false);
    }
  };

  const disabled = isbn.length !== 13 || loading;

  return (
    <PanelWrap>
      <TopBar />

      <InputContainer>
        <Title>ISBN 코드 직접 입력</Title>

        <Input
          type="text"
          ref={inputRef}
          placeholder="책 뒷면 바코드 하단의 숫자 13자리를 입력해주세요."
          maxLength={13}
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          inputMode="numeric" // 모바일에서 숫자 키패드 유도
          pattern="[0-9]*"
        />
        </InputContainer>

      <BottomBar>
        <NextButton disabled={disabled} onClick={handleSubmit}>
          확인
        </NextButton>
      </BottomBar>

      {/* <ConfirmModal
        open={modalOpen}
        step={step}
        mode={mode}
        book={book}
        loading={loading}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onPrimary={handleRetake}
        onSecondary={handleConfirm}
        onClose={() => setModalOpen(false)}
      /> */}
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  min-width: 335px;
  height: 47px;
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 16px;
  
  &::placeholder {
    color: #DEDEDE;
  }
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

const NextButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  border: 0;
  color: #fff;
  background: ${(p) => (p.disabled ? "#DEDEDE" : "#11B55F")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;
`;