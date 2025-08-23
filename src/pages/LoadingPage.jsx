import styled, { keyframes } from "styled-components";

export default function LoadingPage({
  title = "잠시만 기다려 주세요!",
  description = "화면을 불러오고 있어요.",
}) {
  return (
    <Wrap>
      <DotLoader>
        <Dot />
        <Dot />
        <Dot />
      </DotLoader>

      <TextWrap>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #FFFFFF;
  text-align: center;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const DotLoader = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 0;
  margin-bottom: 16px;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #11B55F;
  animation: ${bounce} 1.4s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #11B55F;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;
