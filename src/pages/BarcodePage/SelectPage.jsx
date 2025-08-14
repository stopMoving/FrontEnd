import { useParams, useSearchParams } from "react-router-dom";
import SelectPanel from "../../components/barcodeComponents/Panel/SelectPanel";

export default function SelectPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const [searchParams] = useSearchParams();
  const libraryId = searchParams.get("branchId");

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

  return <SelectPanel {...copy} mode={mode} libraryId={libraryId}/>;
}