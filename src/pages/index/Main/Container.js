//给main组件添加热更新
import React from "react";
import Main from "./Main";
import { hot } from "react-hot-loader";

class Container extends React.Component {
  render() {
    return <Main></Main>;
  }
}

export default hot(module)(Container);