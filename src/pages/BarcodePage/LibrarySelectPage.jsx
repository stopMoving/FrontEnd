import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LibrarySelectPanel from "../../components/barcodeComponents/LibrarySelectPanel";

export default function LibrarySelectPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const navigate = useNavigate();

  // 모드별 상단 타이틀만 다름
  const title = mode === "take" ? "데려가기" : "나눔하기";

  // 실제로는 API로 불러오세요.
  const [branches] = useState([
    { id: "lib1", name: "중앙도서관" },
    { id: "lib2", name: "서초도서관" },
    { id: "lib3", name: "마포도서관" },
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