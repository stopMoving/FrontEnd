import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SelectPanel({ title, description }) {
  const navigate = useNavigate();

  return (
    <Wrap>
        <h2></h2>
      <Title>{title}</Title>

      <Title>| 바코드 인식</Title>
      <Desc>{description}</Desc>

      <Buttons>
        <BtnPrimary onClick={() => navigate("/barcode/scan")}>
          📷 카메라로 바코드 인식
        </BtnPrimary>
        <Btn onClick={() => navigate("/barcode/upload")}>
          🖼️ 바코드 사진 업로드
        </Btn>
        <Btn onClick={() => navigate("/barcode/manual")}>
          ✍️ ISBN 코드 직접 입력
        </Btn>
      </Buttons>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100dvh;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  width: min(520px, 92vw);
  margin: 8px 0 4px;
  font-size: 20px;
`;
const Desc = styled.p`
  width: min(520px, 92vw);
  margin: 0 0 20px;
  color: var(--color-muted, #6b7280);
`;
const Buttons = styled.div`
  width: min(520px, 92vw);
  display: grid;
  gap: 12px;
`;
const Btn = styled.button`
  width: 100%;
  min-height: var(--tap, 44px);
  padding: 12px 16px;
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--color-border, #e6e8ec);
  background: #f7f8fa;
  font-weight: 600;
  text-align: center;
`;
const BtnPrimary = styled(Btn)`
  background: var(--color-primary, #111);
  color: var(--color-primary-contrast, #fff);
  border-color: transparent;
  box-shadow: var(--shadow-lg, 0 10px 30px rgba(0,0,0,.08));
`;
const Hint = styled.p`
  width: min(520px, 92vw);
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-muted, #6b7280);
`;