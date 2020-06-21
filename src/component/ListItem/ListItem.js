import "./ListItem.scss";
import React from "react";
import { connect } from "react-redux";
// import { getListData } from "../../actions/contentListAction"
import StarScore from "component/StarScore/StarScore";
/**
 * @description  列表单个组件
 */
class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  /**
   * @description 对品牌和新到标签进行条件渲染
   */
  renderBrand(data) {
    if (data.brand_type) {
      return <div className="brand brand-pin">品牌</div>;
    } else {
      return <div className="brand brand-xin">新店</div>;
    }
  }

  /**
   * @description 渲染月售数量
   * @param {*} data
   */
  renderMonthNum(data) {
    let num = data.month_sale_num;
    if (num > 999) {
      return "999+";
    }
    return num;
  }

  /**
   * @description 是否渲染美团专送
   * @param {*} data
   */
  renderMeiTuanFlag(data) {
    if (data.delivery_type) {
      return <div className="item-meituan-flag">美团专送</div>;
    }
    return null;
  }
  /**
   * @description 渲染商家活动
   * @param {*} data
   */
  renderOthers(data) {
    let array = data.discounts2;
    return array.map((item, index) => {
      return (
        <div key={"key" + index} className="other-info">
          <img src={item.icon_url} className="other-tag"></img>
          <div src="" className="other-content">
            {item.info}
          </div>
        </div>
      );
    });
  }
  render() {
    let data = this.props.itemData;
    return (
      <div className="r-item-content scale-1px">
        <img className="item-img" src={data.pic_url}></img>
        {this.renderBrand(data)}
        <div className="item-info-content">
          <p className="item-title">{data.name}</p>
          {/* 清除浮动，防止父元素坍塌 */}
          <div className="item-desc clearfix">
            <div className="item-score">
              <StarScore score={data.wm_poi_score}></StarScore>
            </div>
            <div className="item-count">月售{this.renderMonthNum(data)}</div>
            <div className="item-distance">&nbsp;{data.distance}</div>
            <div className="item-time">{data.mt_delivery_time}&nbsp;|</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price">{data.min_price_tip}</div>
            {this.renderMeiTuanFlag(data)}
          </div>
          <div className="item-others">{this.renderOthers(data)}</div>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({
  //   list: state.contentListReducer.items,
}))(ListItem);
