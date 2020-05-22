/**
 * @description 创建并返回action
 */
import { ADD_TODO } from "./actionTypes"

export const addTodo = (obj) => {
  return {
    type: ADD_TODO,
    obj: obj, //给action的参数
  }
}
