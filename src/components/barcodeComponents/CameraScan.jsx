import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function CameraScan({ onDetected }) {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
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
        const backCam = devices.find(d => d.label.toLowerCase().includes("back"));
        setSelectedCameraId(backCam ? backCam.id : devices[0]?.id || "");
      })
      .catch((err) => console.error("카메라 목록 로딩 실패:", err));

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
        html5QrCodeRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const startScan = async () => {
    if (!selectedCameraId) return;
    try {
      html5QrCodeRef.current = new Html5Qrcode("reader");
      await html5QrCodeRef.current.start(
        { deviceId: { exact: selectedCameraId } },
        config,
        (decodedText) => {
          if (decodedText === lastScannedRef.current) return;
          lastScannedRef.current = decodedText;
          onDetected(decodedText);
        }
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
      lastScannedRef.current = "";
    } catch (err) {
      console.error("카메라 정지 실패:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
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
        <button onClick={startScan} disabled={isScanning}>카메라 시작</button>
        <button onClick={stopScan} disabled={!isScanning} style={{ marginLeft: "1rem" }}>
          카메라 정지
        </button>
      </div>
    </div>
  );
}