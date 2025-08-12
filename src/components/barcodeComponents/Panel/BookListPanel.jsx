import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StepHeader from "../StepHeader";

export default function BookListPanel({
  title,
  description,
  buttonLabel,
  disabled = false,
  onNext,
}) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <StepHeader
        title={title}
        activeStep={3}    // ← STEP 3 화면
        onBack={() => navigate(-1)}
      />

      <Inner>
        <SectionTitle>{description}</SectionTitle>
        {/* 바코드 찍은 책 목록 불러오기 */}
      </Inner>

      <BottomBar>
        <Button disabled={disabled} onClick={onNext}>
          {buttonLabel}
        </Button>
      </BottomBar>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  background: #fff;
  position: relative;

  /* 고정 StepHeader 높이만큼 여백 확보 */
  padding-top: 180px;
`;

const Inner = styled.div`
  padding: 0 16px;
  display: grid;
  gap: 20px;
`;

const SectionTitle = styled.div`
  width: min(520px, 92vw);
  font-size: 20px;
  font-weight: 600;
  margin: 0 auto;
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 47px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  color: #FFFFFF;
  background: "#11B55F";
  cursor: "pointer";
`;