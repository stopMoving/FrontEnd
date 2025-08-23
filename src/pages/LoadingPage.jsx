import styled, { css, keyframes } from "styled-components";

export default function LoadingPage({
  title = "잠시만 기다려 주세요!",
  description = "화면을 불러오고 있어요.",
  isCompact = false,
}) {
  return (
    <Wrap isCompact={isCompact}>
      <DotLoader isCompact={isCompact}>
        <Dot />
        <Dot />
        <Dot />
      </DotLoader>

      {!isCompact && (
        <TextWrap>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextWrap>
      )}
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
  background: #ffffff;
  text-align: center;

  ${(props) =>
    props.isCompact
      ? css`
          // 컴팩트 모드일 때 전체 화면 스타일 제거
          min-height: auto;
          padding: 20px 0;
        `
      : css`
          // 기본 (전체 화면) 모드
          min-height: 100dvh;
        `}
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
  gap: ${(props) => (props.isCompact ? "6px" : "8px")};
  padding: 16px 0;
  margin-bottom: ${(props) => (props.isCompact ? "0" : "16px")};
`;

const Dot = styled.div`
  width: ${(props) => (props.isCompact ? "12px" : "16px")};
  height: ${(props) => (props.isCompact ? "12px" : "16px")};
  border-radius: 50%;
  background: #11b55f;
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
  color: #11b55f;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;
