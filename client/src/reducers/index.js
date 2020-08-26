import { combineReducers } from "redux";

import user from "./user-reducer";
import feed from "./feed-reducer";

export default combineReducers({ user, feed });
