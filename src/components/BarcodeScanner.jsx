import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { BrowserMultiFormatReader } from "@zxing/library"; // ✅ 이미지용

const BarcodeScanner = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("스캔 결과: 없음");
  const html5QrCodeRef = useRef(null);
  const lastScannedRef = useRef("");

  const config = {
    fps: 15,
    qrbox: { width: 360, height: 240 },
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    disableFlip: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true }
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameras(devices);
        const backCam = devices.find((d) =>
          d.label.toLowerCase().includes("back")
        );
        setSelectedCameraId(backCam ? backCam.id : devices[0]?.id || "");
      })
      .catch((err) => {
        console.error("카메라 목록 로딩 실패:", err);
      });

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
        html5QrCodeRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const onScanSuccess = (decodedText) => {
    if (decodedText === lastScannedRef.current) return;
    lastScannedRef.current = decodedText;
    handleISBN(decodedText);
  };

  const handleISBN = (text) => {
    if (/^97[89]\d{10}$/.test(text)) {
      setResult(`✅ ISBN: ${text}`);
      fetch(`https://stopmoving.p-e.kr/bookinfo/lookup/?isbn=${text}`)
        .then((res) => res.json())
        .then((data) => console.log("서버 응답:", data))
        .catch((err) => console.error("전송 실패:", err));
    } else {
      setResult(`❌ ISBN 형식이 아닙니다: ${text}`);
    }
  };

  const startScan = async () => {
    if (!selectedCameraId) return;
    try {
      html5QrCodeRef.current = new Html5Qrcode("reader");
      await html5QrCodeRef.current.start(
        { deviceId: { exact: selectedCameraId } },
        config,
        onScanSuccess
      );
      setIsScanning(true);
    } catch (err) {
      console.error("카메라 시작 실패:", err);
    }
  };

  const stopScan = async () => {
    try {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
      setIsScanning(false);
      setResult("스캔 결과: 없음");
      lastScannedRef.current = "";
    } catch (err) {
      console.error("카메라 정지 실패:", err);
    }
  };

  // ✅ 이미지 업로드 인식
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const result = await codeReader.decodeFromImageElement(img);
        console.log("✅ 이미지 인식:", result.text);
        handleISBN(result.text);
      } catch (err) {
        console.error("❌ 이미지 인식 실패:", err);
        setResult("❌ 이미지에서 바코드 인식 실패");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📚 ISBN 바코드 스캔</h2>

      {/* 🔹 실시간 카메라 */}
      <div id="reader" style={{ width: 360, margin: "1rem auto" }} />

      <select
        disabled={isScanning}
        value={selectedCameraId}
        onChange={(e) => setSelectedCameraId(e.target.value)}
        style={{ marginTop: "1rem" }}
      >
        {cameras.map((cam, idx) => (
          <option key={cam.id} value={cam.id}>
            {cam.label || `Camera ${idx + 1}`}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={startScan} disabled={isScanning}>
          카메라 시작
        </button>
        <button
          onClick={stopScan}
          disabled={!isScanning}
          style={{ marginLeft: "1rem" }}
        >
          카메라 정지
        </button>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* 🔸 이미지 업로드 */}
      <div>
        <label htmlFor="upload">또는 이미지 업로드:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div id="result" style={{ marginTop: "1.5rem", fontSize: "18px" }}>
        {result}
      </div>
    </div>
  );
};

export default BarcodeScanner;