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
    name: "",
    id: "",
    password: "",
    passwordRepeat: "",
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

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { name, id, password } = values;
      // ✅ 스토어의 register 함수를 호출합니다.
      // 이 함수는 내부적으로 로그인까지 처리합니다.
      await register({ name, id, password });
      navigate("/welcome"); // 회원가입 및 로그인 성공 시 이동
    } catch (error) {
      console.log("회원가입에 실패했습니다.");
    }
  }

  return (
    <>
      <RegisterContainer>
        <h1>회원가입</h1>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="name">닉네임</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="스탑무빙"
            value={values.name}
            onChange={handleChange}
          />
          <Label htmlFor="email">아이디</Label>
          <Input
            id="id"
            name="id"
            type="id"
            placeholder="아이디(이메일주소)"
            value={values.id}
            onChange={handleChange}
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <Label htmlFor="passwordRepeat">비밀번호 확인</Label>
          <Input
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            placeholder="비밀번호 확인"
            value={values.passwordRepeat}
            onChange={handleChange}
          />
          <Button>회원가입</Button>
          <HorizontalRule>또는</HorizontalRule>
        </StyledForm>
        <div>
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
