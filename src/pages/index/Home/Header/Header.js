import "./Header.scss";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
/**
 * @description  首页顶部的banner
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <SearchBar></SearchBar>
        <img
          className="banner-img"
          src="https://app.nihaoshijie.com.cn/upload/bannertemp.e8a6fa63.jpg"
        ></img>
      </div>
    );
  }
}

export default Header;
