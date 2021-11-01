2048-Animated-react
==========

[Play it here](https://2048-utqrsh.netlify.app/)

![](https://github.com/Utqrsh04/Animated-2048/blob/master/src/assets/img/2048.png)

### React

The view logic is in [index.js](https://github.com/Utqrsh04/Animated-2048/blob/master/src/helper/index.js). 
There is one main component called [BoardView](https://github.com/Utqrsh04/Animated-2048/blob/master/src/components/BoardView.jsx) which keeps a Board object as its state. It handles all the events by forwarding them to the Board appropriately, and then propagates the changes to its child components. As promised by React, there is almost no direct DOM manipulation - except for attaching the keyDown listener to ```window``` so the events can be handled on the whole page instead of only when the board is focused.

The [TileView](https://github.com/Utqrsh04/Animated-2048/blob/master/src/components/Tile.jsx) is where most of the fun view stuff happens. It receives a [Tile](https://github.com/Utqrsh04/Animated-2048/blob/64a4d34b61229661b4c75b090888fd4331927e81/src/components/Tile.jsx#L19) in its props object and determines whether it is new or moving, and if it's moving - what are the source and the destination. Then it sets the appropriate CSS classes in order to trigger the correct animations.

### CSS Animations

The animations are implemented in CSS3. Since there is a separate class for each movement from cell A to cell B, those classes cannot be written directly in CSS (or, at least, it would be really suboptimal) and have to be generated. This happens with SASS in [style.scss](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/style.scss).

One optimization used to minimize the generated CSS size was to separate the tile movement into row and column movement. That is, instead of generating a separate animation for each quadruple `(startRow, startColumn)` -> `(endRow, endColumn)` (as can be seen [here](https://github.com/Utqrsh04/Animated-2048/blob/master/src/styles.scss)), the observation is made that every movement is either completely horizontal or completely vertical. This means that there can be 2*4^2 animations of the form `(startRow)` -> `(endRow)` and `(startColumn)` -> `(endColumn)` instead of 4^4 animations of the other form. This decreased the generated CSS size from about 70KB  to about 10KB.

### Building and running

To run, simply clone the repo , install dependencies and start a web server serving the main project directory.

    git clone https://github.com/Utqrsh04/Animated-2048.git
    cd Animated-2048
    npm install 
    npm start
    Start Playing😎

and the game will be accessible on ```localhost:3000```.
The page will reload if you make edits.
You will also see any lint errors in the console.