import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";

export default function StepHeader({
  title = "",
  activeStep = 1,     // 1 | 2 | 3
  onBack,             // 뒤로가기 콜백
}) {
  return (
    <Wrap>
      <TopBar>
        <BackButton type="button" onClick={onBack}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <Title>{title}</Title>
      </TopBar>

      <Steps>
        <Step $active={activeStep === 1}>STEP 1</Step>
        <Step $active={activeStep === 2}>STEP 2</Step>
        <Step $active={activeStep === 3}>STEP 3</Step>
      </Steps>
    </Wrap>
  );
}

const Wrap = styled.header`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: #fff;
  z-index: 30px;
  border-bottom: 1px solid #000000;
`;

const TopBar = styled.div`
  position: relative;
  height: 50px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  padding: 0 10px;
`

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px 20px 0;
`;

const Step = styled.div`
  position: relative;
  padding: 3px 6px 11px;
  font-size: 20px;
  font-weight: 500;
  color: #6F6F6F;

  ${({ $active }) =>
    $active &&
    `
      color: #111;
    `}
  /* 활성 스텝 아래 초록 인디케이터 */
  ${({ $active }) =>
    $active &&
    `
      &::after{
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -2px;
        height: 3.5px;
        width: clamp(72px, 22vw, 140px); /* 가운데 짧은 밑줄 */
        background: #11B55F;
        border-radius: 999px;
      }
    `}
`;