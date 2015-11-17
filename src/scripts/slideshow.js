var isEditing = false,
    slides = [],
    timeout;

var getSlides = function() {
  var _slides = document.getElementById('slideshow').children;

  for (var i = 0; i < _slides.length; i++) {
    slides.push(_slides[i]);
  }
}();

var save = function(id, node) {

  // Convert the nodes into a string 
  var content = Array.prototype.map.call(node.children, function(node) {
    return node.outerHTML;
  }).join('');

  update({content: content}, 'slide', id);
};

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
  var slideId = event.target.dataset.id,
      id      = event.target.dataset.id,
      content = event.target;

  if (isEditing) console.log('event:', event.target);
  console.log('edit called');

  // If a timeout has already been set, clear it
  if (timeout) clearTimeout(timeout);

  // Set a 500ms debounce timeout
  timeout = setTimeout(function() {
    serialize(slideId, event.target, function(serialized) {
      save(slideId, serialized);
    });
  }, 500);
};



/**
 * Make contents of slide editable
 * 
 * @return {[type]} [description]
 */
var makeEditable = function(checkbox) {
  // TODO: Loop through nodes,
  // add edit method to onclick for node
  
  var _slides = slides || [];

  for (var i = 0; i < slides.length; i++)  {

    if (checkbox.checked) {

      // Add the editable class
      _slides[i].className += ' editable';

      // Make the content editable
      _slides[i].contentEditable = true;

      // Add edit method to keypress event
      _slides[i].onkeypress = edit;

      isEditing = true;
    }

    else {

      // Reset the class names
      _slides[i].className = 'slide';

      // Slide content is no longer editable
      _slides[i].contentEditable = false;

      isEditing = false;
    }
  } 
};

var serialize = function(id, node, callback) {
  var serialized,
      content = node.children
      listItem = (/(-|\*)\s(.+)/g);

  for (var i = 0; i < content.length; i++) {
    
    // Is a list item
    if (listItem.test(content[i].textContent)) {
      content[i].innerHTML = content[i].textContent.replace(listItem, '<li>$2</li>');
    }
  }

  console.log('serialize node', content);
  // TODO:
  // - Take input, remove empty divs etc.
  // - Look for ul, li's etc.
  return callback(node);
};