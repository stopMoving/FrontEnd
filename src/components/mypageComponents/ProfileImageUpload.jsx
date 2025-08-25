import React, { useRef, useState } from "react";
import styled from "styled-components";
import { userAPI } from "../../lib/api";

import { ReactComponent as DefaultProfileIcon } from "../../assets/images/profileImage.svg";
import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";

const ProfileImageUpload = ({ currentImageUrl, userId, onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageClick = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      await userAPI.uploadProfileImage(userId, file);
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

      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
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
