import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Achievements = ({ achievements }) => {
  const achievementData = [
    {
      _id: "welcome",
      how: "Finish your first session.",
      src: "../assets/welcome.png",
    },
    { _id: "tenSessions", how: "Meditate 10 times.", src: "../assets/10.png" },
    {
      _id: "dayInLife",
      how: "Meditate for 24 hours total.",
      src: "../assets/day.png",
    },
    {
      _id: "meditationRetreat",
      how: "Meditate for 100 hours total.",
      src: "../assets/vacation.png",
    },
    {
      _id: "buddha",
      how: "Meditate for 100000 minutes",
      src: "../assets/buddha.png",
    },
    { _id: "year", how: "Meditate 365 times.", src: "../assets/year.png" },
  ];
  return (
    <Wrapper>
      <h2>Achievements</h2>
      <Box>
        {achievementData.map((ach) => {
          return (
            <Tippy
              key={ach._id}
              content={ach.how}
              interactive={true}
              interactiveBorder={20}
              delay={100}
              className={"tippy-tooltip"}
            >
              <BoxItem>
                {achievements[ach._id] === false ? (
                  <img src={"../assets/question.png"} alt={ach._id} />
                ) : (
                  <img src={ach.src} alt={"???"} />
                )}
              </BoxItem>
            </Tippy>
          );
        })}
      </Box>
    </Wrapper>
  );
};
const BoxItem = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  background-color: #fec7d7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;
const Box = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .tippy-tooltip {
    background-color: #dbeef5;
    color: white;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 10px;
    font-size: larger;
  }
`;
export default Achievements;
