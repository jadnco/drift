# Drift

[![forthebadge](http://forthebadge.com/images/badges/certified-snoop-lion.svg)](http://forthebadge.com)

A cool slideshow and remote app.

### Getting Started

Make sure you have the following dependencies installed globally:
  - [Node.js](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.org)
  - [Gulp](http://gulpjs.com)
  - [Jasmine](https://github.com/jasmine/jasmine)

Clone the repo using `git clone` or by clicking the *Download ZIP* button to the right.

```sh
git clone https://github.com/danieltamkin/Drift.git
```

Navigate to the cloned directory

```sh
cd Drift
```

Install all dependencies using npm:

```sh
npm install
```

Run the default Gulp task to get started:

```sh
gulp
```

BrowserSync will automagically inject any changes you make to the stylesheets. You can view the website at one of the given access URLs:

```sh
[BS] Access URLs:
 ----------------------------------
       Local: http://localhost:3000
    External: http://10.0.X.XX:3000
 ----------------------------------
```

The `External` URL is disabled by default, because we don't want randos watching us work. It can be enabled by setting the `online` value to `true` inside `gulpfile.js`.

If you are working within a GitHub repo you can deploy your project, at any time, to a `gh-pages` branch by running:

```sh
gulp deploy
```

### Credits

- Responsive grid from [Skeleton](http://getskeleton.com) by [Dave Gamache](https://github.com/dhg)

## API

### Slideshow

#### GET

Returns a list of all slideshows

##### Example

> GET /api/slideshows
  
Response:

```json
{
  "slideshows": [
    {
      "_id": "561ff1aadf537cd4f9501f9f",
      "token": "9846",
      "modified": "2015-10-15T19:53:48.889Z",
      "created": "2015-10-15T18:34:18.605Z",
      "slides": [
        {
          "location": 0,
          "content": "<h1>This is the first slide.</h1>",
          "_id": "561ff1aadf537cd4f9501fa0"
        }
      ],
      "position": 2
    },

    ...
  ]
}
```


#### GET

Returns a single slideshow by `token` or `_id`.

##### Example

> GET /api/slideshow/:token:id
  
Response:

```json
{
  "slideshow":[
    {
      "_id":"561ff1aadf537cd4f9501f9f",
      "token":"9846",
      "created":"2015-10-15T18:34:18.605Z",
      "slides":[
        {
          "location":0,
          "content":"<h1>This is the first slide.</h1>",
          "_id":"561ff1aadf537cd4f9501fa0"
        }
      ],
      "position":0
    }
  ]
}
```

#### PUT

Update a single slideshow by `token` or `_id`.

##### Example

> PUT /api/slideshow/:token:id
  
Request:

```json
{
  "slideshow":{
    "position": 2
  }
}
```

Response:

> 200 OK


#### POST

Create a new slideshow record

##### Example

> POST /api/slideshows

Request:

```json
{
  "slideshow": {
    "position": "1903"
  }
}
```

Response:

```json
{
  "slideshow": {
    "_id": "562004e1f73eb2e915abeab5",
    "created": "2015-10-15T19:56:16.999Z",
    "slides": [],
    "position": 1903
  }
}
```