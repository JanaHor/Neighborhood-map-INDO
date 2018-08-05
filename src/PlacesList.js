import React, { Component } from "react";
import Place from "./place";

class PlacesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      query: "",
      suggestions: true
    };

    this.updateLocations = this.updateLocations.bind(this);
  }

  updateLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    var locations = [];
    this.props.allPlaces.forEach(function(location) {
      if (location.titleType.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.allPlaces
    });
  }

  render() {
    var locationPlaces = this.state.locations.map(function(listItem, index) {
      return (
        <Place
          key={index}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
          data={listItem}
        />
      );
    }, this);

    return (
      <div className="search-area">
        <input
          id="search-field"
		  type="text"
		  className="search-box"
		  aria-label="search"
		  role="search"
          placeholder="Find place"
          value={this.state.query}
          onChange={this.updateLocations}
        />
        <ul className="places-list">
          {this.state.suggestions && locationPlaces}
        </ul>
      </div>
    );
  }
}

export default PlacesList;