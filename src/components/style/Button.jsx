// Button.js

import styled from "styled-components";

const Button = styled.button`
  background-color: #11b55f;
  border: none;
  border-radius: ${({ round }) => (round ? `9999px` : `5px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 16px;

  width: 100%;
  margin: 16px 0 0 0;
  font-family: inherit;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0fa356;
  }

  &:active {
    background-color: #0e914c;
  }
`;

export default Button;
