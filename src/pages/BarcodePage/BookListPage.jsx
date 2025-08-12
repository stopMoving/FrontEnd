import { useParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";

export default function BookListPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const copy = mode === "give"
    ? {
        title: "나눔하기",
        description: "책 목록을 확인 후 나눔해주세요.",
      }
    : {
        title: "데려가기",
        description: "책 목록을 확인 후 결제해주세요.",
      };

  return <BookListPanel {...copy} />;
}