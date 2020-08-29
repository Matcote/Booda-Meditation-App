// const initialState = {
//   status: "idle",
//   user: null,
// };
const initialState = {
  status: "idle",
  user: {
    _id: "test@test.com",
    name: "Matthew Cote",
    email: "test@test.com",
    password: "ironman",
    follows: [
      "test@test.com",
      "test1@test.com",
      "test2@test.com",
      "test3@test.com",
      "test4@test.com",
    ],
    avatarSrc:
      "https://ca.slack-edge.com/T045DMA9Q-U01446KGT4L-23932335e5b2-512",
    totalMinutes: 100,
    totalSessions: 10,
    achievements: [],
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
