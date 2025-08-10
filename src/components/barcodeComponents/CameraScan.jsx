import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function CameraScan({
  onDetected,
  autoStart = false,
  viewSize = { width: 600, height: 300 },
  fit = "cover",
}) {
  const html5QrCodeRef = useRef(null);
  const startedRef = useRef(false);
  const lastScannedRef = useRef("");

  const config = {
    fps: 15,
    qrbox: { width: viewSize.width, height: viewSize.height },
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    disableFlip: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  };

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const tryStartWith = async (cameraConfig) => {
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("reader");
    }
    await html5QrCodeRef.current.start(cameraConfig, config, (decodedText) => {
      if (decodedText === lastScannedRef.current) return;
      lastScannedRef.current = decodedText;
      onDetected?.(decodedText);
    });

    const video = document.querySelector("#reader video");
    const canvas = document.querySelector("#reader canvas");
    [video, canvas].forEach((el) => {
      if (!el) return;
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.objectFit = fit;
    });
  };

  const startScan = async () => {
    if (startedRef.current) return;
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

    for (const cfg of candidates) {
      try {
        await tryStartWith(cfg);
        startedRef.current = true;
        break;
      } catch (_) {}
    }
  };

  const stopScan = async () => {
    if (!startedRef.current || !html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
    } finally {
      startedRef.current = false;
      lastScannedRef.current = "";
    }
  };

  useEffect(() => {
    if (autoStart) startScan();
    return () => {
      if (startedRef.current) stopScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  return (
    <Wrap>
      <Reader id="reader" $w={viewSize.width} $h={viewSize.height} $fit={fit} />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Reader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  background: #000;

  video,
  canvas {
    width: 100% !important;
    height: 100% !important;
    object-fit: ${({ $fit }) => $fit};
  }
`;