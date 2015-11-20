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

var serialize = function(id, node, callback) {
  var serialized;
  var replacement;

  var content = node.children;
  var listItem = (/^(-|\*)\s(.+)$/g);
  var headers = headers = {
    one:   (/^(#)\s(.+)$/g),
    two:   (/^(##)\s(.+)$/g),
    three: (/^(###)\s(.+)$/g),
    four:  (/^(####)\s(.+)$/g),
    five:  (/^(#####)\s(.+)$/g),
    six:   (/^(######)\s(.+)$/g),
  };

  for (var i = 0; i < content.length; i++) {

    // Is a list item
    if (listItem.test(content[i].textContent)) {
      content[i].innerHTML = content[i].textContent.replace(listItem, '<li>$2</li>');

      // No need to check anything else
      continue;
    }

    // Check for headings
    for (var heading in headers) {
      console.log(headers[heading]);

      switch (heading) {
        case 'one':   replacement = '<h1>$2</h1>'; break;
        case 'two':   replacement = '<h2>$2</h2>'; break;
        case 'three': replacement = '<h3>$2</h3>'; break;
        case 'four':  replacement = '<h4>$2</h4>'; break;
        case 'five':  replacement = '<h5>$2</h5>'; break;
        case 'six':   replacement = '<h6>$2</h6>'; break;
        default:      replacement = '$2';
      }

      if (typeof headers[heading] === 'object' && headers[heading].test(content[i].textContent)) {
        content[i].innerHTML = content[i].textContent.replace(headers[heading], replacement);

        console.log(content[i].textContent, replacement);

        // Can only have a single heading level
        break;
      }
    }

    // TODO:
    // - Check for heading w/ level (#, ##, ###, ####, etc.)
  }

  console.log('serialize node', content);

  // TODO:
  // - Take input, remove empty divs etc.
  // - Look for ul, li's etc.
  return callback(node);
};
