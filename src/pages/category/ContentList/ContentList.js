import "./ContentList.scss";
import React from "react";
import { connect } from "react-redux";
import { getListData } from "../actions/contentListAction";

import ScrollView from "component/ScrollView/ScrollView";

import ListItem from "component/ListItem/ListItem";
/**
 * @description  附近商家
 */
class ContentList extends React.Component {
  constructor(props) {
    super(props);
    ///请求第一屏数据
    this.page = 0;
    this.fetchData(this.page);
    this.state = {
      isend: false, //页面是否允许滚动
    };
  }
  fetchData(page) {
    this.props.dispatch(getListData(page));
  }
  /**
   * @description 滚动加载
   */
  onLoadPage = () => {
    this.page++;
    if (this.page > 3) {
      //加载超过三页不请求数据
      this.setState({ isend: true });
    } else {
      this.fetchData(this.page);
    }
  };

  renderItems() {
    let { list } = this.props;
    return list.map((item, index) => {
      // 将每一个item上的数据通过组件传递进去
      return <ListItem key={index} itemData={item}></ListItem>;
    });
  }

  render() {
    return (
      <div className="list-content">
        <ScrollView loadCallback={this.onLoadPage} isend={this.state.isend}>
          {this.renderItems()}
        </ScrollView>
      </div>
    );
  }
}
export default connect((state) => ({
  list: state.contentListReducer.items,
}))(ContentList);
