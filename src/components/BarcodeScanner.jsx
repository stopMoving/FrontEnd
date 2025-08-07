import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

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
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true
    }
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameras(devices);
        const backCam = devices.find(d => d.label.toLowerCase().includes("back"));
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
    console.log("✅ 인식된 바코드:", decodedText);

    if (/^97[89]\d{10}$/.test(decodedText)) {
      setResult(`✅ ISBN: ${decodedText}`);
      fetch(`https://stopmoving.p-e.kr/bookinfo/lookup/?isbn=${decodedText}`)
        .then(res => res.json())
        .then(data => console.log("서버 응답:", data))
        .catch(err => console.error("전송 실패:", err));
    } else {
      setResult(`❌ ISBN 형식이 아닙니다: ${decodedText}`);
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

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📚 ISBN 바코드 스캔</h2>
      <div id="reader" style={{ width: 360, margin: "1rem auto" }} />
      <select
        id="camera-select"
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
        <button onClick={stopScan} disabled={!isScanning} style={{ marginLeft: "1rem" }}>
          카메라 정지
        </button>
      </div>
      <div id="result" style={{ marginTop: "1rem", fontSize: "18px" }}>
        {result}
      </div>
    </div>
  );
};

export default BarcodeScanner;