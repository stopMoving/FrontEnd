import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/barcodeComponents/ImageUpload";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";

export default function UploadPage({
    onBack,
}) {
  const navigate = useNavigate();

  const handleDetected = (code) => {
    console.log("업로드로 인식된 코드:", code);
    // 여기서 조회/모달 등 공통 후처리로 연결
    navigate(-1);
  };

  return (
    <Wrap>
      <TopBar>
        <BackButton type="button" onClick={onBack}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <Title>바코드 사진 업로드</Title>
      </TopBar>

      <Inner>
        <ImageUpload onDetected={handleDetected} />
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  top: 40px;
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  background: #fff;
  padding-top: 40px;
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

const Inner = styled.div`
  padding: 12px 20px 0;
  display: grid;
  gap: 20px;
`;