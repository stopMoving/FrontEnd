import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";
import CompleteModal from "./CompleteModal";
import { useMemo, useState } from "react";
import useBookStore from "../../store/useBookStore";
import { bookAPI } from "../../lib/api";
import useUserStore from "../../store/useUserStore";

export default function BookListPage() {
  const navigate = useNavigate();
  const { mode } = useParams(); // 'give' | 'take'
  const [searchParams] = useSearchParams();
  const libraryId = searchParams.get("branchId");

  const [completeOpen, setCompleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeData, setCompleteData] = useState({ count: 0, points: 0 });

  const { scannedBooks, updateBookQuantity, clearScannedBooks } =
    useBookStore();
  const token = useUserStore((state) => state.token);

  const onBack = () => {
    navigate(
      `/barcode/select/${mode}?branchId=${encodeURIComponent(libraryId)}`
    );
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
        const isbnList = scannedBooks.flatMap(book => 
          Array(book.quantity).fill(book.rawIsbn)
        );

        if (isbnList.length === 0) {
          alert("담긴 ISBN이 없어요. ");
          return;
        }

        await bookAPI.donateBooks(libraryId, isbnList);

        setCompleteData({
          count: totalCount,
          points: totalPoints,
        });
      }
      
      else if (mode === "take") {
        const bookIdList = scannedBooks.flatMap(book => {
          if (Array.isArray(book.book_ids)) {
            // book_ids가 배열인 경우, quantity만큼 해당 배열의 요소들을 반복
            return Array(book.quantity).fill(null).flatMap(() => book.book_ids);
          } else {
            // book_ids가 단일 값인 경우
            return Array(book.quantity).fill(book.book_ids);
          }
        });

        if (bookIdList.length === 0) {
          throw new Error("담긴 책이 없어요.");
        }

        console.log('전송할 book_id 리스트: ', bookIdList);

        const response = await bookAPI.pickupBooks(bookIdList);

        // 다양한 응답 상태 처리
        if (response.count_success < response.count_total) {
          // 부분 성공인 경우
          const failedCount = response.count_total - response.count_success;
          alert(`${response.count_success}권은 성공했지만, ${failedCount}권은 처리되지 않았습니다.`);
        }

        setCompleteData({
          count: response.count_success || response.count_total,
          points: 0, // 아예 없애면 안 되나?
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
        navigate('/mypage', { state: { initialTab: 'point' } });
      }}
      onClose={() => setCompleteOpen(false)}
    />
  </>
  );
}
