import React from "react";
import Header from "./Header/Header";
/**
 * @description 首页tab
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header></Header>
      </div>
    );
  }
}

export default Home;
