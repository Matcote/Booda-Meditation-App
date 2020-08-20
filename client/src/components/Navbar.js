import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Wrapper>
      <NavLink to="/"></NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  bottom: 100px;
  height: 100px;
  width: 390px;
  background-color: red;
  color: white;
  overflow: hidden;
`;

export default Navbar;
