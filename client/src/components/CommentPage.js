import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiMessageAdd } from "react-icons/bi";

const CommentPage = () => {
  const { postId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  React.useEffect(() => {
    fetch(`/post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data);
      });
  }, [postId]);
  const handleComment = () => {
    if (comment.length > 0) {
      let commentData = {
        name: currentUser.name,
        message: comment,
        date: new Date(),
        avatarSrc: currentUser.avatarSrc,
      };
      fetch("/comment", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post._id,
          comment: commentData,
        }),
      }).then(() => {
        let post2 = { ...post };
        post2.comments.push(commentData);
        setPost(post2);
        setComment("");
      });
    }
  };
  return (
    <Main>
      <MainHeader>
        <Link to="/">
          <IoMdArrowRoundBack size={"1.4em"} />
        </Link>
        Discussion
      </MainHeader>
      {post === null ? (
        <Spinner />
      ) : (
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
            {post.comments.length > 0 &&
              post.comments.map((comment, index) => {
                return (
                  <Comment key={index}>
                    <img src={comment.avatarSrc} alt={comment.name} />
                    <div>
                      <h3>
                        {comment.name}
                        <span> • {moment(comment.date).calendar()}</span>
                      </h3>
                      <p>{comment.message}</p>
                    </div>
                  </Comment>
                );
              })}
          </Content>
          <Footer>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Anything to say?"
            />
            <button
              onClick={handleComment}
              className={comment.length === 0 ? "disabled" : undefined}
            >
              <BiMessageAdd size={"2em"} />
            </button>
          </Footer>
        </Wrapper>
      )}
      <Navbar />
    </Main>
  );
};
const Comment = styled.div`
  border-top: 1px solid #eee;
  padding: 4px;
  position: relative;
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  h3 {
    span {
      font-size: small;
      color: grey;
    }
  }
  p {
    font-size: 15px;
    color: grey;
    margin-left: 0 !important;
    margin-top: 4px;
    min-width: 200px;
  }
  img {
    height: 40px !important;
    width: 40px !important;
    border-radius: 50% !important;
    object-fit: cover !important;
    margin-right: 10px !important;
    margin-bottom: 0 !important;
    display: inline-block !important;
    border: 2px solid #d9d4e7;
  }
`;
const MainHeader = styled.div`
  padding: 12px 0;
  font-size: x-large;
  width: 90%;
  text-align: center;
  border-bottom: 2px solid #eee;
  a {
    position: absolute;
    left: 12px;
    top: 8px;
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  background-color: #f9f8fc;
`;
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
  display: flex;
  align-items: center;
  background-color: #d9d4e7;
  padding: 8px;
  textarea {
    font-size: small;
    width: 80%;
    height: 50px;
    border: none;
    padding: 8px;
    outline: none;
    resize: none;
    border-radius: 6px;
  }
  button {
    color: white;
    background-color: #a786df;
    border: none;
    width: 15%;
    height: 45px;
    margin-left: 6px;
    font-size: large;
    text-decoration: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
    outline: none;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  margin: 4px 0;
  background-color: white;
  overflow: scroll;
  scroll-behavior: smooth;
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

export default CommentPage;
