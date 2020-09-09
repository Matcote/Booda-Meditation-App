import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { requestFeed, receiveFeed, receiveFeedError } from "../actions";
import Spinner from "./Spinner";
import Post from "./Post";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

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
  // eslint-disable-next-line
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  let fetched = false;
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
    if (my >= 100 && fetched === false) {
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
      fetched = true;
    }
  });

  return (
    <Wrapper>
      <Header>Feed</Header>
      <PostDiv {...bind()} style={{ top: y }}>
        {posts === null ? (
          <Spinner />
        ) : (
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        )}
      </PostDiv>
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
  overflow: scroll;
`;
const PostDiv = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  padding: 12px 0;
  font-size: x-large;
  width: 90%;
  text-align: center;
  border-bottom: 2px solid #eee;
`;

export default Feed;
