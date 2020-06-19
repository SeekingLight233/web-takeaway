import "./Comment.scss";

import React from "react";

import { connect } from "react-redux";

// import StarScore from 'component/StarScore/StarScore';
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
    let data = this.props.commentData;
    return <div className="comment-inner">Comment</div>;
  }
}

export default connect()(Comment);
// state =>({
//     commentData: state.commentReducer.commentData
// })
