import { combineReducers } from "redux";
import authReducer from "./authReducer";

const reducers = combineReducers({
  auth:authReducer,
  // assignments: assignmentReducer÷
});

export default reducers;
