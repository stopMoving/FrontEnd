import { useParams } from "react-router-dom";
import BookListPanel from "../../components/barcodeComponents/Panel/BookListPanel";
import CompleteModal from "./CompleteModal";
import { useState } from "react";

export default function BookListPage() {
  const { mode } = useParams(); // 'give' | 'take'
  const [completeOpen, setCompleteOpen] = useState(false);

  const count = 3;
  const points = 1200;

  const copy = mode === "give"
    ? {
        title: "나눔하기",
        description: "책 목록을 확인 후 나눔해주세요.",
        unit: "P",
        buttonLabel: "나눔하기",
      }
    : {
        title: "데려가기",
        description: "책 목록을 확인 후 결제해주세요.",
        unit: "원",
        buttonLabel: "결제하기",
      };

  return (
  <>
    <BookListPanel
      {...copy}
      onNext={() => setCompleteOpen(true)}
      disabled={false}
    />;

    <CompleteModal
      open={completeOpen}
      mode={mode}
      count={count}
      points={points}
      onPrimary={() => {
        setCompleteOpen(false);
      }}
      onClose={() => setCompleteOpen(false)}
    />
  </>
  );
}