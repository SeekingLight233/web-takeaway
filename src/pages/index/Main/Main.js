import React from "react";

import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addTodo } from "../actions/tabAction";
import BottomBar from "../BottomBar/BottomBar";
import Home from "../Home/Home";
import Loadable from "react-loadable";
import Loading from "./Loading";

const My = Loadable({
  loader: () => import(/* webpackChunkName: "my" */ "../My/My"),
  loading: Loading,
});

const Order = Loadable({
  loader: () => import(/* webpackChunkName: "order" */ "../Order/Order"),
  loading: Loading,
});
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route path="/home" component={Home}></Route>
        <Route path="/order" component={Order}></Route>
        <Route path="/my" component={My}></Route>
        <BottomBar></BottomBar>
      </div>
    );
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default withRouter(
  connect((state) => ({
    //注入属性
    num: state.tabReducer.num,
  }))(Main)
);
