/**
 * @constructor <BottomBar>
 * @description 底部tab按钮
 */
import "./BottomBar.scss";
import React from "react";
import { connect } from "react-redux";
import { changeTab } from "../actions/tabAction";
class BottomBar extends React.Component {
  constructor(props) {
    super(props);
  }

  changeTab(item) {
    this.props.dispatch(
      changeTab({
        activeKey: item.key,
      })
    );
  }
  renderItems() {
    let { tabs, activeKey } = this.props;
    return tabs.map((item, index) => {
      //动态class
      let cls = `${item.key} btn-item`;
      let name = item.name;
      if (item.key === activeKey) {
        //被点击的状态
        cls += " active";
      }
      return (
        <div key={index} className={cls} onClick={() => this.changeTab(item)}>
          <div className="tab-icon"></div>
          <div className="btn-name">{name}</div>
        </div>
      );
    });
  }
  render() {
    return <div className="bottom-bar">{this.renderItems()}</div>;
  }
}
//把整个store传给组件
export default connect((state) => ({
  tabs: state.tabReducer.tabs,
  activeKey: state.tabReducer.activeKey,
}))(BottomBar);
