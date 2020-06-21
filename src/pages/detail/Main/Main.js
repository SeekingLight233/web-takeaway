import "./Main.scss";
import React from "react";
import { connect } from "react-redux";
import NavHeader from "component/NavHeader/NavHeader";
import { Route, withRouter, NavLink } from "react-router-dom";

import Menu from "../Menu/Menu";
import Comment from "../Comment/Comment";
import Restanurant from "../Restanurant/Restanurant";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  // changeTab() {}

  renderTabs() {
    let tabs = this.props.tabs;
    return tabs.map((item) => {
      return (
        <NavLink
          className="tab-item"
          key={item.key}
          to={"/" + item.key}
          replace={true}
          activeClassName="active" //激活状态下的classname
          // onClick={() => this.changeTab(item)}
        >
          {item.name}
        </NavLink>
      );
    });
  }

  render() {
    return (
      <div className="detail">
        <NavHeader title="金拱门"></NavHeader>
        <div className="tab-bar">{this.renderTabs()}</div>
        <Route path="/menu" component={Menu}></Route>
        <Route path="/comment" component={Comment}></Route>
        <Route path="/restanurant" component={Restanurant}></Route>
        {/* 显示购物车上的遮罩层 */}
        {this.props.showChooseContent ? <div className="mask"></div> : null}
      </div>
    );
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default withRouter(
  connect((state) => ({
    tabs: state.tabReducer.tabs,
    showChooseContent: state.menuReducer.showChooseContent,
  }))(Main)
);
