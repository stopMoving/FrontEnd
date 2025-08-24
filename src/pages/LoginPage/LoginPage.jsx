import React, { useEffect, useState } from "react";
import Input from "../../components/style/Input";
import { useNavigate } from "react-router-dom";
import Label from "../../components/style/Label";
import HorizontalRule from "../../components/style/HorizontalRule";
import Button from "../../components/style/Button";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { ReactComponent as LogoSVG } from "../../assets/icons/logo.svg";
import Link from "../../components/style/Link";
import { useToaster } from "../../store/useToasterStore";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, user } = useUserStore();
  const toast = useToaster();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(values);

      // is_survey 값 확인
      if (loggedInUser && !loggedInUser.is_survey) {
        navigate("/ai/preference");
      } else {
        // is_survey가 true이거나 user 정보가 없으면 메인 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      toast("warn", "아이디 또는 비밀번호가 올바르지 않습니다.");
      console.error("로그인 실패:", error);
    }
  };

  // 테스트용 버튼
  const handleTest = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login({
        username: "admin",
        password: "testuser",
      });

      // is_survey 값 확인
      if (loggedInUser && !loggedInUser.is_survey) {
        navigate("/ai/preference");
      } else {
        // is_survey가 true이거나 user 정보가 없으면 메인 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      toast("warn", "아이디 또는 비밀번호가 올바르지 않습니다.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <>
      <LoginContainer>
        <Logo>
          <LogoSVG width={100} height={40} />
        </Logo>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="username">
            <GreenText>북작북작</GreenText> 로그인
          </Label>
          <div style={{ padding: 0 }}></div>
          <Input
            id="username"
            name="username"
            type="username"
            placeholder="아이디"
            value={values.username}
            onChange={handleChange}
          />
          {/* <Label htmlFor="password">비밀번호</Label> */}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <div style={{ padding: 8 }}></div>
          <Button>로그인</Button>
          <div style={{ padding: 0 }}></div>
          <HorizontalRule></HorizontalRule>
        </StyledForm>
        <BottomContainer style={{ textAlign: "center" }}>
          [북작북작] 계정이 아직 없으신가요?{" "}
          <Link to="/register">회원가입</Link>
          <Button onClick={handleTest}>테스트하기</Button>
        </BottomContainer>
      </LoginContainer>
    </>
  );
};

export default LoginPage;

const StyledForm = styled.form`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 20px 20px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  margin: 20px auto 16px;
`;

const GreenText = styled.span`
  color: #11b55f;
`;

const BottomContainer = styled.div`
  text-align: center;
  color: #6f6f6f;
`;
