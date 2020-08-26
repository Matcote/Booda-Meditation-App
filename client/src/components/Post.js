import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

const Post = ({ post }) => {
  const handleLike = () => {};
  const handleComment = () => {};
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
        {post.imgSrc !== null && (
          <img src={post.imgSrc} alt="meditation spot" />
        )}
      </Content>
      <Footer>
        <FiThumbsUp size={"1.5em"} onClick={handleLike} />
        <FiMessageSquare size={"1.5em"} onClick={handleComment} />
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
    height: 150px;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 10px;
  }
`;
const Footer = styled.div`
  border-top: 2px solid #eee;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  svg {
    cursor: pointer;
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
