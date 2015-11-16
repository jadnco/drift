/**
 * Get all slideshow nodes
 * 
 * @return {[type]} [description]
 */
var nodes = function() {
  var slides = document.getElementById('slideshow').children,
      nodes = [];

  for (var i = 0; i < slides.length; i++) {
    var children = slides[i].children;

    for (var j = 0; j < children.length; j++) {

      // Push to nodes array
      nodes.push(children[j]);
    }
  }

  return nodes;
}();

/**
 * Get all content nodes
 * 
 * @param  {[type]} ) {}[description]
 * @return {[type]}   [description]
 */
var contents = function() {
  var slides = document.getElementById('slideshow').children,
      contents = {};

  for (var i = 0; i < slides.length; i++) {
    var children = slides[i].children;

    for (var j = 0; j < children.length; j++) {
      var key;

      // Check if data-id isn't already set
      if (!children[j].dataset.id) {
        key = generateId();

        // Set data-id attribute
        children[j].dataset.id = key;

        // Store the node object with a unique key
        contents[key] = children[j].textContent;
      }

      else {

        // Store the node object with already generated key
        contents[children[j].dataset.id] = children[j].textContent;
      }
    }
  }

  return contents; 
}();

/**
 * Edit some content
 * 
 * @param  {[type]} property [description]
 * - the property node to modify
 * 
 * @param  {[type]} content  [description]
 * - The new content
 * 
 * @return {[type]}          [description]
 */
var edit = function(event) {
  // TODO: Change property based on id value,
  // then save
  var id = event.target.dataset.id,
      content = event.target;

  console.log('edit called');
  console.log('event:', event.target);
};

/**
 * Make contents of slide editable
 * 
 * @return {[type]} [description]
 */
var makeEditable = function(checkbox) {
  // TODO: Loop through nodes,
  // add edit method to onclick for node
  var _nodes = nodes || [];

  for (var i = 0; i < _nodes.length; i++) {

    // Need to make editable
    if (checkbox.checked) {

      // Add the editable class
      _nodes[i].className = 'editable';

      // Add edit method to onclick event
      _nodes[i].onclick = edit;

      // Make editable
      _nodes[i].contentEditable = true;
    }

    // Already editable, so remove
    else {

      // Remove the editable class
      _nodes[i].className = '';

      // Remove editable
      _nodes[i].contentEditable = false;
    }
  }
};