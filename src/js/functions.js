var current;

/**
 * Get the token from the url
 * 
 * @return {string}
 * - the token value
 */
var token = function() {
  token = window.location.pathname.slice(-4);

  return token;
}();

/**
 * Sends AJAX request to update slideshow record
 * 
 * @param  {string} url
 * - URL of slideshow to send request
 * 
 * @param {object} content
 * - Updated slideshow record
 * 
 * @return {[type]}         [description]
 */
var update = function(token, content) {
  var http = new XMLHttpRequest(),
      url  = '/api/slideshow/';

  var request = {
    slideshow: content
  };

  // Open the request
  http.open("PUT", url + token, true);

  // Make sure the content is sent as json data
  http.setRequestHeader("Content-type", "application/json");

  console.log('update called');

  // Send the request
  http.send(JSON.stringify(request));
};

/**
 * Get a slideshow response by token from API
 * 
 * @param  {string} token
 * - the token identifier
 * 
 * @return {object}
 * - the slideshow object
 */
var get = function(token) {
  // no token, nothing to do
  if (!token) return false;

  var http = new XMLHttpRequest(),
      url  = '/api/slideshow/',
      response;

  // Open the request
  http.open("GET", url + token, false);

  http.send(null);

  // Convert response into object
  response = JSON.parse(http.responseText);

  // Send the request
  return response.slideshow[0];
};

/**
 * Redirect to a new location
 * 
 * @param {string} location
 * - the new location to go to
 * 
 * @return {[type]}          [description]
 */
var redirect = function(location) {
  // Just use a hash symbol if location isn't defined
  location = location || '#';

  // Do the actual redirect
  window.location.href = location;

  return;
};

/**
 * Does the animation to specified slide
 * 
 * @param {int} location
 * - location of slide to animate to
 * 
 * @return {[type]}          [description]
 */
var animate = function(location) {

};

/**
 * Check if token has valid properties
 * 
 * @param {string} token
 * - token to check
 * 
 * @return {[type]}
 */
var validateToken = function(form) {
  var token = form.elements.token.value;

  // Make sure token exists and is a number
  token = Number(token) || null;

  if (!token || String(token).length !== 4) {
    // The token is not valid
    form.elements.error.value = "Please enter a valid token";

    return false;
  }

  // Token is valid so redirect
  return redirect('/remote/' + token);
};

/**
 * The token is invalid, show error
 * 
 * @return {[type]} [description]
 */
var invalidToken = function() {
  // Send error to the form
};

/**
 * Animates to previous slide and updates API record
 * 
 * @return {[type]}
 */
var nextSlide = function() {
  // Increment slide
  current++;

  animate(current);
};

/**
 * Animates to next slide and updates API record
 * 
 * @return {[type]}
 */
var previousSlide = function() {
  // Update the local int of current slide
  current--;

  animate(current);
};

/**
 * Animate to first slide and update API record
 * 
 * @return {[type]} [description]
 */
var resetSlides = function() {
  current = 0;

  // Send new position to API
  update(token, {position: current});

  // Animate to the new slide
  animate(current);
};

/**
 * Initialize the slideshow
 */
var init = function() {
  var slideshow = get(token);

  // Set the current slide
  current = slideshow ? slideshow.position : null;

  // Animate to the current slide
  animate(current);
}();