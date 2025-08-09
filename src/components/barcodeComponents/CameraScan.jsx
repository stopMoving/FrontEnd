import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function CameraScan({
  onDetected,
  autoStart = false,
  hideControls = false,
  fullScreen = false,   // ✅ 추가: 비디오를 컨테이너 꽉 채우기
}) {
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const startedRef = useRef(false);
  const lastScannedRef = useRef("");

  const config = {
    fps: 15,
    qrbox: { width: 360, height: 240 }, // ✅ qrbox 유지
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    disableFlip: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  };

  const startScan = async () => {
    if (startedRef.current) return;
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }
      await html5QrCodeRef.current.start(
        { facingMode: { exact: "environment" } },
        config,
        (decodedText) => {
          if (decodedText === lastScannedRef.current) return;
          lastScannedRef.current = decodedText;
          onDetected?.(decodedText);
        }
      );
      startedRef.current = true;
      setIsScanning(true);
    } catch (err) {
      console.error("카메라 시작 실패:", err);
    }
  };

  const stopScan = async () => {
    if (!startedRef.current || !html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
    } catch {}
    finally {
      startedRef.current = false;
      setIsScanning(false);
      lastScannedRef.current = "";
    }
  };

  useEffect(() => {
    if (autoStart) startScan();
    return () => { if (startedRef.current) stopScan(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const wrapStyle = fullScreen
    ? { position: "absolute", inset: 0 }          // ✅ 페이지를 꽉 채우는 컨테이너 안에서 absolute
    : { textAlign: "center" };

  const readerStyle = fullScreen
    ? { position: "absolute", inset: 0 }          // ✅ html5-qrcode 비디오를 꽉 채움
    : { width: 360, margin: "1rem auto" };

  return (
    <div style={wrapStyle}>
      <div id="reader" style={readerStyle} />
      {!hideControls && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button onClick={startScan} disabled={isScanning}>카메라 시작</button>
          <button onClick={stopScan} disabled={!isScanning} style={{ marginLeft: "1rem" }}>
            카메라 정지
          </button>
        </div>
      )}
    </div>
  );
}