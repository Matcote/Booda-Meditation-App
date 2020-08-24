import React from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";

const Timer = () => {
  const [time, setTime] = React.useState(60);
  const [mediInterval, setMediInterval] = React.useState(null);
  const [length, setLength] = React.useState(time);
  const [color, setColor] = React.useState("grey");
  const [modal, setModal] = React.useState("none");
  const [initialSpot, setInitialSpot] = React.useState(null);
  const _id = useSelector((state) => state.user.user._id);
  const commentRef = React.createRef();
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setColor("#a786df");
    setLength(time);
    setMediInterval(
      setInterval(() => {
        setTime((c) => c - 1);
      }, 1000)
    );
  };

  const handleSubmit = () => {
    setModal("none");
    fetch("/meditate", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        meditation: { time: length, comment: commentRef.current.value },
      }),
    }).then(() => {
      //commentRef.current.value = "";
    });
  };
  const handleDragStart = (event) => {
    let dragImg = new Image(0, 0);
    dragImg.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    event.dataTransfer.setDragImage(dragImg, 0, 0);
    event.target.style.cursor = "pointer";
  };
  const onMouseMove = (event) => {
    if (initialSpot === null) {
      setInitialSpot(event.pageY);
    }
    if (event.pageY - initialSpot <= -10 && event.pageY !== 0) {
      setTime((c) => c + 60);
      setInitialSpot(event.pageY);
    } else if (event.pageY - initialSpot >= 10 && time > 60) {
      setTime((c) => c - 60);
      setInitialSpot(event.pageY);
    }
  };

  React.useEffect(() => {
    if (time === 0) {
      clearInterval(mediInterval);
      setTime(length);
      setColor("grey");
      setModal("flex");
    }
    // eslint-disable-next-line
  }, [time, mediInterval]);
  return (
    <>
      <Wrapper>
        <svg className="base-timer__svg" viewBox="0 0 100 100">
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            />
            <path
              style={{
                strokeDasharray: `${(length * 283 - time * 283) / length} 283`,
                stroke: color,
              }}
              id="base-timer-path-remaining"
              strokeDasharray="283"
              className="base-timer__path-remaining "
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <TimeLabel
          onDrag={onMouseMove}
          onDragStart={handleDragStart}
          draggable={"true"}
        >
          {formatTime(time)}
        </TimeLabel>
        <Button onClick={startTimer}>Start</Button>
      </Wrapper>
      <Modal style={{ display: modal }}>
        <div>
          <h3>Great job!</h3>
          <textarea
            ref={commentRef}
            placeholder="How was your session? What did you do well/struggle with?"
          ></textarea>
          <Pic>
            <BiImageAdd size={"2em"} />
          </Pic>
          <Submit onClick={handleSubmit}>Post</Submit>
        </div>
      </Modal>
    </>
  );
};
const Wrapper = styled.div`
  position: relative;
  height: 300px;
  width: 300px;
  .base-timer__circle {
    fill: none;
    stroke: none;
    .base-timer__path-elapsed {
      stroke-width: 7px;
      stroke: grey;
    }
  }
  .base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
  }
  .base-timer__svg {
    transform: scaleX(-1);
  }
`;
const TimeLabel = styled.span`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  cursor: grab;
  user-select: none;
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
const Modal = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  div {
    width: 340px;
    height: 300px;
    background-color: #f9f8fc;
    opacity: 1;
    border-radius: 8px;
    padding: 12px;
    textarea {
      margin: 8px 0;
      width: 100%;
      height: 130px;
      border: none;
      padding: 8px;
      outline: none;
      resize: none;
      border-radius: 6px;
    }
  }
`;
const Submit = styled.button`
  color: white;
  background-color: #a786df;
  border: none;
  width: 100px;
  height: 40px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: 10px;
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

const Pic = styled.button`
  width: 50px;
  height: 40px;
  background: none;
  outline: none;
  border: 0.5px solid grey;
  border-radius: 8px;
  padding-top: 4px;
  margin-top: 5px;
`;
export default Timer;
