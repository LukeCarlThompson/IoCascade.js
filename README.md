# I O Cascade
### A lil' js lib that detects when elements appear in view and staggers the animations

iocascade detects the first time an element with the ```data-io``` property on it enters the viewport and adds it to an queue.

It then apply's a class of ```.io-in``` to each item in the queue after a default delay of 100ms between each. If the element has a ```data-delay="500"``` property set then it will use this number in milliseconds for the delay for that item instead of the default. 

This way we can quickly set up staggered delays for multiple items that are on the screen at once with a minimum of fine tuning.

iocascade.js can also trigger child elements based on a parent entering the viewport. The parent should have a ```data-io``` attribute as normal, but all the children should have ```data-io="child"``` property set.

Using this technique the parent element will be added to the queue and all it's children right away. So we can set of a staggered cascade animation based on the parent entering the viewport without having to set up custom transition or animation delays in CSS.


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
