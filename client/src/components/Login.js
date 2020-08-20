import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { startLogIn, logIn, logInError } from "../actions";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLogIn());
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          dispatch(logIn(data.data));
          history.push("/");
        } else {
          dispatch(logInError());
          window.alert(data.data);
        }
      });
  };

  return (
    <Wrapper>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          ref={emailRef}
          name="email"
          required
        />
        <label htmlFor="psw">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          ref={passwordRef}
          name="psw"
          required
        />
        <button type="submit">Log in</button>
      </form>

      <Button to="/signup">Sign up</Button>
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

const Button = styled(Link)`
  color: white;
  background-color: #a786df;
  width: 80px;
  height: 30px;
  text-decoration: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
