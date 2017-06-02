$(document).ready(function() {
  $nav_location = $(".nav-location");
  $nav_topic = $(".nav-topic");
  $nav_btn = $(".nav-btn")

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
    window.location.href = relative_path
  }
  function press_enter(event) {
    if(event.keyCode == 13) {
      get_location_topic();
    }
  }
});








