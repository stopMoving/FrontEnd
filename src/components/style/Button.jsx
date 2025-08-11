import styled from "styled-components";

const Button = styled.button`
  background-color: #6500c3;
  border: none;
  border-radius: ${({ round }) => (round ? `9999px` : `16px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 16px;
  margin: 16px;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:active {
    background-color: #7760b4;
  }
`;

export default Button;
