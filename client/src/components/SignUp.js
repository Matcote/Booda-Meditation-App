import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logIn, logInError } from "../actions";
import { useHistory, Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const nameRef = React.createRef();
  const confirmPasswordRef = React.createRef();
  const [modal, setModal] = React.useState("none");
  const [errorMessage, setErrorMessage] = React.useState(null);

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
            setErrorMessage("Email address is already taken!");
            setModal("flex");
          }
        });
    } else {
      setErrorMessage("Passwords do not match!");
      setModal("flex");
    }
  };
  return (
    <>
      <Wrapper>
        <Header>Let's get started</Header>
        <Input>
          {" "}
          <input type="text" placeholder="Name" ref={nameRef} required />
        </Input>
        <Input>
          {" "}
          <input type="email" placeholder="Email" ref={emailRef} required />
        </Input>
        <Input>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Input>
        <Input>
          <input
            type="password"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            required
          />
        </Input>

        <Button onClick={handleSignUp}>Continue</Button>
      </Wrapper>
      <Modal style={{ display: modal }} onClick={() => setModal("none")}>
        <div>
          <IoIosWarning color={"#F65656"} size={"3em"} />
          <p>{errorMessage}</p>
          <div>Dismiss</div>
        </div>
      </Modal>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f8fc;
  height: 100%;
  width: 100%;
  padding: 15px 30px;
`;

const Button = styled.button`
  color: white;
  background-color: #a786df;
  border: none;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: large;
  text-decoration: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  outline: none;
  cursor: pointer;
`;
const Input = styled.div`
  width: 95%;
  margin: 10px 0;
  border-bottom: 3px solid #eee;
  input {
    border: none;
    width: auto;
    margin-left: 10px;
    font-size: large;
    padding: 8px;
    outline: none;
    background-color: inherit !important;
  }
`;
const Header = styled.div`
  margin-bottom: 130px;
  margin-top: 8px;
  font-size: large;
`;
const Modal = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  div {
    position: relative;
    width: 280px;
    height: 210px;
    background-color: #f9f8fc;
    opacity: 1;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    p {
      font-size: large;
      margin-top: 15px;
    }
    div {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 50px;
      background-color: #f65656;
      color: white;
      display: flex;
      justify-content: center;
      border-radius: 0px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      cursor: pointer;
    }
  }
`;

export default SignUp;
