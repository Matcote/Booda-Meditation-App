import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiUser, FiHome, FiClock } from "react-icons/fi";

const Navbar = () => {
  return (
    <Wrapper>
      <NavLink exact={true} to="/">
        <FiHome size={"2em"} />
      </NavLink>
      <NavLink to="/timer">
        <FiClock size={"2em"} />
      </NavLink>
      <NavLink exact={true} to="/profile">
        <FiUser size={"2em"} />
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  bottom: 0px;
  height: 75px;
  width: 100%;
  background-color: #a786df;
  color: #0e172c;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  a {
    padding: 8px;
    border-radius: 50%;
  }
  .active {
    color: white;
    background-color: #0e172c;
  }
`;

export default Navbar;
