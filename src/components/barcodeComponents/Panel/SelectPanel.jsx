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

export default function SelectPanel({
  title,
  description,
  mode,
  libraryId,
  onBack,
}) {
  console.log('SelectPanel에 전달된 mode prop:', mode);
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addScannedBook } = useBookStore();

  const handleOpenSheet = (sheetType) => {
    setActiveSheet(sheetType);
  };

  const handleBookData = (data) => {
    setActiveSheet(null);

    if (mode === "give") {
      setBook({
        image: data?.cover_url ?? null,
        title: data?.title ?? "제목 없음",
        author: data?.author ?? "-",
        published_date: data?.published_date ?? "-",
        isbn: utils.formatIsbn(data?.isbn),
        rawIsbn: utils.extractDigits(data?.isbn),
      });
    }
    
    else if (mode === 'take') {
      const bookData = data.bookData;
      const bookIds = data.bookIds;

      setBook({
        image: bookData?.cover_url ?? null,
        title: bookData?.title ?? "제목 없음",
        author: bookData?.author ?? "-",
        published_date: bookData?.published_date ?? "-",
        regular_price: bookData?.regular_price ?? "-",
        price: bookData?.sale_price ?? "-",
        isbn: utils.formatIsbn(bookData?.isbn),
        rawIsbn: utils.extractDigits(bookData?.isbn),
        available_count: bookData?.available_count ?? 0,
        book_ids: bookIds ?? [],
      });
    }

    setQuantity(1);
    setModalOpen(true);
  };

  const handleRetake = () => {
    setModalOpen(false);
    setBook(null);
    setQuantity(1);
    navigate(`/barcode/select/${mode}?branchId=${encodeURIComponent(libraryId)}`); // 다시 스캔 방법 선택 페이지로 이동
  };

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
        title={title}
        activeStep={2}
        onBack={onBack}
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
  background: #ffffff;
  position: relative;

  /* 고정 StepHeader 높이만큼 여백 확보 */
  padding-top: 158px;
`;

const Inner = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  padding: 0 16px;
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
