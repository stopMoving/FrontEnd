import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";
import CompleteModal from "./CompleteModal";
import { useMemo, useState } from "react";
import useBookStore from "../../store/useBookStore";
import { bookAPI } from "../../lib/axios";
import useUserStore from "../../store/useUserStore";

export default function BookListPage() {
  const navigate = useNavigate();
  const { mode } = useParams(); // 'give' | 'take'
  const [searchParams] = useSearchParams();
  const libraryId = searchParams.get("branchId");

  const [completeOpen, setCompleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeData, setCompleteData] = useState({ count: 0, points: 0 });

  const { scannedBooks, updateBookQuantity, clearScannedBooks } = useBookStore();
  const token = useUserStore((state) => state.token);

  const {totalCount, totalPoints } = useMemo(() => {
    let count = 0;
    let points = 0;

    scannedBooks.forEach(book => {
      count += book.quantity;

      if (mode === "give") {
        points += book.quantity * 500;
      }
    });
    return { totalCount: count, totalPoints: points };
  }, [scannedBooks, mode]);

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

  // === step 2 버튼: 네, 추가 ===
  // const handleAddMore = () => {
  //   setModalOpen(false);          // 닫고 다음 스캔 준비
  //   setBook(null);
  //   setRetakeCount((v) => v + 1);
  // };

  // 추가(+) 버튼
  const handleAddClick = () => {
    // SelectPage로 이동하면서 mode와 libraryId 값을 다시 전달
    navigate(`/barcode/select/${mode}?branchId=${encodeURIComponent(libraryId)}`);
  };

    // 나눔하기 버튼
  const handleFinish = async () => {    
    if (!libraryId) {
      alert("도서관이 선택되지 않았어요.");
      return;
    }

    if (isbnList.length === 0) {
      alert("담긴 ISBN이 없어요. ");
      return;
    }

    const isbnList = scannedBooks.map(book => ({
      isbn: book.rawIsbn,
      quantity: book.quantity
    }));

    setLoading(true);
    try {
      await bookAPI.donateBooks(libraryId, isbnList);

      setCompleteData({
        count: totalCount,
        points: totalPoints,
      });

      clearScannedBooks();
      setCompleteOpen(true);
    } catch (error) {
        console.error("등록 실패", error);
        alert(error.message) // alert 말고 다르게 표시하자
    } finally {
        setLoading(false);
    }
  };

  return (
  <>
    <BookListPanel
      {...copy}
      items={scannedBooks}
      onNext={handleFinish}
      disabled={loading}
      onQuantityChange={updateBookQuantity} // 스토어에서 가져온 함수를 핸들러로 전달
      onAddClick={handleAddClick}
    />

    <CompleteModal
      open={completeOpen}
      mode={mode}
      count={completeData.count}
      points={completeData.points}
      onPrimary={() => {
        setCompleteOpen(false);
        navigate('/mypage');
      }}
      onClose={() => setCompleteOpen(false)}
    />
  </>
  );
}