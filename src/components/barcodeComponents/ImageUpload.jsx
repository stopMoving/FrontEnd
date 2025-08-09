import { BrowserMultiFormatReader } from "@zxing/library";

export default function ImageUpload({ onDetected }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => { img.src = reader.result; };
    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const res = await codeReader.decodeFromImageElement(img);
        onDetected(res.text);
      } catch (err) {
        console.error("❌ 이미지 인식 실패:", err);
        alert("이미지에서 바코드 인식 실패");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="upload">또는 이미지 업로드: </label>
      <input id="upload" type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}