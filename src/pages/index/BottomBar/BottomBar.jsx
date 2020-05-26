/**
 * @constructor <BottomBar>
 * @description 底部tab按钮
 */
import "./BottomBar.scss"
import React from "react"
import { connect } from "react-redux"
// import { changeTab } from "../actions/tabAction"
import { NavLink, withRouter } from "react-router-dom"

class BottomBar extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTab(item) {
    this.props.history.replace(item.key)
    // this.props.dispatch(
    //   changeTab({
    //     activeKey: item.key,
    //   })
    // )
  }
  renderItems() {
    let { tabs, activeKey } = this.props
    return tabs.map((item, index) => {
      //动态class
      let cls = `${item.key} btn-item`
      let name = item.name
      return (
        <NavLink
          key={index}
          className={cls}
          replace={true}
          to={"/" + item.key}
          activeClassName="active"
          onClick={() => this.changeTab(item)}
        >
          <div className="tab-icon"></div>
          <div className="btn-name">{name}</div>
        </NavLink>
      )
    })
  }
  render() {
    return <div className="bottom-bar">{this.renderItems()}</div>
  }
}
//把整个store传给组件
export default withRouter(
  connect((state) => ({
    tabs: state.tabReducer.tabs,
    activeKey: state.tabReducer.activeKey,
  }))(BottomBar)
)
