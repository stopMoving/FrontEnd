import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../components/style/Label";
import Input from "../../components/style/Input";
import Button from "../../components/style/Button";
import HorizontalRule from "../../components/style/HorizontalRule";
import Link from "../../components/style/Link";
import { useToaster } from "../../store/useToasterStore";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";

function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    nickname: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const toast = useToaster();
  const { register } = useUserStore();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password1 !== values.password2) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // ✅ 스토어의 register 함수에 state 객체를 그대로 전달합니다.
      await register(values);

      // ✅ 회원가입과 자동 로그인이 모두 성공하면 welcome 페이지로 이동합니다.
      navigate("/welcome");
      toast("success", "회원가입 및 로그인에 성공했습니다!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      toast("error", errorMessage);
      console.error("회원가입 실패:", error);
    }
  }

  return (
    <>
      <RegisterContainer>
        <h1>회원가입</h1>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="스탑무빙"
            value={values.nickname}
            onChange={handleChange}
          />
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            name="username"
            type="id" //id로 할지 text로 할지는 나중에 판단
            placeholder="아이디(이메일주소)"
            value={values.username}
            onChange={handleChange}
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password1"
            name="password1"
            type="password1"
            placeholder="비밀번호"
            value={values.password1}
            onChange={handleChange}
          />
          <Label htmlFor="password2">비밀번호 확인</Label>
          <Input
            id="password2"
            name="password2"
            type="password"
            placeholder="비밀번호 확인"
            value={values.password2}
            onChange={handleChange}
          />
          <Button>회원가입</Button>
          <HorizontalRule>또는</HorizontalRule>
        </StyledForm>
        <div style={{ textAlign: "center" }}>
          이미 회원이신가요? <Link to="/login">로그인하기</Link>
        </div>
      </RegisterContainer>
    </>
  );
}

export default RegisterPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px; /* form 내부 요소들 간의 간격 */
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  /* registerContainer의 자식들(h1, form)을 정렬 */
  display: flex;
  flex-direction: column;
  gap: 24px; /* 제목과 폼 사이의 간격 */
`;
