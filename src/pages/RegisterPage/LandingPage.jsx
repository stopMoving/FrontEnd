import React, { useEffect, useState } from "react";
import { ReactComponent as LibraryLogo } from "../../assets/icons/libraryMainLogo.svg";
import { ReactComponent as MainLogo } from "../../assets/icons/logoWhite.svg";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <FullScreenContainer visible={visible}>
      <LibraryLogo width={158} height={130} />
      <MainLogo width={179} height={74} style={{ marginTop: 40 }} />
      <Title>우리 동네, 함께 쓰는 책장</Title>
    </FullScreenContainer>
  );
};

export default LandingPage;

const FullScreenContainer = styled.div`
  width: 100vw;
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #11b55f;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Title = styled.h2`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 600;
  color: white;
`;
