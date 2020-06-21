import "./Comment.scss";

import React from "react";

import { connect } from "react-redux";

import StarScore from "component/StarScore/StarScore";
// import CommentList from './CommentList/CommentList';
// import { getListData } from '../actions/commentAction';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchData();
  }

  fetchData() {
    this.props.dispatch(getListData());
  }

  render() {
    // let data = this.props.commentData;
    return (
      <div className="comment-inner">
        <div className="comment-score">
          <div className="mail-score-content">
            <div className="mail-score">5.0</div>
            <div className="mail-text">商家评价</div>
          </div>

          <div className="other-score-content">
            <div className="taste-score">
              <div className="taste-text">口味</div>
              <div className="taste-star-wrap">
                <StarScore score={4.5}></StarScore>
              </div>
              <div className="taste-score-text">4.7</div>
            </div>

            <div className="package-score">
              <div className="package-text">包装</div>
              <div className="package-star-wrap">
                <StarScore score={4.5}></StarScore>
              </div>
              <div className="package-score-text">4.2</div>
            </div>
          </div>
          <div className="send-score-content">
            <div className="send-score">4.9</div>
            <div className="send-text">配送评价</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Comment);
// state =>({
//     commentData: state.commentReducer.commentData
// })
