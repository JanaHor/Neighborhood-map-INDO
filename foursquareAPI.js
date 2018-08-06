export default function FoursquareData(id, infowindow) {
  const clientID = "GB1QF443M30DNP54WJOV24WP0WHXSSHLJKSWLTT2AEYQCEE1"
  const clientSecret = "FJ5GUUOPWHO5LVM2NL2MYBM40OWSDIPPU4FNWMZULMZU042V"
  const url = "https://api.foursquare.com/v2/venues/${id}?client_id=${clientID}&client_secret=${clientSecret}&v=20180502"

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((info) => {
      infowindow.setContent(
        `<div class="info-name">${info.response.venue.name}</div>
         <div class="info"><span class="info-rating">Ratings:</span> ${info.response.venue.rating}</div>`
		 )
    })
    .catch(() => {
      console.log("error")
	  /* OR?? infowindow.setContent("Not possible to get info from Foursquare!")  */
    })
}