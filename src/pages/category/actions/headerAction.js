import { CHANGE_TAB } from "./actionTypes"
import axios from "axios"

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj,
  })
}
