import React from "react";
import styled, { css } from "styled-components";
import { Link as BaseLink } from "react-router-dom";

// 1. 스타일 정의: Link 컴포넌트에 적용될 스타일을 정의합니다.
// BaseLink(react-router-dom의 Link)를 기반으로 스타일을 만듭니다.
const StyledLink = styled(BaseLink)`
  /* 기본 스타일 (appearance: 'primary') */
  text-decoration: none;
  color: #5d00c0;

  /* 'appearance' prop 값에 따라 스타일을 동적으로 적용합니다. */
  ${(props) =>
    props.appearance === "secondary" &&
    css`
      text-decoration: underline;
      color: #767676;
      font-weight: 400;
    `}
`;

// 2. 리액트 컴포넌트: props를 StyledLink로 전달하는 역할만 합니다.
function Link({ appearance = "primary", ...rest }) {
  // className, children, to 등 나머지 props는 '...rest'를 통해
  // StyledLink에 그대로 전달됩니다.
  return <StyledLink appearance={appearance} {...rest} />;
}

export default Link;
