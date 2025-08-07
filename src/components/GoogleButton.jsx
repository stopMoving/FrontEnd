import styled from "styled-components";
import Button from "./Button";
import GoogleIcon from "../assets/icons/google.svg";

const Icon = styled.img`
  height: 28px;
  width: 28px;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  ${Icon} {
    margin-right: 12px;
  }

  &:hover {
    background-color: #f7f7f7;
    border: 1px solid #d6d6d6;
  }
  &:active {
    background-color: #eeeeee;
  }
`;

function GoogleButton({ className, onClick }) {
  return (
    <StyledButton className={className} onClick={onClick}>
      <Icon src={GoogleIcon} alt="Google icon" />
      <span>구글 로그인</span>
    </StyledButton>
  );
}

export default GoogleButton;
