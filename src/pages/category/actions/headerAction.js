import { CHANGE_TAB, GET_FILTER_DATA } from "./actionTypes"
import axios from "axios"

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj,
  })
}

export const getFilterData = (obj) => async (dispatch) => {
  let resp = await axios({
    method: 'get',
    url: '/json/filter.json',
  })
  //将数据结果dispatch出去
  dispatch({
    type: GET_FILTER_DATA,
    obj: resp.data
  })
}
