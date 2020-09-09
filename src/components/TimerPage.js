import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Timer from "./Timer";

const TimerPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  });
  return (
    <Wrapper>
      <Header>Timer</Header>
      <Timer />
      <Navbar />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  background-color: #f9f8fc;
`;
const Header = styled.div`
  margin-bottom: 100px;
  padding: 12px 0;
  font-size: x-large;
  width: 90%;
  text-align: center;
  border-bottom: 2px solid #eee;
`;

export default TimerPage;
