'use strict';

let request = require('request');

let local = 'http://localhost:3000/api/';

describe('Slideshow API', () => {

  // This route doesn't exist, we should get a 404
  describe('GET /api', () => {
    it('returns status code 404', (done) => {
      request.get(local, (error, res, body) => {
        expect(res.statusCode).toBe(404);

        done();
      });
    });
  });

  describe('GET /api/slideshows', () => {
    it('returns list of slideshow records', (done) => {
      request.get(local + 'slideshows', (error, res, body) => {
        // Body is a string, so convert to a JSON object
        body = JSON.parse(body);

        // Check to make sure we are getting at least an empty object
        expect(body).toEqual(jasmine.any(Object));

        done();
      });
    });
  });

  describe('GET /api/slideshow/:token', () => {
    it('returns a single slideshow record', (done) => {
      request.get(local + 'slideshow/9846', (error, res, body) => {
        body = JSON.parse(body);
        console.log(res);
        done();

        //expect(body).toEqual();
      });
    });
  });

});