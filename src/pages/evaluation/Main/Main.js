import "component/common.scss";
import "./Main.scss";
import React from "react";
import NavHeader from "component/NavHeader/NavHeader.js";

class Main extends React.Component {
  constructor(props) {
    super(props);

    // 最多还能输入多少个字符
    this.maxCount = 140;

    this.state = {
      // 还剩多少字符可输入
      count: this.maxCount,
      // 用户点击的星星下标值
      startIndex: 0,
    };
  }
  componentDidMount() {
    //为textarea监听一下拼写缓冲区
    this.commentInput.addEventListener("compositionstart", () => {
      this.chineseInputing = true;
    });
    this.commentInput.addEventListener("compositionend", (e) => {
      this.chineseInputing = false;
      this.onIuput(e.target.value);
    });
  }
  /**
   * 用户输入回调，动态更改剩余字符数
   */
  onIuput(value) {
    let num = value.length; //取出当前输入的字符
    if (!this.chineseInputing) {
      //拼写监听
      this.setState({
        count: this.maxCount - num,
      });
    }
  }
  /**
   * 点击哪个就把索引设置为哪个
   */
  doEva(i) {
    this.setState({
      startIndex: i + 1,
    });
  }
  /**
   * 渲染评分用的星
   */
  renderStar() {
    let array = [];
    for (let i = 0; i < 5; i++) {
      //如果当前星星的索引在被点击星星的左边，就设置为暗色，否则设置为亮色
      let cls = i >= this.state.startIndex ? "star-item" : "star-item light";
      array.push(
        <div onClick={() => this.doEva(i)} key={i} className={cls}></div>
      );
    }

    return array;
  }
  render() {
    return (
      <div className="content">
        <NavHeader title="评价" />
        <div className="eva-content">
          <div className="star-area">{this.renderStar()}</div>
          <div className="comment">
            <textarea
              ref={(ref) => {
                this.commentInput = ref;
              }}
              //将textarea中的值传递过去
              onChange={(e) => this.onIuput(e.target.value)}
              minLength="140"
              placeholder="亲，菜品的口味如何，商家的服务是否周到?"
              className="comment-input"
            ></textarea>
            {/* 显示输入多少字符 */}
            <span className="count">{this.state.count}</span>
          </div>
          <p className="one-line product-name">+厚切鸡排 香辣口水鸡饭. 中辣</p>
        </div>
        <div className="submit">提交评价</div>
      </div>
    );
  }
}

export default Main;
