'use strict';

// Add extra jasmine methods
require('jasmine-expect');

let request = require('request');

let API = {
  // Local API address
  local: 'http://localhost:3000/api/',
  // External address, available across the network
  external: ''
};

describe('Slideshow API', () => {

  // This route doesn't exist, we should get a 404
  describe('GET /api', () => {
    it('returns status code 404', (done) => {
      request.get(API.local, (error, res, body) => {
        expect(res.statusCode).toBe(404);

        done();
      });
    });
  });

  // Single slideshow record
  describe('GET /api/slideshow/:token', () => {
    it('returns a single slideshow record', (done) => {
      request.get(API.local + 'slideshow/9846', (error, res, body) => {
        body = JSON.parse(body);

        expect(body).toBeObject();

        // Check if .slideshow exists
        expect(body).toHaveArray('slideshow');

        // Array should only have a single record
        expect(body.slideshow.length).toBe(1);

        done();
      });
    });
  });

  // List of all slideshow records
  describe('GET /api/slideshows', () => {
    it('returns a list of all slideshow records', (done) => {
      request.get(API.local + 'slideshows', (error, res, body) => {
        body = JSON.parse(body);

        // Check body for an object
        expect(body).toBeObject();

        // Check if .slideshows exists
        expect(body).toHaveArray('slideshows');

        expect(body.slideshows).toBeArrayOfObjects();

        done();
      });
    });
  });

});