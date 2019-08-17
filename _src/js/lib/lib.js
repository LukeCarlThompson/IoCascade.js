/*

TODO: Check if an item that's out of view has a timer running and reset the timer if it does

TODO: Check if an item that has been scrolled out of view is in the queue and remove it if it is. So it doesn't hold up the other animations.

TODO: Fire custom event when each element enters the viewport

TODO: Package up default CSS

TODO: write some docs

TODO: Test out the fallback for older browsers

*/





/* 
Defaults
{
  selector: css selector for your dom nodes,
  delay: miliseconds of delay,
  threshold: number form 0 to 1 that is a percent of the element that should be in the viewport before animating,
  rootMargin: four px values that adjust the margin of the intersection window,
  root: CSS selector to define the scrolling container, defaults to window,
}
*/


function ioCascade({
  selector = "[data-io]",
  delay = 100,
  threshold = 0,
  rootMargin = "0px 100px 0px 100px",
  root = null
} = {}) {
  // Check if intersection observer is supported
  const iO = "IntersectionObserver" in window; /* true if supported */
  if (!iO) {
    console.log(
      "The javascript feature intersection Observer is not supported in your browser. We suggest upgrading to a more modern browser for a better experience."
    );
    document.querySelectorAll(selector).forEach(item => {
      item.removeAttribute("data-io");
    });
    return;
  }

  let ready = true;
  let queue = [];
  let timer;


const isChild = el => el.getAttribute("data-io") === "child";

  // Function to animate the first item from the array if it exists and then animate the next one after
  const animateNext = queue => {
    if (queue.length >= 1 && ready) {
      ready = false;
      const nextItem = queue.shift();
      const itemDelay = nextItem.getAttribute("data-delay") || delay;

      timer = setTimeout(() => {
        nextItem.classList.add("io-in");
        ready = true;
        animateNext(queue);
        console.log('timeout ran')
      }, itemDelay);
    }
  };

  const options = {
    root,
    threshold,
    rootMargin,
  };

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const el = entry.target;

      // Check if element has children and if it does then add them all to the array
      if (entry.intersectionRatio >= threshold && !isChild(el)) {
        const children = el.querySelectorAll('[data-io="child"]');

        if (children.length) {
          queue.push(el);
          children.forEach(child => {
            queue.push(child);
          });
          animateNext(queue);
        } else if(entry.isIntersecting) {
          queue.push(el);
          animateNext(queue);
        }
        // Remove element from observer
        observer.unobserve(entry.target);
      }
    }
  }, options);

  const elements = Array.prototype.slice.call(
    document.querySelectorAll(selector)
  );

  elements.forEach(element => intersectionObserver.observe(element));
}

export default ioCascade;