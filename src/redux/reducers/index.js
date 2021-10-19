import { combineReducers } from "redux";
import component from "./component";
import interact from "./interact";
import koodle from './koodle'
const reducers = combineReducers({
  component,
  interact,
  koodle,
});

export default reducers;
