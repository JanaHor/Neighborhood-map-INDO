import React, { Component } from "react";
import PlacesList from "./PlacesList";
import FoursquareData from "./foursquareAPI";

class App extends Component {
  constructor(props) {
    super(props);
    // Real estate listings that will be shown to the user.
	this.state = {
      allPlaces: [
	{
	"title": "Adisucipto International Airport (JOG)", 
	"type": "transport",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png",
	"latitude": -7.787684, 
	"longitude": 110.431761,
	"id": "5a88069026659b534a876e49"
	},
    
	{
	"title": "Stasiun Jogjakarta",
	"type": "transport",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png",
	"latitude": -7.78927, 
	"longitude": 110.363553,
	"id": "503b6693e4b0bbf1b090a5ca"
	},
	
    {
	"title": "Jalan Malioboro",
	"type": "shopping",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
    "latitude": -7.79265, 
	"longitude": 110.365888,
	"id": "5904578435dfa74d07931eae"
	},
    
	{
	"title": "Pasar Beringharjo",
	"type": "shopping",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
	"latitude": -7.798954, 
	"longitude": 110.36728,
	"id": "4ba47041f964a520669d38e3"
	},
    
	{
	"title": "Taman Sari Palace",
	"type": "entertainment",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
	"latitude": -7.810313, 
	"longitude": 110.360018,
	"id": "4bad8b68f964a520535a3be3"
	},
    
	{
	"title": "Gembira Loka Zoo",
	"type": "entertainment",
	"icon": "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
	"latitude": -7.804093, 
	"longitude": 110.398013,
	"id": "4bb53e8c941ad13afafe1de3"
	}
],
      map: "",
      infoWindow: "",
      prevMarker: ""
    };
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
  // Loads asynchronously the JS definitions when the page starts loading in the browser.
    this.loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBj-DSrH9xNm4Kle5NwIhWlW54Tme7dXU&callback=initMap"
    );
  }

  // Initializes JS function to load the map.
  initMap() {
    var _this = this;

    var view = document.getElementById("map");
    view.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(view, {
      center: { lat: -7.797456, lng: 110.370697 },
      zoom: 14,
      mapTypeControl: false
    });

    var infoWindow = new window.google.maps.InfoWindow({});
	
    window.google.maps.event.addListener(infoWindow, "closeclick", function() {
      _this.closeInfoWindow();
    });

    this.setState({
      map: map,
      infoWindow: infoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      _this.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, "click", function() {
      _this.closeInfoWindow();
    });

    var allPlaces = [];
    this.state.allPlaces.forEach(function(location) {
      var titleType = location.title + " // " + location.type;

		var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        animation: window.google.maps.Animation.DROP,
        map: map,
		title: location.title,
		icon: location.icon,
		venueID: location.id
      });

   // Create an onclick event to open an infowindow at each marker.
	     marker.addListener("click", function(e) {
	console.log(e)
	console.log(marker)
        _this.openInfoWindow(marker);
      });

      location.titleType = titleType;
      location.marker = marker;
      location.display = true;
      allPlaces.push(location);
    });
    this.setState({
      allPlaces: allPlaces
    });
  }

   // Load the script that refer to google maps
    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }
   
  // Open the Info Window and set parameters including animated active marker
    openInfoWindow(marker) {
    marker.infowindow = new window.google.maps.InfoWindow({});
	this.closeInfoWindow();
    this.state.infoWindow.open(this.state.map, marker);
    this.setState({
      prevMarker: marker
    });
	marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.state.map.setCenter(marker.getPosition());
	FoursquareData(marker.venueId, marker.infowindow)

  }
  
  // Close the opened Info Window
   closeInfoWindow() {
    if (this.state.prevMarker) {
      this.state.prevMarker.setAnimation(null);
    }
    this.setState({
      prevMarker: ""
    });
    this.state.infoWindow.close();
  }

  render() {
    return (
      <div id="places-list">
        <PlacesList
          allPlaces={this.state.allPlaces}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
        />
        <div id="map" role="application"/>
      </div>
    );
  }
}

export default App;
