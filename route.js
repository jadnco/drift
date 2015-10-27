'use strict';

module.exports = {
  _local: true,

  local: 'http://localhost:3000/api',
  external: 'external_url',

  slideshows: function() {
    let route = '/slideshows';

    return (this._local ? this.local : this.external) + route;
  },
  slideshow: function(token) {
    let route = '/slideshow/';

    return (this._local ? this.local : this.external) + route + token;
  }
};