


/* 
Defaults
{
  selector: css selector for your dom nodes,
  delay: miliseconds of delay,
  threshold: number form 0 to 1 that is a percent of the element that should be in the viewport before animating,
  rootMargin: four px values that adjust the margin of the intersection window,
  root: CSS selector to define the scrolling container, defaults to window,
  once: determines whether the classes get applied once or repeatedly, defaults to true,
}
*/


function ioCascade({selector = '[data-observe]', delay = 100, threshold = 0, rootMargin = '0px 100px -100px 100px', root = null, once = false} = {}) {
  // Check if intersection observer is supported
  const iO = "IntersectionObserver" in window; /* true if supported */
  if ( !iO ) {
    console.log('observeThis.js says intersection Observer is not supported in your browser')
    document.querySelectorAll(selector).forEach((item) => {item.removeAttribute('data-observe');});
    return;
  }
  

  let ready = true;
  let queue = [];
  let timer;

  const options = {
    root,
    threshold,
    rootMargin
  };

  // function to animate first item from array if it exists and then remove it from the array
  const animateNext = (array) => {
    if (array.length >= 1 && ready === true) {

      ready = false;
      // array[0].setAttribute('data-observe', 'in');
      array[0].classList.add('observed-in');

      const filteredArray = array.filter((item) => item !== array[0]);

      queue = filteredArray;

      const itemDelay = array[0].getAttribute('data-delay') || delay;

      clearTimeout(timer);

      const timer = setTimeout(() => {
        ready = true
        animateNext(queue);
      }, itemDelay);
    }
  };

  const isChild = (el) => el.getAttribute("data-observe") === 'child';


  const intersectionObserver = new IntersectionObserver((entries, observer) => {

    for (let i = 0; i < entries.length; i++) {

      const entry = entries[i];
      const el = entry.target;
      
    
      // Check if element has children and if it does then add them all to the array
      if (entry.isIntersecting && ! isChild(el)) {
        const children = el.querySelectorAll('[data-observe="child"]');

        if(children.length) {
          queue.push(el);
          children.forEach((child) => {queue.push(child)});
          console.log('added children -->', children)
          console.log('Queue -->', queue)
          animateNext(queue);
        } else {
          // if(el.getAttribute('data-observe') !== 'in') {
            queue.push(el);
            console.log('Queue -->', queue)
            animateNext(queue);
          // }
        }
      }

      // Remove from observer if options.once is true
      if (entry.isIntersecting && once) {
        observer.unobserve(entry.target);
      }

      // Run this as it leaves the viewport
      if (!entry.isIntersecting) {

        // remove the active class
        entry.target.classList.remove('observed-in');

        // Then remove the data attributes, reflow, then apply them again.
        // This resets the animation state
        if(!isChild(entry.target)) {
          entry.target.removeAttribute('data-observe');
          void entry.target.offsetWidth;
          entry.target.setAttribute('data-observe', '');
        } else {
          entry.target.removeAttribute('data-observe');
          void entry.target.offsetWidth;
          entry.target.setAttribute('data-observe', 'child');
        }
        // Remove item from the array as it leaves the window
        // queue = queue.filter((item) => entry.target !== item.target);
      }
    }

  }, options);


  const elements = Array.prototype.slice.call(document.querySelectorAll(selector));

  elements.forEach((element) => intersectionObserver.observe(element) );

};


export default ioCascade;


/*

TODO: Check if an item that's out of view has a timer running and reset the timer if it does

TODO: Find a way to delay the start of an items animation

TODO: Use a data-threshold attribute to set the threshold for each individual item

TODO: Find a way to avoid thrashing when an animation moves an item in or out of the viewport

TODO: Set thresholds for 0 and 1, then detect if the element is at the top or the bottom of the screen before runnign function


*/



