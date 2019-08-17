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



// Check if an element is fully in the visible viewport before any transform is applied
const isInViewport = (element) => {
  // element.removeAttribute("data-io");
  element.style.transform = "translate3d(0, 0, 0)";
  element.style.transitionDuration = "0s";
  void(element.offsetHeight);
  const rect = element.getBoundingClientRect();
  // element.setAttribute("data-io", "");
  element.style.transform = "";
  void(element.offsetHeight);
  element.style.transitionDuration = "";
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};

// Check if an element is visible in viewport at all
// function isVisible(element) {
//   // element.removeAttribute("data-io");
//   element.style.transform = "translate3d(0, 0, 0)";
//   element.style.transitionDuration = "0s";
//   void(element.offsetHeight);
//   const top = element.getBoundingClientRect().top;
//   const bottom = element.getBoundingClientRect().bottom;
//   // element.setAttribute("data-io", "");
//   element.style.transform = "";
//   void(element.offsetHeight);
//   element.style.transitionDuration = "";
//   const vHeight = (window.innerHeight || document.documentElement.clientHeight);
//   return (
//     (top > 0 || bottom > 0) &&
//     top < vHeight
//   );
// }

// Check if element is past threshold before transforms are applied
function isVisible(el) {
  el.style.transform = "translate3d(0, 0, 0)";
  el.style.transitionDuration = "0s";
  void(el.offsetHeight);

  const elRect = el.getBoundingClientRect();

  el.style.transitionDuration = "";
  void(el.offsetHeight);
  el.style.transform = "";

  const vHeight = (window.innerHeight || document.documentElement.clientHeight);

  const elThresholdPos = elRect.top + (elRect.height * 0.5);

  const visible = (elThresholdPos > 0) && elThresholdPos < vHeight;

  console.log('visible', visible)

  return visible;
}






function ioCascade({
  selector = "[data-io]",
  delay = 100,
  threshold = 0,
  rootMargin = "0px 100px -100px 100px",
  root = null,
  once = false,
} = {}) {
  // Check if intersection observer is supported
  const iO = "IntersectionObserver" in window; /* true if supported */
  if (!iO) {
    console.log(
      "observeThis.js says intersection Observer is not supported in your browser"
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



  // Function to animate the first item from the array if ti exists and then animate the next one after
  const animateNext = queue => {
    if (queue.length >= 1 && ready) {
      console.log('queue length -->', queue.length);
      ready = false;
      const nextItem = queue.shift();

      // console.log("nextItem -->", nextItem);
      const itemDelay = nextItem.getAttribute("data-delay") || delay;

      const timer = setTimeout(() => {
        nextItem.classList.add("observed-in");
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

      console.log('intersection detected');

      // Check if element has children and if it does then add them all to the array
      if (entry.isIntersecting && isVisible(el)) {

          queue.push(el);
          animateNext(queue);
          console.log('added -->', el);
          console.log("entry.intersectionRatio", entry.intersectionRatio);

      } else if (!isVisible(el)) {
        console.log("removed", el);
        console.log("entry.intersectionRatio", entry.intersectionRatio);

        // remove the active class
        entry.target.classList.remove("observed-in");
    }

      // Remove from observer if options.once is true
      // if (entry.isIntersecting && once) {
      //   observer.unobserve(entry.target);
      // }
    }
  }, options);

  const elements = Array.prototype.slice.call(
    document.querySelectorAll(selector)
  );

  elements.forEach(element => intersectionObserver.observe(element));
}

export default ioCascade;

/*

TODO: Check if an item that's out of view has a timer running and reset the timer if it does

TODO: Find a way to delay the start of an items animation

TODO: Use a data-threshold attribute to set the threshold for each individual item

TODO: Find a way to avoid thrashing when an animation moves an item in or out of the viewport

TODO: Set thresholds for 0 and 1, then detect if the element is at the top or the bottom of the screen before runnign function


*/
