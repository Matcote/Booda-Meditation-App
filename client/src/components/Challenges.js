import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { GrAddCircle } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";

const Challenges = ({ challenges, _id, profile, setProfile, currentUser }) => {
  const challengeData = [
    {
      name: "September Daily Medi",
      src: "../assets/medal1.png",
      description: "Meditate every day for the month of September.",
    },
    {
      name: "2020 Consistency",
      src: "../assets/medal2.jpg",
      description: "Don't go 7 days in a row without meditating in 2020.",
    },
    {
      name: "September Half day",
      src: "../assets/medal3.png",
      description: "Meditate for 12 hours total in September.",
    },
  ];
  const [modal, setModal] = React.useState("none");
  const handleClick = (challenge) => {
    if (
      challenges.filter((element) => element.name === challenge.name).length ===
      0
    ) {
      fetch("/addChallenge", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          challenge: challenge,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let profileCopy = { ...profile };
          profileCopy.user.challenges.push(challenge);
          setProfile(profileCopy);
        });
    } else {
      fetch("/removeChallenge", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          challenge: challenge,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let profileCopy = { ...profile };
          profileCopy.user.challenges = profileCopy.user.challenges.filter(
            (element) => element.name !== challenge.name
          );
          setProfile(profileCopy);
        });
    }
  };

  return (
    <>
      <Wrapper>
        <h2>Current challenges</h2>
        {currentUser._id === profile.user._id && (
          <button onClick={() => setModal("flex")}>
            <GrAddCircle size={"2.3em"} />
          </button>
        )}
        <ChallengeBox>
          {challenges.map((challenge, index) => {
            return (
              <Tippy
                key={index}
                content={challenge.description}
                interactive={true}
                interactiveBorder={20}
                delay={100}
                className={"tippy-tooltip"}
              >
                <img src={challenge.src} alt={challenge.name} />
              </Tippy>
            );
          })}
        </ChallengeBox>
      </Wrapper>
      <Modal style={{ display: modal }}>
        <Div>
          <BiArrowBack
            onClick={() => setModal("none")}
            size={"2em"}
            style={{
              cursor: "pointer",
              marginRight: "90%",
            }}
          />
          <h3>Available challenges</h3>
          <ChallengeDiv>
            {challengeData.map((challenge, index) => {
              return (
                <div key={index}>
                  {challenges.filter(
                    (element) => element.name === challenge.name
                  ).length !== 0 && <span>✔</span>}
                  <Tippy
                    content={challenge.description}
                    interactive={true}
                    interactiveBorder={20}
                    delay={100}
                    className={"tippy-tooltip"}
                  >
                    <img
                      src={challenge.src}
                      alt={challenge.name}
                      onClick={() => handleClick(challenge)}
                    />
                  </Tippy>
                </div>
              );
            })}
          </ChallengeDiv>
        </Div>
      </Modal>
    </>
  );
};
const ChallengeDiv = styled.div`
  display: flex;
  .tippy-tooltip {
    background-color: white;
    width: 200px;
  }
  img {
    margin: 25px 10px;
    height: 50px;
    width: 50px;
    object-fit: contain;
    cursor: pointer;
  }
  div {
    position: relative;
  }
  span {
    position: absolute;
    top: 15px;
    right: 5px;
    background-color: #34ed50;
    color: white;
    border: 2px solid green;
    border-radius: 50%;
    font-size: large;
    padding: 3px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 20px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;
const ChallengeBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-height: 180px;
  .tippy-tooltip {
    background-color: white;
    width: 200px;
    min-height: 0px;
  }
  img {
    height: 60px;
    width: 60px;
    object-fit: contain;
    margin: 20px;
  }
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
`;
const Div = styled.div`
  width: 340px;
  height: 300px;
  background-color: #f9f8fc;
  opacity: 1;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Challenges;
