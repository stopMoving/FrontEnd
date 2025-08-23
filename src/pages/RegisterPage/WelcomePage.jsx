import React from "react";
import { useNavigate } from "react-router-dom";
import FullScreenContainer from "../../components/style/FullScreenContainer";
import useUserStore from "../../store/useUserStore";
import styled from "styled-components";

const WelcomePage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;

  const handleNavigate = () => {
    navigate("/ai/preference");
  };

  return (
    <>
      <FullScreenContainer>
        <Title>{`${userNickName ? `${userNickName}님,` : "아기사자님"}`}</Title>
        <Title>환영합니다!</Title>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              marginBottom: 40,
              marginTop: 16,
            }}
          >
            이제 마음껏 책을 나누고, 받을 수 있어요.
          </div>
          <WelcomeButton onClick={handleNavigate}>지금 시작하기</WelcomeButton>
        </div>
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
  font-weight: 600;
  padding: 16px;

  width: 100%;
  margin: 16px 0 0 0;
  font-family: inherit;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0fa356;
  }

  &:active {
    background-color: #0e914c;
  }
`;

const Title = styled.h1`
  font-size: 32px;
`;
