import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SelectPanel from "../../components/barcodeComponents/Panel/SelectPanel";
import useBookStore from "../../store/useBookStore";

export default function SelectPage() {
  const { mode } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearScannedBooks } = useBookStore();

  const libraryId = searchParams.get("branchId");

  const onBack = () => {
    clearScannedBooks();
    navigate(`/`);
  }

  const copy = mode === "give"
    ? {
        title: "나눔하기",
        description: (
            <>
            나눔할 책 뒷면의<br />
            ISBN 바코드를 찍어주세요.
            </>
        ),
      }
    : {
        title: "데려가기",
        description: (
            <>
            데려갈 책 뒷면의<br />
            ISBN 바코드를 찍어주세요.
            </>
        ),
      };

  return (
    <SelectPanel
      {...copy}
      mode={mode}
      libraryId={libraryId}
      onBack={onBack}
    />
  );
}