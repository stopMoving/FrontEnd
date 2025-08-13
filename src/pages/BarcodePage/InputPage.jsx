import styled from "styled-components";
import InputNumber from "../../components/barcodeComponents/InputNumber";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { useNavigate } from "react-router-dom";

export default function InputPage () {
    const navigate = useNavigate();
    
    return (
    <Wrap>
      <TopBar>
        <BackButton type="button" onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <Title>ISBN 코드 직접 입력</Title>
      </TopBar>

      
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  background: #fff;
  padding-top: 40px;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  height: 50px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  z-index: 10;
`;

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