/**
 * @constructor <BottomBar>
 * @description 底部tab按钮
 */

import React from "react"
import { connect } from "react-redux"

class BottomBar extends React.Component {
  constructor(props) {
    super(props)
  }
  renderItems() {
    let tabs = ["首页", "订单", "我的"]
    return tabs.map((item, index) => {
      return (
        <div key={index} className="btn-item">
          <div className="tab-icon"></div>
          <div className="btn-name">{item}</div>
        </div>
      )
    })
  }
  render() {
    return <div className="bottom-bar">{this.renderItems()}</div>
  }
}

export default connect((state) => ({}))(BottomBar)
