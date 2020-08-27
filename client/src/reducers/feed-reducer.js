const initialState = {
  status: "idle",
  posts: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_FEED": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_FEED": {
      return {
        ...state,
        status: "idle",
        posts: action.posts,
      };
    }
    case "RECEIVE_FEED_ERROR": {
      return {
        ...state,
        status: "FEED ERROR",
      };
    }
    case "LIKE_POST": {
      let newPosts = [...state.posts];
      let _id = action._id;
      let like = action.like;
      newPosts[newPosts.findIndex((obj) => obj._id === _id)].likes.push(like);
      return {
        ...state,
        status: "idle",
        posts: newPosts,
      };
    }
    case "UNLIKE_POST": {
      let newPosts = [...state.posts];
      let _id = action._id;
      let like = action.like;
      newPosts[newPosts.findIndex((obj) => obj._id === _id)].likes.splice(
        newPosts[newPosts.findIndex((obj) => obj._id === _id)].likes.findIndex(
          (obj) => obj === like
        )
      );

      return {
        ...state,
        status: "idle",
        posts: newPosts,
      };
    }
    case "COMMENT_ON_POST": {
      let newPosts = [...state.posts];
      let _id = action._id;
      let comment = action.comment;
      newPosts[newPosts.findIndex((obj) => obj._id === _id)].comments.push(
        comment
      );
      return {
        ...state,
        status: "idle",
        posts: newPosts,
      };
    }

    default: {
      return state;
    }
  }
}
