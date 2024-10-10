import { combineReducers } from "redux";
import auth from './auth'
import profile from './profile'
import vet from './vet'
import time from './time'
import org from './org'

export default combineReducers({
    auth,
    profile,
    vet,
    time,
    org
});