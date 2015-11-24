var timeout;

var isEditing = false;
var slides = [];

var getSlides = (function() {
  var _slides = document.getElementById('slideshow').children;

  for (var i = 0; i < _slides.length; i++) {
    slides.push(_slides[i]);
  }
})();

var save = function(id, node) {
  // Convert the nodes into a string
  var content = Array.prototype.map.call(node.children, function(node) {
    return node.outerHTML;
  }).join('');

  // this is a comment
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
  var slideId = event.target.dataset.id;
  var id = event.target.dataset.id;
  var content = event.target;

  //if (isEditing);

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
    } else {

      // Reset the class names
      _slides[i].className = 'slide';

      // Slide content is no longer editable
      _slides[i].contentEditable = false;

      isEditing = false;
    }
  }
};

/**
 * Move the cursor to the end of content
 *
 * @param {node} element
 * - the element with contenteditable
 */
var toContentEnd = function(element) {
  var range;
  var selection;

  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

/**
 * Convert a string of text into an HTML list item
 * using Markdown style syntax
 *
 * @param {node} content
 * - the node object to check and convert
 *
 * @return {string}
 * - the converted HTML or original content
 */
var toListItem = function(content) {
  var expression = (/^(-|\*)\s(.+)$/g);
  var output;

  // Make sure content is a list item
  if (expression.test(content)) {
    output = content.replace(expression, '<li>$2</li>');
  }

  /**
   * TODO: Check if list item is empty
   */

  return output || content;
};

/**
 * Convert a string of text into an HTML heading
 * using Markdown style syntax
 *
 * @param {node} content
 * - the node object to check and convert
 *
 * @return {string}
 * - the converted HTML or original content
 */
var toHeading = function(content) {
  var output;

  var headers = {
    one: {
      expression: (/^(#)\s(.+)$/g),
      replacement: '<h1>$2</h1>',
    },
    two: {
      expression: (/^(##)\s(.+)$/g),
      replacement: '<h2>$2</h2>',
    },
    three: {
      expression: (/^(###)\s(.+)$/g),
      replacement: '<h3>$2</h3>',
    },
    four: {
      expression: (/^(####)\s(.+)$/g),
      replacement: '<h4>$2</h4>',
    },
    five: {
      expression: (/^(#####)\s(.+)$/g),
      replacement: '<h5>$2</h5>',
    },
    six: {
      expression: (/^(######)\s(.+)$/g),
      replacement: '<h6>$2</h6>',
    },
  };

  for (var head in headers) {

    // Check for a heading match
    if (headers[head].expression.test(content)) {
      output = content.replace(headers[head].expression, headers[head].replacement);

      // Can only have a single heading level
      break;
    }
  }

  return output || content;
};

/**
 * Remove any lines of empty list items
 * @param  {[type]} nodes [description]
 * @return {[type]}       [description]
 */
var removeEmptyContent = function(nodes) {

};

var serialize = function(id, node, callback) {
  var serialized;
  var replacement;

  var content = node.children;
  var emptyItem = (/^(<br>|<\/li>)$/g);

  for (var i = 0; i < content.length; i++) {

    var children = content[i].children;

    // Convert any headings into proper elements
    content[i].innerHTML = toHeading(content[i].innerHTML);

    // Convert any list items into proper elements
    content[i].innerHTML = toListItem(content[i].innerHTML);

    removeEmptyContent(children);

    for (var child in children) {

      if (children.hasOwnProperty(child)) {

        // No need to check if there's no content
        if (!children[child].innerHTML) continue;

        // Is an empty item
        if (emptyItem.test(children[child].innerHTML)) {
          console.log('empty child, removed', children[child].outerHTML);
          //children[child].innerHTML = '';

          console.log('parent of empty', children[child].parentNode);

          children[child].parentNode.removeChild(children[child]);
          
        } else console.log('child', children[child].outerHTML);
      }
    }

    

    // Check to see if text content is empty
    // if (emptyItem.test(content[i])) {
    //   console.log('empty list item', content[i]);
    //   //content[i].innerHTML = ' ';
    // }
  }

  // Move the cursor to the end of the content
  toContentEnd(node);

  return callback(node);
};
