import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";
import CompleteModal from "./CompleteModal";
import { useMemo, useState } from "react";
import useBookStore from "../../store/useBookStore";
import { bookAPI } from "../../lib/api";
import useUserStore from "../../store/useUserStore";

export default function BookListPage() {
  const navigate = useNavigate();
  const { mode } = useParams();
  const [searchParams] = useSearchParams();
  const libraryId = searchParams.get("branchId");

  const [completeOpen, setCompleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeData, setCompleteData] = useState({ count: 0, points: 0 });

  const { scannedBooks, updateBookQuantity, clearScannedBooks } =
    useBookStore();
  const token = useUserStore((state) => state.token);

  const onBack = () => {
    clearScannedBooks();
    navigate(`/`);
  };

  const { totalCount, totalPoints } = useMemo(() => {
    let count = 0;
    let points = 0;

    scannedBooks.forEach((book) => {
      count += book.quantity;

      if (mode === "give") {
        points += book.quantity * 500;
      }
    });
    return { totalCount: count, totalPoints: points };
  }, [scannedBooks, mode]);

  const copy =
    mode === "give"
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

  // 추가(+) 버튼
  const handleAddClick = () => {
    // SelectPage로 이동하면서 mode와 libraryId 값을 다시 전달
    navigate(
      `/barcode/select/${mode}?branchId=${encodeURIComponent(libraryId)}`
    );
  };

  // 나눔하기 버튼
  const handleFinish = async () => {
    if (!libraryId) {
      alert("도서관이 선택되지 않았어요.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "give") {
        const donationList = scannedBooks.map(book => ({
          isbn: book.rawIsbn,
          quantity: book.quantity
        }));

        if (donationList.length === 0) {
          alert("담긴 ISBN이 없어요. ");
          return;
        }

        await bookAPI.donateBooks(libraryId, donationList);

        setCompleteData({
          count: totalCount,
          points: totalPoints,
        });
      }
      
      else if (mode === "take") {
        const pickupList = scannedBooks.map(book => ({
          isbn: book.rawIsbn,
          quantity: book.quantity
        }));

        if (pickupList.length === 0) {
          throw new Error("담긴 책이 없어요.");
        }

        console.log('전송할 book_id 리스트: ', pickupList);

        const response = await bookAPI.pickupBooks(libraryId, pickupList);

        if (response.count_success === response.count_total) {
          alert("모든 책을 성공적으로 픽업했습니다.");
        }
        else if (response.count_success > 0 && response.count_success < response.count_total) {
          const failedCount = response.count_total - response.count_success;
          alert(`${response.count_success}권은 성공했지만, ${failedCount}권은 처리되지 않았습니다.`);
        }
        else if (response.count_success === 0) {
          alert("요청한 책을 모두 픽업할 수 없습니다.");
        }

        setCompleteData({
          count: totalCount,
        });
      }
        clearScannedBooks();
        setCompleteOpen(true);  

    } catch (error) {
        console.error("처리 실패", error);

        // 에러 상태에 따른 메시지 처리
        if (error.response?.status === 207) {
          // 부분 성공
          const data = error.response.data;
          alert(`일부만 처리됨: ${data.count_success}/${data.count_total}`);
        } else if (error.response?.status === 409) {
          // 충돌/실패
          alert("책을 가져올 수 없습니다. 이미 다른 사람이 가져갔을 수 있어요.");
        } else {
          alert(error.message || "처리 중 오류가 발생했습니다.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <BookListPanel
      {...copy}
      mode={mode}
      items={scannedBooks}
      onBack={onBack}
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
        if (mode === 'give') {
          navigate('/mypage', { state: { initialTab: 'point' } });
        } else if (mode === 'take') {
          navigate('/');
        }
      }}
      onClose={() => setCompleteOpen(false)}
    />
  </>
  );
}
