var Slider = function() {
  // Starting value always zero; this would come from the API
  this.currentPosition = 0;

  // This should be dynamic, count all .slide divs
  this.totalSlides = 4;

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

  this.previousSlide();
};

var slide = new Slider();