import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LibrarySelectPanel from "../../components/barcodeComponents/Panel/LibrarySelectPanel";

export default function LibrarySelectPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const navigate = useNavigate();

  // 모드별 상단 타이틀만 다름
  const title = mode === "take" ? "데려가기" : "나눔하기";

  // 실제로는 API로 불러오세요.
  const [branches] = useState([
    { libraryId: "1", name: "까망돌도서관" },
    { libraryId: "2", name: "김영삼도서관" },
    { libraryId: "3", name: "사당솥밭도서관" },
    { libraryId: "4", name: "신대방누리도서관" },
    { libraryId: "5", name: "동작영어마루도서관" },
    { libraryId: "6", name: "대방어린이도서관" },
    { libraryId: "7", name: "약수도서관" },
    { libraryId: "8", name: "동작샘터도서관" },
    { libraryId: "9", name: "다울작은도서관" },
    { libraryId: "10", name: "국사봉숲속작은도서관" },
  ]);
  
  const [selected, setSelected] = useState("");

  const loading = false;

  const handleNext = () => {
    if (!selected) return;
    // 선택값을 들고 다음 스텝으로
    navigate(`/barcode/select/${mode}?branchId=${encodeURIComponent(selected)}`);
  };

  return (
    <LibrarySelectPanel
      title={title}
      branches={branches}
      value={selected}
      onChange={setSelected}
      onNext={handleNext}
      loading={loading}
    />
  );
}