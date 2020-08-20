import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logIn, logInError } from "../actions";
import { useHistory, Link } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const nameRef = React.createRef();
  const confirmPasswordRef = React.createRef();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      fetch("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: emailRef.current.value,
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 201) {
            dispatch(logIn(data.data));
            history.push("/");
          } else {
            dispatch(logInError());
            window.alert("Email is already used!!");
          }
        });
    } else {
      window.alert("passwords do not match!");
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Name" ref={nameRef} required />
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          ref={confirmPasswordRef}
          required
        />
        <button type="submit">Continue</button>
      </form>
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

export default SignUp;
