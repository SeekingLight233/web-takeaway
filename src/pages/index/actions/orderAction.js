import { ORDER_DATA } from "./actionTypes"
import axios from "axios"

export const getOrderData = (page) => (dispatch) => {
  axios({
    method: "get",
    url: "/json/orders.json",
  }).then((res) => {
    console.log(res.data)
    dispatch({
      type: ORDER_DATA,
      currentPage: page,
      obj: res.data,
    })
  })
}
