import { combineReducers } from "redux";
import notes from "./note_reducer";
import user from "./user_reducer";

const rootReducer = combineReducers({
  notes,
  user
});

export default rootReducer;
