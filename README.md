# IoCascade.js 💃🕺
### A lil' js lib that detects when elements appear in view and staggers the animations

Use like this (defaults shown).
``` javascript
const cascade = new IoCascade({
  selector: '[data-io]',
  classToAdd: 'io-in',
  delay: 100,
  threshold: 1,
  rootMargin: '0px 100px 0px 100px',
  root: null,
});
````
IoCascade detects the first time an element with the ```data-io``` property on it enters the viewport and adds it to a queue.

After a default delay of 100ms it then apply's a class of ```io-in``` to the item and then checks for the next item in the queue. If there is one there (another item has scrolled into view before the animation started) it will wait for the next delay and repeat.

If the element has a ```data-delay="500"``` property set then it will use this number in milliseconds for the delay for that item instead of the default. 

This way we can quickly set up staggered delays for multiple items that are on the screen at once with a minimum of fine tuning.

IoCascade.js can also trigger child elements based on a parent entering the viewport. The parent should have a ```data-io``` attribute as normal, but all the children should have ```data-io="child"``` property set. This way the child elements animations will not be triggered until the parent has scrolled into view. Once the parent is in view all the child elements will be animated in sequence.


## Dev setup
It uses gulp, scss, browserSync, Rollup and buble.

### Folder structure
**_src/** - is where you work  
**docs/** - is where the browserSync server runs from  
**dist/** - contains the processed js files  


### Get started
1. `npm install` - install dependencies
2. `npm run dev` - spins up the dev server
3. `npm run build` - transpiles and builds final js files in dist/ folder
4. `npm run clean` - deletes the docs and dist folders
