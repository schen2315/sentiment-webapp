// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var geocoder;
var map;
var lat, lng;
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  codeAddress();
}
function codeAddress() {
  // var address = document.getElementById('address').value;
  var address = $(".txt-location").text()
  console.log(address)
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == 'OK') {
      lat = results[0].geometry.location.lat()
      lng = results[0].geometry.location.lng()
      get_sentiment()
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function get_sentiment() {
  var latitude = lat.toString()
  var longitude = lng.toString();
  var topic = $txt_topic.text()
  var url = encodeURI('/sentiment/?' + 'latitude=' + latitude + '&longitude=' + longitude + '&topic=' + topic)
  console.log(url)
  $.ajax({
    method: 'GET',
    url: url,
    success: function(data) {
      // console.log(pie)
      $loading_div.hide()
      pie.fillChart(data.ratios.pos, data.ratios.neg, data.ratios.neut)
      $piechart_score.text("Total Score: " + data.score)
      $piechart_sentiment.text("Overall " + data.sentiment + " sentiment towards " + $txt_topic.text() + " in " + $txt_location.text())
    },
    error: function(data) {
      $loading_div.hide()
      $piechart.hide()
      $piechart_score.text("Sorry, there was an error with your particular search")
    }
  })
}
// $(document).ready(function() {
  $nav_location = $(".nav-location");
  $nav_topic = $(".nav-topic");
  $nav_btn = $(".nav-btn")
  //only in map.html
  $txt_location = $(".txt-location")
  $txt_topic = $(".txt-topic")
  $piechart = $(".piechart")
  $loading_div = $(".loading-div")
  $piechart_score = $(".piechart-score")
  $piechart_sentiment = $(".piechart-sentiment")

  $nav_btn.on('click', get_location_topic);
  $nav_location.on('keyup', press_enter)
  $nav_topic.on('keyup', press_enter)


  function get_location_topic() {
    var location = $nav_location.find("input").val();
    var topic = $nav_topic.find("input").val();
    console.log(location, topic)
    //redirect
    relative_path = '/map?' + 'location=' + location + "&topic=" + topic
    relative_path = encodeURI(relative_path)
    // window.location.href = relative_path
    window.location.replace(relative_path)
  }
  function press_enter(event) {
    if(event.keyCode == 13) {
      get_location_topic();
    }
  }
// });




