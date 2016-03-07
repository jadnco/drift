'use strict';

module.exports = {
  _local: true,

  port: '1998',

  local: 'localhost',

  // IP address that can be accessed through network
  external: 'localhost',

  api: function() {
    return (this._local ? this.local : this.external) + '/api';
  },

  url: function() {
    return (this._local ? this.local : this.external) + ':' + this.port;
  },

  route: function() {
    return (this._local ? this.local : this.external);
  },

  slides: function(token) {
    let route = '/slideshow/';

    token = token || '';

    return 'http://' + (this._local ? this.local : this.external) + ':' + this.port + '/api' + route + token + '/slides';
  },

  slideshows: function() {
    let route = '/slideshows';

    return 'http://' + (this._local ? this.local : this.external) + route;
  },

  slideshow: function(token) {
    let route = '/slideshow/';

    token = token || '';

    return 'http://' + (this._local ? this.local : this.external) + ':' + this.port + '/api' + route + token;
  },
};
