import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/barcodeComponents/ImageUpload";
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";

export default function UploadPage() {
  const navigate = useNavigate();

  const handleDetected = (code) => {
    console.log("업로드로 인식된 코드:", code);
    // TODO: 여기서 조회/모달 등 공통 후처리로 연결
    navigate(-1);
  };

  return (
    <Wrap>
      <TopBar>
        <BackButton type="button" onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <Title>바코드 사진 업로드</Title>
      </TopBar>

      <Inner>
        {/* 페이지 진입 시 갤러리 자동 오픈 시도 */}
        <ImageUpload onDetected={handleDetected} autoOpen />
      </Inner>
    </Wrap>
  );
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

const Inner = styled.div`
  padding: 16px 20px 0;
  display: grid;
  gap: 20px;
`;