import React from "react";
import styled from "styled-components";
import KakaoButton from "../components/KaKaoButton";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  return (
    <Container>
      <Description>
        회원이 아니신가요? <Link href="#">회원가입 하기</Link>
      </Description>
      <form>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="stopMoving@gmail.com"
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
        />
        <Button type="submit">로그인 하기</Button>
      </form>
      <KakaoButton />
    </Container>
  );
};

export default Login;

const Description = styled.div`
  color: #848187;
  text-align: center;
`;

const Container = styled.div`
  width: 400px;
  margin: 40px auto;

  ${Input} {
    margin-bottom: 16px;
  }

  ${Button} {
    width: 100%;
    margin: 8px 0;
  }
`;

const Label = styled.label`
  color: #e1c6f7;
`;

const Link = styled.a`
  color: #6500c3;
  font-weight: bold;
`;
