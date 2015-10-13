var Slider = function() {
  // Starting value always zero; this would come from the API
  this.currentPosition = 0;

  // This should be dynamic, count all .slide divs
  this.totalSlides = 4;

  this.api = '/api/info';

  this.nextSlide = function(callback) {
    console.log('nextSlide() called.');

    if (this.currentPosition > this.totalSlides) {
      // Restart the slider, or disable button
      callback(false);
    }

    // Increment current position
    this.currentPosition++;

    callback(true);
  };

  this.previousSlide = function(currentPosition) {
    console.log('previousSlide() called.');

    // Decrement current position
    this.currentPosition--;
  };

  this.getCurrentPosition = function() {
    var http = new XMLHttpRequest();

    // Send the GET request
    http.open('GET', this.api, false);
    http.send();

    // Set the current position
    this.currentPosition = JSON.parse(http.responseText).position;

    console.log(this.currentPosition)
  };

  this.getTotalSlides = function() {
    var http = new XMLHttpRequest();

    // Send the GET request
    http.open('GET', this.api, false);
    http.send();

    // Set the current position
    this.totalSlides = JSON.parse(http.responseText).totalSlides;
  };

  this.previousSlide();

  this.getCurrentPosition();
};

var slide = new Slider();

function nextSlide() {
  var xhttp = new XMLHttpRequest();
  url = "/api/info";
 
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({position: 101}));

  slide.getCurrentPosition();
}