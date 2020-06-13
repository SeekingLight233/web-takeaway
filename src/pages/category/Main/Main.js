import React from "react"

import { connect } from "react-redux"

import NavHeader from "component/NavHeader/NavHeader"
import Header from "../Header/Header"
class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="category">
        分类页面
        <NavHeader title="分类"></NavHeader>
        <Header></Header>
      </div>
    )
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  //注入属性
}))(Main)
