// const initialState = {
//   status: "idle",
//   user: null,
// };
const initialState = {
  status: "idle",
  user: {
    _id: "matthewcotesipod@gmail.com",
    name: "Matthew Cote",
    email: "matthewcotesipod@gmail.com",
    password: "ironman",
    avatarSrc:
      "https://ca.slack-edge.com/T045DMA9Q-U01446KGT4L-23932335e5b2-512",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "START_LOG_IN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "LOG_IN": {
      return {
        ...state,
        status: "idle",
        user: action.user,
      };
    }
    case "LOG_IN_ERROR": {
      return {
        ...state,
        status: "LOGIN ERROR",
      };
    }

    default: {
      return state;
    }
  }
}
