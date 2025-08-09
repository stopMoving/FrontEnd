import { useState } from "react";
import CameraScan from "../../components/barcodeComponents/CameraScan";

export default function ScanPage() {
  const [result, setResult] = useState("스캔 결과: 없음");

  const handleISBN = (text) => {
    const digits = String(text).replace(/[^0-9]/g, "");
    if (/^97[89]\d{10}$/.test(digits)) {
      setResult(`✅ ISBN: ${digits}`);
      fetch(`https://stopmoving.p-e.kr/bookinfo/lookup/?isbn=${digits}`)
        .then(res => res.json())
        .then(data => console.log("서버 응답:", data))
        .catch(err => console.error("전송 실패:", err));
    } else {
      setResult(`❌ ISBN 형식이 아닙니다: ${text}`);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📚 카메라로 바코드 인식</h2>
      <CameraScan onDetected={handleISBN} />
      <div style={{ marginTop: "1.5rem", fontSize: 18 }}>{result}</div>
    </div>
  );
}