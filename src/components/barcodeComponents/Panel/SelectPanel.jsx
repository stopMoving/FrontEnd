import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StepHeader from "../StepHeader";
import BottomSheetWrapper from "./BottomSheetWrapper";
import ImageUploadPanel from "../ImageUploadPanel";
import ISBNInputPanel from "../ISBNInputPanel";
import { ReactComponent as CameraIcon } from "../../../assets/icons/camera.svg";
import { ReactComponent as ImageUploadIcon } from "../../../assets/icons/imageUpload.svg";
import { ReactComponent as InputISBNIcon } from "../../../assets/icons/inputISBN.svg";
import ConfirmModal from "../../../pages/BarcodePage/ConfirmModal";
import useBookStore from "../../../store/useBookStore";
import { utils } from "../../../lib/api";

export default function SelectPanel({ title, description, mode, libraryId }) {
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addScannedBook } = useBookStore();

  const handleOpenSheet = (sheetType) => {
    setActiveSheet(sheetType);
  };

  // ✅ ISBNInputPanel, ImageUploadPanel에서 호출될 콜백
  const handleBookData = (data) => {
    // ✅ 바텀 시트를 닫고, ConfirmModal을 띄우기 위한 상태를 설정합니다.
    setActiveSheet(null);

    setBook({
      image: data?.cover_url ?? null,
      title: data?.title ?? "제목 없음",
      author: data?.author ?? "-",
      publisher: data?.publisher ?? "-",
      published_date: data?.published_date ?? "-",
      regular_price: data?.regular_price ?? "-",
      //내가 계산 x, 백엔드에서 넘겨주는 걸로
      price: data?.regular_price ? Math.round(data.regular_price * 0.2) : null,
      isbn: utils.formatIsbn(data?.isbn),
      rawIsbn: utils.extractDigits(data?.isbn),
    });

    setQuantity(1);
    setModalOpen(true);
  };

  // 첫 번째 버튼(다시 스캔): SelectPage로 이동
  const handleRetake = () => {
    setModalOpen(false); // 모달 닫힘 → 카메라 재개
    setBook(null);
    setQuantity(1);
    navigate(`/barcode/select/${mode}`); // 다시 스캔 방법 선택 페이지로 이동
  };

  // 두 번째 버튼(확인): 등록 API 호출 후 BookListPage로 이동
  const handleConfirm = () => {
    if (!book?.isbn) return;

    addScannedBook({
      ...book,
      quantity: quantity,
      isbn: book.isbn,
    });
    setModalOpen(false);
    navigate(
      `/barcode/booklist/${mode}?branchId=${encodeURIComponent(libraryId)}`
    );
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <Wrap>
      <StepHeader
        title={title} // 예: "책을 나눔할게요." / "책을 데려갈게요."
        activeStep={2} // ← STEP 2 화면
        onBack={() => navigate(-1)}
      />

      <Inner>
        <SectionTitle>{description}</SectionTitle>

        <Buttons>
          <Btn
            onClick={() =>
              navigate(
                `/barcode/scan/${mode}?branchId=${encodeURIComponent(
                  libraryId
                )}`
              )
            }
          >
            <CameraIcon width={32} height={32} />
            카메라로 바코드 인식
          </Btn>

          <Btn onClick={() => handleOpenSheet("image")}>
            <ImageUploadIcon width={32} height={32} />
            바코드 사진 업로드
          </Btn>

          <Btn onClick={() => handleOpenSheet("isbn")}>
            <InputISBNIcon width={32} height={32} />
            ISBN 코드 직접 입력
          </Btn>
        </Buttons>
      </Inner>

      <BottomSheetWrapper
        isOpen={activeSheet !== null}
        onClose={() => setActiveSheet(null)}
      >
        {activeSheet === "image" && (
          <ImageUploadPanel
            onClose={() => setActiveSheet(null)}
            onConfirm={handleBookData}
            mode={mode}
            libraryId={libraryId}
          />
        )}
        {activeSheet === "isbn" && (
          <ISBNInputPanel
            onClose={() => setActiveSheet(null)}
            onConfirm={handleBookData}
            mode={mode}
            libraryId={libraryId}
          />
        )}
      </BottomSheetWrapper>

      {modalOpen && book && (
        <ConfirmModal
          open={modalOpen}
          mode={mode}
          book={book}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onPrimary={handleRetake}
          onSecondary={handleConfirm}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  background: #fff;
  position: relative;

  /* 고정 StepHeader 높이만큼 여백 확보 */
  padding-top: 180px;
`;

const Inner = styled.div`
  padding: 0 16px;
  display: grid;
  gap: 20px;
`;

const SectionTitle = styled.div`
  width: min(520px, 92vw);
  font-size: 20px;
  font-weight: 600;
  margin: 0 auto;
`;

const Buttons = styled.div`
  width: min(520px, 92vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  padding: 0 16px;
  line-height: 1;
  border: none;
  border-radius: 5px;
  background: #e6f4f0;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  cursor: pointer;
  gap: 16px;
`;
