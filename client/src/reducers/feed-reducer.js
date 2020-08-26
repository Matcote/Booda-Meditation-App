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

    default: {
      return state;
    }
  }
}
