'use strict';

module.exports = {
  _local: true,

  port: '1998',

  local: 'localhost',
  external: '10.28.163.66',

  api: function() {
    return (this._local ? this.local : this.external) + '/api';
  },
  url: function() {
    return (this._local ? this.local : this.external) + ':' + this.port;
  },
  route: function() {
    return (this._local ? this.local : this.external);
  },
  slideshows: function() {
    let route = '/slideshows';

    return 'http://' + (this._local ? this.local : this.external) + route;
  },
  slideshow: function(token) {
    let route = '/slideshow/';

    token = token || '';

    return 'http://' + (this._local ? this.local : this.external) + ':' + this.port + '/api' + route + token;
  }
};