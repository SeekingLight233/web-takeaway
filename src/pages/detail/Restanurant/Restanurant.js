import "./Restanurant.scss";

import React from "react";

import { connect } from "react-redux";

// import { getRestanurantData } from '../actions/restanurantAction';

class Restanurant extends React.Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(getRestanurantData());
  }
  renderPayType(types) {
    let array = types || [];
    return array.map((item, index) => {
      return (
        <p key={index} className="restanurant-pay-type res-section">
          <img className="icon" src={item.icon_url} />
          {item.info}
        </p>
      );
    });
  }
  render() {
    let data = this.props.resData;
    return <div className="restanurant-content">Restanurant</div>;
  }
}

export default connect()(Restanurant);
// state =>({
//     resData: state.restanurantReducer.resData
// })
