var current, slideshow;

/**
 * Get the token from the url
 * 
 * @return {string}
 * - the token value
 */
var token = function() {
  var token = window.location.pathname.slice(-4);

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
var update = function(content) {
  var http = new XMLHttpRequest(),
      url  = '/api/slideshow/';

  var request = {
    slideshow: content
  };

  // Open the request
  http.open("PUT", url + token, true);

  // Make sure the content is sent as json data
  http.setRequestHeader("Content-type", "application/json");

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
var get = function(callback) {
  var http = new XMLHttpRequest(),
      url  = '/api/slideshow/',
      response;

  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200) {
      // Convert response into object
      response = JSON.parse(http.responseText);

      return callback(response.slideshow[0]);
    }
  };

  // Open the request
  http.open("GET", url + token, true);

  http.send(null);
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
 * Animate to slide location
 * 
 * @param {int} location
 * - location of slide to animate to
 * 
 * @return {[type]}          [description]
 */
var animate = function(location) {
  var height = window.innerHeight;

  location = location || 0;

  document.body.style.transform = "translateY(" + -(height * location) + "px)";
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

  // TODO: Send and check for request

  // Token is valid so redirect
  return redirect('/remote/' + token);
};

/**
 * Animates to previous slide
 * 
 * @return {[type]}
 */
var nextSlide = function() {
  // Reset if on last slide
  if (current === slideshow.slides.length - 1) {
    return resetSlides();
  }

  current++;

  // Update API response
  update({position: current});
};

/**
 * Animates to next slide
 * 
 * @return {[type]}
 */
var previousSlide = function() {
  // Can't go below zero
  if (current === 0) {
    return;
  }

  current--;

  // Update API response
  update({position: current});
};

/**
 * Animate to first slide and update API record
 * 
 * @return {[type]} [description]
 */
var resetSlides = function() {
  current = 0;

  // Send new position to API
  update({position: current});
};

/**
 * Sroll and set a specified slide
 * 
 * @param  {int} location
 * - location of slide to go to
 * 
 * @return {[type]}          [description]
 */
var toSlide = function(location) {
  location = location || current;
  
  update({position: location});
};

/**
 * Listen for a change in the position
 * @return {[type]} [description]
 */
var listen = function() {
  setTimeout(function() {
    get(function(res) {
      // Update current if not same as response
      if (res.position !== current) {
        current = res.position;

        animate(current);
      }

      listen();
    });
  }, 3000);
};

/**
 * Initialize the slideshow
 */
var init = function() {
  get(function(res) {
    slideshow = res;

    // Set the current slide
    current = res ? res.position : current;
  });
}();