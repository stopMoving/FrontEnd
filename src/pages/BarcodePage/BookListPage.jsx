import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";
import CompleteModal from "./CompleteModal";
import { useState } from "react";
import useBookStore from "../../store/useBookStore";

export default function BookListPage() {
  const navigate = useNavigate();
  const { mode } = useParams(); // 'give' | 'take'
  const [searchParams] = useSearchParams();
  const libraryId = searchParams.get("branchId");

  const [completeOpen, setCompleteOpen] = useState(false);
  const { scannedBooks, updateBookQuantity } = useBookStore();

  //연결하기
  const count = 3;
  const points = 1200;

  const copy = mode === "give"
    ? {
        title: "나눔하기",
        description: "책 목록을 확인 후 나눔해주세요.",
        buttonLabel: "나눔하기",
      }
    : {
        title: "데려가기",
        description: "책 목록을 확인 후 결제해주세요.",
        buttonLabel: "결제하기",
      };

  const handleAddClick = () => {
    // SelectPage로 이동하면서 mode와 libraryId 값을 다시 전달
    navigate(`/barcode/select/${mode}?branchId=${encodeURIComponent(libraryId)}`);
  };

  return (
  <>
    <BookListPanel
      {...copy}
      items={scannedBooks}
      onNext={() => setCompleteOpen(true)}
      disabled={false}
      onQuantityChange={updateBookQuantity} // 스토어에서 가져온 함수를 핸들러로 전달
      onAddClick={handleAddClick} // ✅ AddButton 클릭 핸들러 추가
    />

    <CompleteModal
      open={completeOpen}
      mode={mode}
      count={count}
      points={points}
      onPrimary={() => {
        setCompleteOpen(false);
      }}
      onClose={() => setCompleteOpen(false)}
    />
  </>
  );
}