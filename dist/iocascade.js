var iocascade=function(){"use strict";function e(e){e.style.transform="translate3d(0, 0, 0)",e.style.transitionDuration="0s",e.offsetHeight;var t=e.getBoundingClientRect();e.style.transitionDuration="",e.offsetHeight,e.style.transform="";var o=window.innerHeight||document.documentElement.clientHeight,n=t.top+.5*t.height,r=n>0&&n<o;return console.log("visible",r),r}return function(t){void 0===t&&(t={});var o=t.selector;void 0===o&&(o="[data-io]");var n=t.delay;void 0===n&&(n=100);var r=t.threshold;void 0===r&&(r=0);var i=t.rootMargin;void 0===i&&(i="0px 100px -100px 100px");var s=t.root;void 0===s&&(s=null);var a=t.once;if(void 0===a&&(a=!1),!("IntersectionObserver"in window))return console.log("observeThis.js says intersection Observer is not supported in your browser"),void document.querySelectorAll(o).forEach(function(e){e.removeAttribute("data-io")});var l=!0,c=[],d=function(e){if(e.length>=1&&l){console.log("queue length --\x3e",e.length),l=!1;var t=e.shift(),o=t.getAttribute("data-delay")||n;setTimeout(function(){t.classList.add("observed-in"),l=!0,d(e),console.log("timeout ran")},o)}},u=new IntersectionObserver(function(t,o){for(var n=0;n<t.length;n++){var r=t[n],i=r.target;console.log("intersection detected"),r.isIntersecting&&e(i)?(c.push(i),d(c),console.log("added --\x3e",i),console.log("entry.intersectionRatio",r.intersectionRatio)):e(i)||(console.log("removed",i),console.log("entry.intersectionRatio",r.intersectionRatio),r.target.classList.remove("observed-in"))}},{root:s,threshold:r,rootMargin:i});Array.prototype.slice.call(document.querySelectorAll(o)).forEach(function(e){return u.observe(e)})}}();