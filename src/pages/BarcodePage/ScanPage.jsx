import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CameraScan from "../../components/barcodeComponents/CameraScan";
import ConfirmModal from "./ConfirmModal";

export default function ScanPage() {
  const { mode } = useParams(); // give | take
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retakeCount, setRetakeCount] = useState(0);

  // 스캔 성공 시
  const handleDetected = async (isbn) => {
    // TODO: 서버 조회해서 book 정보 채우기
    setBook({ isbn, title: "제목 예시", author: "저자 예시", image: "" });
    setStep(1);
    setModalOpen(true);           // ← CameraScan에 paused로 전달되어 일시정지
  };

  // === step 1 버튼 동작 ===
  const handleRetake = () => {    // 다시 찍기
    setModalOpen(false);          // 모달 닫힘 → paused=false → 카메라 재개
    setStep(1);
    setBook(null);
    setRetakeCount((v) => v + 1);
  };

  const handleConfirm = () => {   // 확인 → step2
    setStep(2);
  };

  // === step 2 버튼 동작 ===
  const handleFinish = () => {    // 아니오, 완료
    setModalOpen(false);          // 닫고 끝
    setStep(1);
    // 필요하면 navigate("/main") 등
  };

  const handleAddMore = () => {   // 네, 추가
    setModalOpen(false);          // 닫고 다음 스캔 준비
    setStep(1);
    setBook(null);
  };

  return (
    <Screen>
      <Center>
        <CameraScan
          onDetected={handleDetected}
          autoStart
          hideControls
          viewSize={{ width: 600, height: 300 }}
          paused={modalOpen}
          resetOn={retakeCount}
        />
      </Center>

      <MaskTop />
      <GuideLine />
      <MaskBottom>
        <Title>바코드 인식</Title>
        <Hint>
          인식이 어려우면 조명을 밝히고, 바코드와 카메라를 평행하게 맞춘 뒤 프레임 안에 꽉 차게 맞춰보세요.
        </Hint>
      </MaskBottom>

      <ConfirmModal
        open={modalOpen}
        step={step}
        mode={mode} // give | take
        book={book}
        loading={loading}
        onPrimary={step === 1 ? handleRetake  : handleFinish}
        onSecondary={step === 1 ? handleConfirm : handleAddMore}
        onClose={() => setModalOpen(false)}
      />
    </Screen>
  );
}

const Screen = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 100dvh;
  margin: 0 auto;
  background: #000;
  overflow: hidden;
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`;

const MaskTop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 22%;
  background: linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0));
  pointer-events: none;
`;

const MaskBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px clamp(12px, 4vw, 20px) max(env(safe-area-inset-bottom), 12px);
  background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0));
  color: #fff;
  pointer-events: none;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 18px;
//   설명필요
  margin-bottom: -10px;
`;

const Hint = styled.p`
  text-align: center;
  font-size: 13px;
//   설명필요
  line-height: 5;
  opacity: .9;
  margin: 0;
`;

const GuideLine = styled.div`
  position: absolute;
  left: 6%;
  right: 6%;
  top: 50%;
  height: 2px;
  background: #ff3b30;
  opacity: .9;
  transform: translateY(-50%);
  border-radius: 2px;
  pointer-events: none;
`;