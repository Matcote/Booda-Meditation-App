export const startLogIn = () => ({
  type: "START_LOG_IN",
});
export const logIn = (user) => ({
  type: "LOG_IN",
  user,
});
export const logInError = () => ({
  type: "LOG_IN_ERROR",
});

export const requestFeed = () => ({
  type: "REQUEST_FEED",
});
export const receiveFeed = (posts) => ({
  type: "RECEIVE_FEED",
  posts,
});
export const receiveFeedError = () => ({
  type: "RECEIVE_FEED_ERROR",
});
export const likePost = (_id, like) => ({
  type: "LIKE_POST",
  _id,
  like,
});
export const unlikePost = (_id, like) => ({
  type: "UNLIKE_POST",
  _id,
  like,
});
export const commentOnPost = (_id, comment) => ({
  type: "COMMENT_ON_POST",
  _id,
  comment,
});
