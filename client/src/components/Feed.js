import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { requestFeed, receiveFeed, receiveFeedError } from "../actions";
import Spinner from "./Spinner";
import Post from "./Post";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.feed.posts);
  React.useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else if (posts === null) {
      dispatch(requestFeed());
      fetch(`/feed/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            dispatch(receiveFeed(data.data));
          } else {
            dispatch(receiveFeedError());
          }
        });
    }
  });
  return (
    <Wrapper>
      <Header>Feed</Header>
      {posts === null ? (
        <Spinner />
      ) : (
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      )}
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
  padding: 12px 0;
  font-size: x-large;
  width: 90%;
  text-align: center;
  border-bottom: 2px solid #eee;
`;

export default Feed;
