import React from "react";

class Place extends React.Component {


  render() {
    return (
      <li
        role="button"
        className="place"
        tabIndex="0"
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      >
        {this.props.data.titleType}
      </li>
    );
  }
}

export default Place;