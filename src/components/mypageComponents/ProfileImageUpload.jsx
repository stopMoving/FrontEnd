import React, { useRef, useState } from "react";
import styled from "styled-components";
import { userAPI } from "../../lib/api";

import { ReactComponent as DefaultProfileIcon } from "../../assets/images/profileImage.svg";
import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";

const ProfileImageUpload = ({ currentImageUrl, userId, onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 이미지를 클릭하면 숨겨진 file input이 클릭되도록 함
  const handleImageClick = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  // 사용자가 파일을 선택하면 실행될 함수
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      // API 함수를 호출하여 이미지 업로드
      await userAPI.uploadProfileImage(userId, file);
      // 성공 시, 부모 컴포넌트에 알림
      onUploadSuccess();
    } catch (err) {
      setError("업로드에 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container onClick={handleImageClick}>
      {currentImageUrl ? (
        <ProfileImage src={currentImageUrl} alt="User profile" />
      ) : (
        <DefaultProfileIcon width={70} height={70} />
      )}

      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      {/* 실제 파일 입력을 위한 숨겨진 input */}
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*" // 이미지 파일만 선택 가능하도록 제한
      />
    </Container>
  );
};

export default ProfileImageUpload;

const Container = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  cursor: pointer;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(SpinnerIcon)`
  width: 30px;
  height: 30px;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
