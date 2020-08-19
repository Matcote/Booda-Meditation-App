import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Wrapper>
      <label htmlFor="email">Email</label>
      <input type="text" placeholder="Enter email" name="email" required />

      <label htmlFor="psw">Password</label>
      <input type="password" placeholder="Enter password" name="psw" required />

      <button type="submit">Login</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d9d4e7;

  height: 100%;
  width: 100%;
`;

export default Login;
