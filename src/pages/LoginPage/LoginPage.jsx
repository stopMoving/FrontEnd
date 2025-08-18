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

  const handleRegister = () => {
    navigate("/register");
  };

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
      await login(values);
      navigate("/"); // 로그인 성공 시 이동할 페이지
    } catch (error) {
      toast("warn", "아이디 또는 비밀번호가 올바르지 않습니다.");
      console.error("로그인 실패:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
          <Button>로그인</Button>
          <HorizontalRule></HorizontalRule>
        </StyledForm>
        <BottomContainer style={{ textAlign: "center" }}>
          [북작북작] 계정이 아직 없으신가요?{" "}
          <Link to="/register">회원가입</Link>
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
  gap: 16px;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 60px 20px 20px 20px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  margin: 0 auto 16px;
`;

const GreenText = styled.span`
  color: #11b55f;
`;

const BottomContainer = styled.div`
  text-align: center;
  color: #6f6f6f;
`;
