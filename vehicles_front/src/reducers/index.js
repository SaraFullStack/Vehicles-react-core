import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import vehicles from "./vehicles";

export default combineReducers({ vehicles, form });
