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
          {userNickName ? `${userNickName}님,` : "아기사자님"} 환영합니다!
        </h1>
        <div style={{ fontSize: "18px" }}>
          이제 마음껏 책을 나누고, 받을 수 있어요.
        </div>
        <WelcomeButton onClick={handleNavigate}>지금 시작하기</WelcomeButton>
      </FullScreenContainer>
    </>
  );
};

export default WelcomePage;

const WelcomeButton = styled.button`
  background-color: #11b55f;
  border: none;
  border-radius: ${({ round }) => (round ? `9999px` : `5px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 16px;

  width: 80%;
  margin: 16px 0 0 0;

  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:active {
    background-color: #7760b4;
  }
`;
