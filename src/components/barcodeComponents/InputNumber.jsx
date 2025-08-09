import { useState } from "react";

export default function InputNumber({ onSubmit }) {
  const [manualIsbn, setManualIsbn] = useState("");

  const submitManual = () => {
    const cleaned = manualIsbn.replace(/[^0-9]/g, "");
    if (cleaned.length) {
      onSubmit(cleaned);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: 8 }}>또는 직접 입력:</div>
      <input
        type="text"
        value={manualIsbn}
        onChange={(e) => setManualIsbn(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submitManual()}
        placeholder="ISBN-13 (숫자 13자리)"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{ width: 240, padding: 8, fontSize: 16 }}
      />
      <button onClick={submitManual} style={{ marginLeft: 8 }}>조회</button>
    </div>
  );
}