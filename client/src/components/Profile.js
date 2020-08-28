import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Profile = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [profile, setProfile] = React.useState();
  React.useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  });
  let profileId = useParams()._id;
  React.useEffect(() => {
    if (profileId === undefined) {
      // eslint-disable-next-line
      profileId = user._id;
    }
    fetch(`/profile/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        //setPost(data.data);
        console.log(data);
        setProfile({ posts: data.posts, user: data.user });
      });
  }, []);
  return (
    <>
      <Banner>
        <span>Profile</span>
      </Banner>
      <Wrapper>
        <Avatar src={user.avatarSrc} alt={user.name} />
        <Name>{user.name}</Name>
        <Stats>
          <Stat>
            <h3>420</h3>
            <p>Mindful Minutes</p>
          </Stat>
          <Stat>
            <h3>69</h3>
            <p>Total Sessions</p>
          </Stat>
        </Stats>
        <canvas id="myChart" width="400" height="400"></canvas>
      </Wrapper>
      <Navbar />
    </>
  );
};
const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: x-large;
    margin-bottom: 4px;
  }
`;
const Stats = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Name = styled.p`
  position: absolute;
  top: 10px;
  left: 154px;
  font-size: x-large;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* position: sticky;
  top: 10px; */
  margin-top: -50px;
  margin-left: 40px;
`;
const Wrapper = styled.div`
  position: relative;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.5);

  top: 140px;
  background-color: #f9f8fc;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
  height: 100%;
`;
const Banner = styled.div`
  span {
    color: white;
    font-size: xx-large;
    margin-top: 12px;
  }
  display: flex;
  justify-content: center;
  position: absolute;
  height: 170px;
  width: 100%;
  background: linear-gradient(to right, #fec7d7, #a786df);
`;

export default Profile;
