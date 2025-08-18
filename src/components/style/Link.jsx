import React from "react";
import styled, { css } from "styled-components";
import { Link as BaseLink } from "react-router-dom";

const StyledLink = styled(BaseLink)`
  /* 기본 스타일 (appearance: 'primary') */
  text-decoration: none;
  color: #6f6f6f;
  font-weight: 600;

  ${(props) =>
    props.appearance === "secondary" &&
    css`
      text-decoration: underline;
      color: #767676;
      font-weight: 600;
    `}
`;

function Link({ appearance = "primary", ...rest }) {
  return <StyledLink appearance={appearance} {...rest} />;
}

export default Link;
