import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StepHeader from "../StepHeader";
import { ReactComponent as CameraIcon } from "../../../assets/icons/camera.svg";
import { ReactComponent as ImageUploadIcon} from "../../../assets/icons/imageUpload.svg";
import { ReactComponent as InputISBNIcon} from "../../../assets/icons/inputISBN.svg";

export default function SelectPanel({
  title,
  description,
  mode,
  libraryId
}) {
  const navigate = useNavigate();
  
  // const getScanUrl = (path) => {
  //   return `${path}/${mode}?branchId=${encodeURIComponent(libraryId)}`;
  // }

  return (
    <Wrap>
      <StepHeader
        title={title}     // 예: "책을 나눔할게요." / "책을 데려갈게요."
        activeStep={2}    // ← STEP 2 화면
        onBack={() => navigate(-1)}
      />

      <Inner>
        <SectionTitle>{description}</SectionTitle>

        <Buttons>
          <Btn onClick={() => navigate(`/barcode/scan/${mode}?branchId=${encodeURIComponent(libraryId)}`)}>
            <CameraIcon width={32} height={32} />
            카메라로 바코드 인식
          </Btn>

          <Btn onClick={() => navigate(`/barcode/upload/${mode}?branchId=${encodeURIComponent(libraryId)}`)}>
            <ImageUploadIcon width={32} height={32} />
            바코드 사진 업로드
          </Btn>

          <Btn onClick={() => navigate(`/barcode/input_ISBN/${mode}?branchId=${encodeURIComponent(libraryId)}`)}>
            <InputISBNIcon width={32} height={32} />
            ISBN 코드 직접 입력
          </Btn>
        </Buttons>
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

const Buttons = styled.div`
  width: min(520px, 92vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  padding: 0 16px;
  line-height: 1;
  border: none;
  border-radius: 5px;
  background: #E6F4F0;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  cursor: pointer;
  gap: 16px;
`;