// Button.js

import styled from "styled-components";

const Button = styled.button`
  background-color: #11b55f;
  border: none;
  border-radius: ${({ round }) => (round ? `9999px` : `5px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 16px;

  width: 100%;
  margin: 16px 0 0 0;

  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:active {
    background-color: #7760b4;
  }
`;

export default Button;
