import React from "react";

import Main from "./Main.js";

import { hot } from "react-hot-loader";

class Container extends React.Component {
  render() {
    return <Main />;
  }
}

export default hot(module)(Container);
