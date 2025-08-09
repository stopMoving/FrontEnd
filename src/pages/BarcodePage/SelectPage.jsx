import { useParams } from "react-router-dom";
import SelectPanel from "../../components/barcodeComponents/SelectPanel";

export default function SelectPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const copy = mode === "take"
    ? {
        title: "책을 데려갈게요.",
        description: "데려갈 책 뒷면의 ISBN 바코드를 찍어주세요.",
      }
    : {
        title: "책을 나눔할게요.",
        description: "나눔할 책 뒷면의 ISBN 바코드를 찍어주세요.",
      };

  return <SelectPanel {...copy} />;
}