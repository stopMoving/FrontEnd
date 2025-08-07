import React from "react";
import styled from "styled-components";
import GoogleButton from "../components/GoogleButton";
import Button from "../components/Button";
import Input from "../components/Input";
import { auth } from "../firebase/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const displayName = user.displayName; // 구글 계정 이름
      const email = user.email; // 구글 계정 이메일
      const photoURL = user.photoURL; // 구글 프로필 사진 URL
      const uid = user.uid; // 사용자별 고유 ID

      console.log("이름:", displayName);
      console.log("이메일:", email);
      console.log("사진URL:", photoURL);
      console.log("고유ID:", uid);

      console.log("구글 로그인 성공!", user);

      navigate("/"); // 메인페이지로 이동
    } catch (error) {
      console.error("구글 로그인 에러", error);
    }
  };

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
      <GoogleButton onClick={handleGoogleLogin} />
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
