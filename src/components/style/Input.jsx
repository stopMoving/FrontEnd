import styled from "styled-components";

const Input = styled.input`
  background-color: transparent;
  border: 1px solid #dedede;
  border-radius: 8px;
  display: block;
  font-size: 16px;
  outline: none;
  padding: 16px;
  width: 100%;

  &:focus {
    border-color: #7760b4;
    transition: border-color 0.1s ease-in-out;
  }

  &::placeholder {
    color: #949494;
  }
`;

export default Input;
