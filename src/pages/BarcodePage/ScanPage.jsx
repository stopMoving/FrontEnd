import styled from "styled-components";
import CameraScan from "../../components/barcodeComponents/CameraScan";

export default function ScanPage() {
  const handleDetected = (isbn) => {
    console.log("✅ 감지된 코드:", isbn);
    // TODO: ISBN 검증/조회/페이지 이동 등
    // navigate("/barcode/confirm", { state: { isbn } });
  };

  return (
    <Screen>
      {/* 비디오가 화면을 꽉 채우되, 스캔은 qrbox(360x240)로 진행 */}
      <CameraScan onDetected={handleDetected} autoStart hideControls fullScreen />

      <MaskTop />
      <GuideLine />
      <MaskBottom>
        <Title>바코드 인식</Title>
        <Hint>
          인식이 어려우면 조명을 밝히고, 바코드와 카메라를 평행하게 맞춘 뒤
          프레임 안에 꽉 차게 맞춰보세요.
        </Hint>
      </MaskBottom>
    </Screen>
  );
}

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  background: #000;
  overflow: hidden;
`;

const MaskTop = styled.div`
  position: absolute; left: 0; right: 0; top: 0; height: 22%;
  background: linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0));
  pointer-events: none;
`;

const MaskBottom = styled.div`
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 16px clamp(12px, 4vw, 20px) max(env(safe-area-inset-bottom), 12px);
  background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0));
  color: #fff; pointer-events: none;
`;

const Title = styled.div`
  text-align: center; font-weight: 700; font-size: 18px; margin-bottom: 8px;
`;

const Hint = styled.p`
  text-align: center; font-size: 13px; line-height: 1.4; opacity: .9; margin: 0;
`;

const GuideLine = styled.div`
  position: absolute; left: 6%; right: 6%; top: 50%; height: 2px;
  background: #ff3b30; opacity: .9; transform: translateY(-50%); border-radius: 2px;
  pointer-events: none;
`;