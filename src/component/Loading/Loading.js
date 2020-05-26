import "./Loading.scss"

import React from "react"

/**
 * @description Loading组件
 */

class Loading extends React.Component {
  render() {
    let str = "加载中"
    if (this.props.isend) {
      //如果传过来的是true,显示完成
      str = "加载完成"
    }
    return <div className="loading">{str}</div>
  }
}

export default Loading
