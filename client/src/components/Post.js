import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions";
import { useHistory } from "react-router-dom";

const Post = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  const handleLike = () => {
    const likeData = {
      _id: currentUser._id,
      name: currentUser.name,
    };
    if (
      post.likes.some((obj) => {
        return obj._id === currentUser._id;
      })
    ) {
      fetch("/unlike", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post._id,
          like: likeData,
        }),
      }).then(() => {
        dispatch(unlikePost(post._id, likeData));
      });
    } else {
      fetch("/like", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post._id,
          like: {
            _id: currentUser._id,
            name: currentUser.name,
          },
        }),
      }).then(() => {
        dispatch(likePost(post._id, likeData));
      });
    }
  };

  const handleComment = () => {
    history.push(`/comment/${post._id}`);
  };
  return (
    <Wrapper>
      <Header>
        <Avatar src={post.avatarSrc}></Avatar>
        <h3>{post.name}</h3>
        <p>{moment(post.date).calendar()}</p>
        <span>
          <img
            src="https://static.thenounproject.com/png/2776601-200.png"
            alt="meditator"
          />
          {post.time / 60} mins
        </span>
      </Header>
      <Content>
        <p>{post.comment}</p>
        {post.imgSrc !== undefined && (
          <img src={post.imgSrc} alt="meditation spot" />
        )}
        {post.comments.length > 0 && <div></div>}
      </Content>
      <Footer>
        <div>
          <FiThumbsUp
            size={"1.5em"}
            onClick={handleLike}
            className={
              post.likes.some((obj) => {
                return obj._id === currentUser._id;
              }) && "active"
            }
          />
          <span className={post.likes.length === 0 ? "hidden" : undefined}>
            {post.likes.length}
          </span>
        </div>
        <div>
          <FiMessageSquare size={"1.5em"} onClick={handleComment} />
          <span className={post.comments.length === 0 && "hidden"}>
            {post.comments.length}
          </span>
        </div>
      </Footer>
    </Wrapper>
  );
};

const Content = styled.div`
  padding: 0 10px;
  p {
    margin-bottom: 10px;
    margin-left: 3px;
  }
  img {
    height: 170px;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 10px;
  }
`;
const Footer = styled.div`
  border-top: 1px solid #eee;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #d9d4e7;
  position: relative;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    span {
      margin-left: 8px;
      &.hidden {
        visibility: hidden;
      }
    }
    svg {
      cursor: pointer;
      &.active {
        color: white;
        fill: #a786df;
        stroke-width: 1.5;
      }
    }
  }
`;
const Wrapper = styled.div`
  width: 97%;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  margin: 4px 0;
  background-color: white;
`;
const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const Header = styled.div`
  margin: 10px;
  height: 40px;
  display: flex;
  position: relative;
  h3 {
    vertical-align: top;
    display: inline-block;
  }
  p {
    font-size: small;
    color: grey;
    position: absolute;
    top: 22px;
    left: 50px;
  }
  span {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 3px;
    img {
      height: 24px;
      width: 24px;
      margin-right: 3px;
    }
  }
`;

export default Post;
