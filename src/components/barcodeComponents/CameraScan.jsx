import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function CameraScan({
  onDetected,
  autoStart = false,
  hideControls = false,
  fullScreen = false,   // 컨테이너 꽉 채우기
}) {
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const startedRef = useRef(false);
  const lastScannedRef = useRef("");

  const config = {
    fps: 15,
    qrbox: { width: 360, height: 240 }, // 스캔 박스 유지
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    disableFlip: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  };

  // 간단한 모바일 판별
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const tryStartWith = async (cameraConfig) => {
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("reader");
    }
    await html5QrCodeRef.current.start(
      cameraConfig,
      config,
      (decodedText) => {
        if (decodedText === lastScannedRef.current) return;
        lastScannedRef.current = decodedText;
        onDetected?.(decodedText);
      }
    );
  };

  const startScan = async () => {
    if (startedRef.current) return;

    // 모바일: 후면 우선 → (실패 시) 전면
    // 노트북/데스크탑: 전면 우선 → (실패 시) 후면
    const candidates = isMobile
      ? [
          { facingMode: { exact: "environment" } },
          { facingMode: "environment" },
          { facingMode: { exact: "user" } },
          { facingMode: "user" },
        ]
      : [
          { facingMode: { exact: "user" } },
          { facingMode: "user" },
          { facingMode: { exact: "environment" } },
          { facingMode: "environment" },
        ];

    // 순차 시도
    let started = false;
    for (const cfg of candidates) {
      try {
        await tryStartWith(cfg);
        started = true;
        break;
      } catch (e) {
        // 다음 후보로 계속
        // console.warn("카메라 시도 실패, 다음 후보 진행:", cfg, e);
      }
    }

    if (started) {
      startedRef.current = true;
      setIsScanning(true);
    } else {
      console.error("모든 카메라 시작 시도가 실패했어요. 권한/HTTPS/다른 앱 점유 여부를 확인해 주세요.");
    }
  };

  const stopScan = async () => {
    if (!startedRef.current || !html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
    } catch {
      // 이미 멈춰있으면 무시
    } finally {
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
    ? { position: "absolute", inset: 0 }
    : { textAlign: "center" };

  const readerStyle = fullScreen
    ? { position: "absolute", inset: 0 }
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