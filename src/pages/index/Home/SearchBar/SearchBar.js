import "./SearchBar.scss";
import React from "react";
/**
 * @description  首页顶部的搜索框
 */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-bar">
        <div className="bar-location">
          <div className="location-icon"></div>
          <div className="location-text">南阳市</div>
        </div>
        <div className="search-btn">
          <p className="place-holder">邓州窝子面</p>
        </div>
      </div>
    );
  }
}

export default SearchBar;
