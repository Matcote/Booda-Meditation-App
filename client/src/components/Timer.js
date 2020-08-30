import React from "react";
import styled from "styled-components";
import { BiImageAdd, BiArrowBack } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
const bellAudio = new Audio("../assets/bell.wav");
const intervalAudio = new Audio("../assets/interval.mp3");

const Timer = () => {
  const [time, setTime] = React.useState(60);
  const [settingsModal, setSettingsModal] = React.useState("none");
  const [mediInterval, setMediInterval] = React.useState(null);
  const [intervalBell, setIntervalBell] = React.useState(false);
  const [length, setLength] = React.useState(time);
  const [color, setColor] = React.useState("grey");
  const [modal, setModal] = React.useState("none");
  const [initialSpot, setInitialSpot] = React.useState(null);
  const currentUser = useSelector((state) => state.user.user);
  const [comment, setComment] = React.useState("");
  const [endBell, setEndBell] = React.useState(true);
  const [disableButton, setDisableButton] = React.useState(false);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };
  const startTimer = () => {
    setDisableButton(!disableButton);
    bellAudio.play();
    setColor("#a786df");
    setLength(time);
    setMediInterval(
      setInterval(() => {
        setTime((c) => c - 1);
      }, 1000)
    );
  };

  const handleSubmit = () => {
    const date = new Date();
    setModal("none");
    fetch("/meditate", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: currentUser._id,
        meditation: {
          time: length,
          comment: comment,
          date: date,
          user: currentUser._id,
          name: currentUser.name,
          likes: [],
          comments: [],
          avatarSrc: currentUser.avatarSrc,
        },
      }),
    }).then(() => {
      setComment("");
      setDisableButton(!disableButton);
    });
  };
  const handleDragStart = (event) => {
    let dragImg = new Image(0, 0);
    dragImg.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    event.dataTransfer.setDragImage(dragImg, 0, 0);
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
      if (endBell === true) {
        bellAudio.play();
      }
      clearInterval(mediInterval);
      setTime(length);
      setColor("grey");
      setModal("flex");
    }
    if (time === length / 2) {
      if (intervalBell === true) {
        intervalAudio.play();
      }
    }
    // eslint-disable-next-line
  }, [time, mediInterval]);
  return (
    <>
      <Settings onClick={() => setSettingsModal("flex")}>
        <FiSettings size={"2.6em"} />
      </Settings>
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
        <Button onClick={startTimer} disabled={disableButton}>
          Start
        </Button>
      </Wrapper>
      <Modal style={{ display: modal }}>
        <div>
          <h3>Great job!</h3>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="How was your session? What did you do well/struggle with?"
          ></textarea>
          <Pic>
            <BiImageAdd size={"2em"} />
          </Pic>
          <Submit onClick={handleSubmit}>Post</Submit>
        </div>
      </Modal>
      <Modal style={{ display: settingsModal }}>
        <div>
          <BiArrowBack
            onClick={() => setSettingsModal("none")}
            size={"2em"}
            style={{
              cursor: "pointer",
              marginRight: "90%",
              marginBottom: "20px",
            }}
          />
          <Setting>Bell upon finishing</Setting>
          <label className="switch">
            <input
              type="checkbox"
              checked={endBell}
              onChange={() => setEndBell(!endBell)}
            />
            <span className="slider round"></span>
          </label>
          <Setting>Interval halfway</Setting>
          <label className="switch">
            <input
              type="checkbox"
              checked={intervalBell}
              onChange={() => setIntervalBell(!intervalBell)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </Modal>
    </>
  );
};
const Settings = styled.button`
  position: absolute;
  top: 80px;
  right: 45px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: #0e172c;
`;
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
const Setting = styled.p`
  display: inline-block;
  width: 80%;
  margin-bottom: 30px;
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
    label {
      margin-left: auto;
    }
    textarea {
      margin: 8px 0;
      width: 100%;
      height: 130px;
      border: none;
      padding: 8px;
      outline: none;
      resize: none;
      border-radius: 6px;
      border: solid 2px #eee;
    }
    .switch {
      position: absolute;
      right: 40px;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    input:checked + .slider {
      background-color: #2196f3;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    .slider.round {
      border-radius: 34px;
    }
    .slider.round:before {
      border-radius: 50%;
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
