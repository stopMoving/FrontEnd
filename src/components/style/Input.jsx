import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #eeeeee;
  display: block;
  font-size: 16px;
  outline: none;
  padding: 8px 0;
  width: 100%;

  &:focus {
    border-bottom: 2px solid #7760b4;
    transition: 0.1s ease-in-out;
  }

  &::placeholder {
    color: #c4c5cd;
  }
`;

export default Input;
