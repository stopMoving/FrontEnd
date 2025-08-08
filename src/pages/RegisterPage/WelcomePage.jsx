import React from "react";
import Button from "../../components/style/Button";
import { useNavigate } from "react-router-dom";
import FullScreenContainer from "../../components/style/FullScreenContainer";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      <FullScreenContainer>
        <h1 style={{ fontSize: "32px" }}>환영합니다!</h1>
        <div style={{ fontSize: "16px" }}>
          이제 마음껏 책을 나누고, 받을 수 있어요.
        </div>
        <Button onClick={handleNavigate}>지금 시작하기</Button>
      </FullScreenContainer>
    </>
  );
};

export default WelcomePage;
