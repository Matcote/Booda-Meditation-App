import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
from {
transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const Spinner = () => {
  return (
    <Wrapper id="spinner">
      <Spin size={"1.5em"} color={"#a786df"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 580px;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const Spin = styled(AiOutlineLoading3Quarters)`
  animation: ${spin} 800ms ease;
  animation-iteration-count: 4;
`;
export default Spinner;
