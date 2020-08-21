import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiUser, FiHome, FiClock } from "react-icons/fi";

const Navbar = () => {
  return (
    <Wrapper>
      <NavLink to="/">
        <FiHome size={"2em"} />
      </NavLink>
      <NavLink to="/timer">
        <FiClock size={"2em"} />
      </NavLink>
      <NavLink to="/profile">
        <FiUser size={"2em"} />
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  bottom: 100px;
  height: 80px;
  width: 390px;
  background-color: #a786df;
  color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Navbar;
