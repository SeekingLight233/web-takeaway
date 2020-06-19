import "./Main.scss";
import React from "react";
import { connect } from "react-redux";
import NavHeader from "component/NavHeader/NavHeader";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabs() {
    let tabs = this.props.tabs;
    return tabs.map((item) => {
      return (
        <div className="tab-item" key={item.key}>
          {item.name}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="detail">
        <NavHeader title="香飘飘面馆"></NavHeader>
        <div className="tab-bar">{this.renderTabs()}</div>
        {2333}
      </div>
    );
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  tabs: state.tabReducer.tabs,
}))(Main);
