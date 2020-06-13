import React from "react"
import "./Header.scss"
import { connect } from "react-redux"
import { changeTab } from "../actions/headerAction"

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTab(key) {
    this.props.dispatch(
      changeTab({
        activeKey: key,
      })
    )
  }
  /**
   * 渲染顶部tab栏
   */
  renderTabs() {
    let tabs = this.props.tabs
    let array = []
    for (let key in tabs) {
      let item = tabs[key]
      let cls = item.key + " item"
      if (item.key === this.props.activeKey) {
        cls += " current"
      }
      array.push(
        <div
          className={cls}
          key={item.key}
          onClick={() => {
            this.changeTab(item.key)
          }}
        >
          {item.text}
        </div>
      )
    }
    return array
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">{this.renderTabs()}</div>
      </div>
    )
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  //注入属性
  tabs: state.headerReducer.tabs,
  activeKey: state.headerReducer.activeKey,
}))(Header)
