# backend

Some ideas as to how the backend will work.

 - Each slideshow is given a unique ID (4-digits).
 - The mobile controller will ask for the ID.
 - Once the ID is added (and verified), a new socket connection to an API is made.
 - The buttons, on mobile, will hit the api and modify a `.json` file, that keeps track of the position.
 - The front-end of the slideshow will listen for position changes and animate accordingly.