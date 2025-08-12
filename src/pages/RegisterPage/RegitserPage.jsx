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
import codeitLogo from "../../assets/icons/codeit.png";

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
        <StyledForm onSubmit={handleSubmit}>
          <Logo src={codeitLogo} alt="codeit" />
          <Label>
            <GreenText>북작북작</GreenText> 회원가입
          </Label>

          {/* 각 입력 필드를 div로 그룹화 */}
          <div>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임"
              value={values.nickname}
              onChange={handleChange}
            />
            <ValidationText>
              • 닉네임은 2~10자 이하의 한글과 영문 대/소문자만 사용 가능합니다.
            </ValidationText>
          </div>

          <div>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="아이디"
              value={values.username}
              onChange={handleChange}
            />
            <ValidationText>
              • 아이디는 5~20자의 영문 소문자와 숫자만 사용 가능합니다.
            </ValidationText>
          </div>

          <div>
            <Input
              id="password1"
              name="password1"
              type="password"
              placeholder="비밀번호"
              value={values.password1}
              onChange={handleChange}
            />
            <ValidationText>
              • 비밀번호는 8~16자 이하의 영문 대/소문자와 숫자만 사용
              가능합니다.
            </ValidationText>
          </div>

          <div>
            <Input
              id="password2"
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
              value={values.password2}
              onChange={handleChange}
            />
          </div>

          <Button>회원가입</Button>

          <HorizontalRule>또는</HorizontalRule>
          <div style={{ textAlign: "center" }}>
            이미 회원이신가요? <Link to="/login">로그인하기</Link>
          </div>
        </StyledForm>
      </RegisterContainer>
    </>
  );
}

export default RegisterPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;
  padding: 20px; /* 패딩을 Form으로 이동 */
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  overflow-y: auto; /* 내용이 길어지면 세로 스크롤 생성 */
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 60px 20px 20px 20px;
  text-align: center;

  /* registerContainer의 자식들(h1, form)을 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* gap: 24px; */
`;

const Logo = styled.img`
  display: block;
  width: 50%;
  max-width: 200px;
  margin: 0 auto 16px;
`;

const GreenText = styled.span`
  color: #11b55f;
`;

// RegisterPage.js 하단에 추가

const ValidationText = styled.p`
  color: #7b7b7b;
  font-size: 12px;
  margin: 4px 0 4px 4px; /* 인풋창과의 간격 및 정렬을 위한 여백 */
  padding: 0;
`;

// const ButtonContainer = styled.div`
//   padding: 20px;
//   background-color: white;
// `;
