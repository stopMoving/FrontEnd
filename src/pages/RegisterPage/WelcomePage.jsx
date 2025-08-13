import React from "react";
import Button from "../../components/style/Button";
import { useNavigate } from "react-router-dom";
import FullScreenContainer from "../../components/style/FullScreenContainer";
import useUserStore from "../../store/useUserStore";
import styled from "styled-components";

const WelcomePage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      <FullScreenContainer>
        <h1 style={{ fontSize: "32px" }}>
          {userNickName ? `${userNickName}님,` : ""} 환영합니다!
        </h1>
        <div style={{ fontSize: "16px" }}>
          이제 마음껏 책을 나누고, 받을 수 있어요.
        </div>
        <WelcomeButton onClick={handleNavigate}>지금 시작하기</WelcomeButton>
      </FullScreenContainer>
    </>
  );
};

export default WelcomePage;

const WelcomeButton = styled.button`
  background-color: #bcbcbc;
  width: 50%;
  border: none;
  border-radius: ${({ round }) => (round ? `9999px` : `16px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 16px;
  margin: 16px;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:active {
    background-color: #7760b4;
  }
`;
