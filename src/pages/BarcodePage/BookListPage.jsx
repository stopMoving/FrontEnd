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
        clearScannedBooks();
        setCompleteOpen(true);  
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
        
        console.log(response.message || "모든 책을 성공적으로 픽업했습니다.");
        setCompleteData({ count: response.count_success });
        clearScannedBooks();
        setCompleteOpen(true);
      }
    } catch (error) {
      console.error("처리 실패", error);
      const status = error.response?.status;

      if (status === 409) {
        const responseData = error.response.data;
        const failedBooks = responseData.result || [];

        if (failedBooks.length === 1) {
          const failedBook = failedBooks[0];
          const bookTitle = failedBook.title;
          // 백엔드에서 받은 error 메시지("2권 부족합니다.")에서 수량 부분만 추출
          const shortAmount = failedBook.error.replace(' 부족합니다.', '');

          alert(`'${bookTitle}' 책이 ${shortAmount} 부족하여 데려갈 수 없습니다.\n수량을 다시 확인해주세요.`);
     
          // 2. 실패한 책이 여러 권일 경우 (목록으로 보여주기)
          } else if (failedBooks.length > 1) {
            const errorDetails = failedBooks.map(
              item => `- ${item.title}: ${item.error}`
            ).join('\n');
        
            alert(`일부 책의 재고가 부족합니다.\n\n${errorDetails}\n\n수량을 다시 확인해주세요.`);

          // 3. 예외적인 경우
          } else {
            alert(responseData.message || "재고가 부족하여 요청을 처리할 수 없습니다.");
          }
        } else {
          // 그 외 다른 에러들 (404, 500 등)
          const message = error.response?.data?.message || error.message;
          alert(message || "처리 중 알 수 없는 오류가 발생했습니다.");
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
