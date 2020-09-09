import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { startLogIn, logIn, logInError } from "../actions";
import { useHistory, Link } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const [modal, setModal] = React.useState("none");
  const [errorMessage, setErrorMessage] = React.useState(null);

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
          setErrorMessage(data.data);

          setModal("flex");
        }
      });
  };

  return (
    <>
      <Wrapper>
        <h1>Booda</h1>
        <Input>
          <FiUser size={"1.2em"} />
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            name="email"
            required
          />
        </Input>
        <Input>
          <FiLock size={"1.2em"} />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            name="psw"
            required
          />
        </Input>
        <Button onClick={handleLogin}>Sign in</Button>

        <Footer>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Footer>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f8fc;
  height: 100%;
  width: 100%;
  padding: 15px 30px;
  h1 {
    font-size: xx-large;
    font-weight: bold;
    margin: 70px 0 100px;
  }
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
const Footer = styled.div`
  margin-top: auto;
  margin-bottom: 15px;
  a {
    text-decoration: none;
  }
`;
const Input = styled.div`
  width: 100%;
  margin: 10px 0;
  border-bottom: 3px solid #eee;
  svg {
    margin: 0 5px;
  }
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

export default Login;
