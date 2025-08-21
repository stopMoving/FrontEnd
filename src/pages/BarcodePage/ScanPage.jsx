import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CameraScan from "../../components/barcodeComponents/CameraScan";
import ConfirmModal from "./ConfirmModal";
import useUserStore from "../../store/useUserStore";
import useBookStore from "../../store/useBookStore";
import { bookAPI, utils } from "../../lib/api";

export default function ScanPage() {
  const navigate = useNavigate();
  const { mode } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retakeCount, setRetakeCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [searchParams] = useSearchParams();

  const libraryId = searchParams.get("branchId"); // LibrarySelectPage에서 넘어온 값
  const token = useUserStore((state) => state.token);
  const { addScannedBook, scannedBooks, clearScannedBooks } = useBookStore();

  console.log("ScanPage에서 읽은 libraryId: ", libraryId);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // 스캔 성공 시 (조회))
  const handleDetected = async (text) => {
    if (loading || modalOpen) return; // 중복 스캔 가드

    const digits = utils.extractDigits(text);
    if (!utils.validateISBN(digits)) return;

    setLoading(true);
    try {
      let data;

      if (mode === "give") {
        data = await bookAPI.getBookByISBN(digits);

        setBook({
          image: data?.cover_url ?? null,
          title: data?.title ?? "제목 없음",
          author: data?.author ?? "-",
          publisher: data?.publisher ?? "-",
          published_date: data?.published_date ?? "-",
          regular_price: data?.regular_price ?? "-",
          //내가 계산 x, 백엔드에서 넘겨주는 걸로
          price: data?.regular_price
            ? Math.round(data.regular_price * 0.2)
            : null,
          isbn: utils.formatIsbn(digits),
          rawIsbn: digits,
        });
      } else if (mode === "take") {
        const res = await bookAPI.getPickupBookDetail(digits, libraryId);
        data = res.data;
        setBook({
          image: data?.cover_url ?? null,
          title: data?.title ?? "제목 없음",
          author: data?.author ?? "-",
          publisher: data?.publisher ?? "-",
          published_date: data?.published_date ?? "-",
          regular_price: data?.regular_price ?? "-",
          price: data?.sale_price ?? "-",
          isbn: utils.formatIsbn(digits),
          rawIsbn: digits,
          available_count: data?.available_count ?? 0,
          book_ids: res?.book_ids ?? [],
        });
      } else {
        throw new Error("잘못된 모드입니다.");
      }

      // 모달 열면 CameraScan에서 paused={modalOpen}으로 일시정지됨
      setQuantity(1);
      setModalOpen(true);
    } catch (e) {
      // 여기서 조회 실패라고 ui를 띄워줘야 하지 않을까?
      console.error("조회 실패", e);
      alert("인식에 실패했어요. 잠시 후 다시 시도해 주세요."); // alert 말고 다르게 표시하자
    } finally {
      setLoading(false);
    }
  };

  // 첫 번째 버튼(다시 스캔): SelectPage로 이동
  const handleRetake = () => {
    setModalOpen(false); // 모달 닫힘 → 카메라 재개
    setBook(null);
    setRetakeCount((v) => v + 1); // 콜백 리셋(같은 코드 재스캔 대비)
    navigate(`/barcode/select/${mode}`); // 다시 스캔 방법 선택 페이지로 이동
  };

  // 두 번째 버튼(확인): 등록 API 호출 후 BookListPage로 이동
  const handleConfirm = async () => {
    if (!book?.isbn) return;

    addScannedBook({
      ...book,
      quantity: quantity,
      rawIsbn: utils.extractDigits(book.isbn),
    });

    setModalOpen(false);
    navigate(
      `/barcode/booklist/${mode}?branchId=${encodeURIComponent(libraryId)}`
    );
  };

  return (
    <Screen>
      <Center>
        <CameraScan
          onDetected={handleDetected}
          autoStart
          hideControls
          viewSize={{ width: 600, height: 300 }}
          paused={modalOpen || loading}
          resetOn={retakeCount}
        />
      </Center>

      <MaskTop />
      <GuideLine />
      <MaskBottom>
        <Title>바코드 인식</Title>
        <Hint>
          인식이 어려우면 조명을 밝히고, 바코드와 카메라를 평행하게 맞춘 뒤
          <br />
          프레임 안에 꽉 차게 맞춰보세요.
        </Hint>
      </MaskBottom>

      <ConfirmModal
        open={modalOpen}
        mode={mode}
        book={book}
        loading={loading}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onPrimary={handleRetake}
        onSecondary={handleConfirm}
        onClose={() => setModalOpen(false)}
      />
    </Screen>
  );
}

const Screen = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 100dvh;
  margin: 0 auto;
  background: #ffffff;
  overflow: hidden;
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`;

const MaskTop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 22%;
  background: #ffffff;
  pointer-events: none;
`;

const MaskBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px clamp(12px, 4vw, 20px) max(env(safe-area-inset-bottom), 12px);
  background: #ffffff;
  color: #fff;
  pointer-events: none;
`;

const Title = styled.div`
  color: #000000;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Hint = styled.p`
  color: #000000;
  text-align: center;
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const GuideLine = styled.div`
  position: absolute;
  left: 6%;
  right: 6%;
  top: 50%;
  height: 2px;
  background: #ff3b30;
  opacity: 0.9;
  transform: translateY(-50%);
  border-radius: 2px;
  pointer-events: none;
`;
