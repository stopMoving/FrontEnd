import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CameraScan from "../../components/barcodeComponents/CameraScan";
import ConfirmModal from "./ConfirmModal";
import useUserStore from "../../store/useUserStore";
import useBookStore from "../../store/useBookStore";

export default function ScanPage() {
  const navigate = useNavigate();
  const { mode } = useParams(); // give | take
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retakeCount, setRetakeCount] = useState(0);
  const [isbnCart, setIsbnCart] = useState([]);
  const [searchParams] = useSearchParams();

  const libraryId = searchParams.get("branchId"); // LibrarySelectPage에서 넘어온 값
  const token = useUserStore((state) => state.token);
  const { addScannedBook } = useBookStore();

  console.log("ScanPage에서 읽은 libraryId: ", libraryId);
  
  const formatIsbn = (isbn) => {
    return isbn
    ? isbn.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/,
        "$1-$2-$3-$4-$5")
    : "-";
    };

  // 스캔 성공 시 (조회))
  const handleDetected = async (text) => {
    if (loading || modalOpen) return; // 중복 스캔 가드
    const digits = String(text).replace(/[^0-9]/g, "");
    if (!/^97[89]\d{10}$/.test(digits)) return;

  const accessToken = token?.access_token;
  if (!accessToken) {
    alert("로그인이 필요해요. (토큰 없음)");
    return;
  }

    setLoading(true);
    try {
        const url = `https://stopmoving.p-e.kr/bookinfo/donate/?isbn=${digits}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const textBody = await res.text();
        let data = null;
        try {
          data = textBody ? JSON.parse(textBody) : null;
        }
        catch {}
        
        if (!res.ok) {
          if (res.status === 400) throw new Error("잘못된 요청입니다. ISBN을 확인해주세요.");
          if (res.status === 502) throw new Error("외부 도서 API 오류입니다. 잠시 후 다시 시도해주세요.");
          throw new Error(textBody || `조회 실패 (${res.status})`);
        }

        console.log("lookup payload ▶", data);

        setBook({
            image: data?.cover_url ?? null,
            title: data?.title ?? "제목 없음",
            author: data?.author ?? "-",
            published_date: data?.published_date ?? "-",
            regular_price: data?.regular_price ?? "-",
            //내가 계산 x, 백엔드에서 넘겨주는 걸로
            price: data?.regular_price ? Math.round(data.regular_price * 0.2) : null,
            isbn: formatIsbn(digits),
        });

        // 모달 열면 CameraScan에서 paused={modalOpen}으로 일시정지됨
        setStep(1);
        setModalOpen(true);
    } catch (e) {
        // 여기서 조회 실패라고 ui를 띄워줘야 하지 않을까?
        console.error("조회 실패", e);
        alert("인식에 실패했어요. 잠시 후 다시 시도해 주세요.") // alert 말고 다르게 표시하자
    } finally {
        setLoading(false);
    }
  };

  // === step 1 버튼: 다시 찍기 ===
  const handleRetake = () => {
    setModalOpen(false);          // 모달 닫힘 → 카메라 재개
    setStep(1);
    setBook(null);
    setRetakeCount((v) => v + 1); // 콜백 리셋(같은 코드 재스캔 대비)
  };

  // === step 1 버튼: 확인 -> 등록 API 호출 후 step 2===
  const handleConfirm = async () => {
    if (!book?.isbn) return;

    addScannedBook({
      ...book,
      isbn: book.isbn.replace(/-/g, '')
    });
    // setIsbnCart((prev) => {
    //   const next = new Set(prev);
    //   next.add(book.rawIsbn);
    //   return Array.from(next);
    // });
    // setStep(2);
    setModalOpen(false);
    navigate(`/barcode/booklist/${mode}`);
  };

  // === step 2 버튼: 아니오, 완료 ===
  const handleFinish = async () => {
    const accessToken = token?.access_token;
    if(!accessToken) {
      alert("로그인이 필요해요. (토큰 없음)");
      return;
    }
    if (!libraryId) {
      alert("도서관이 선택되지 않았어요.");
      return;
    }
    if (isbnCart.length === 0) {
      alert("담긴 ISBN이 없어요. ");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        library_id: Number(libraryId),
        isbn: isbnCart,
      };
      const res = await fetch(`https://stopmoving.p-e.kr/books/donate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("register failed");
        setStep(2);
    } catch (e) {
        console.error("등록 실패", e);
        alert("등록에 실패했어요. 잠시 후 다시 시도해 주세요.") // alert 말고 다르게 표시하자
    } finally {
        setLoading(false);
    }
  };

  // === step 2 버튼: 아니오, 완료 ===
  // const handleFinish = () => {
  //   setModalOpen(false);          // 닫고 끝
  //   setStep(1);
  //   setBook(null);
  //   navigate(`/barcode/booklist/${mode}`);
  // };

  // === step 2 버튼: 네, 추가 ===
  const handleAddMore = () => {
    setModalOpen(false);          // 닫고 다음 스캔 준비
    setStep(1);
    setBook(null);
    setRetakeCount((v) => v + 1);
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
          인식이 어려우면 조명을 밝히고, 바코드와 카메라를 평행하게 맞춘 뒤 프레임 안에 꽉 차게 맞춰보세요.
        </Hint>
      </MaskBottom>

      <ConfirmModal
        open={modalOpen}
        step={step}
        mode={mode} // give | take
        book={book}
        loading={loading}
        onPrimary={step === 1 ? handleRetake  : handleFinish}
        onSecondary={step === 1 ? handleConfirm : handleAddMore}
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
  background: #FFFFFF;
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
  background: #FFFFFF;
  pointer-events: none;
`;

const MaskBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px clamp(12px, 4vw, 20px) max(env(safe-area-inset-bottom), 12px);
  background: #FFFFFF;
  color: #fff;
  pointer-events: none;
`;

const Title = styled.div`
  color: #000000;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
//   설명필요
  margin-bottom: -10px;
`;

const Hint = styled.p`
  color: #000000;
  text-align: center;
  font-size: 13px;
//   설명필요
  line-height: 5;
  opacity: .9;
  margin: 0;
`;

const GuideLine = styled.div`
  position: absolute;
  left: 6%;
  right: 6%;
  top: 50%;
  height: 2px;
  background: #ff3b30;
  opacity: .9;
  transform: translateY(-50%);
  border-radius: 2px;
  pointer-events: none;
`;