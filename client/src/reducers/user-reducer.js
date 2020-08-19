const initialState = {
  status: "idle",
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "": {
      return {
        ...state,
        status: "loading",
      };
    }

    default: {
      return state;
    }
  }
}
