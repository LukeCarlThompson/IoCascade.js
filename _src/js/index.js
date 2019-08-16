import ioCascade from '../../dist/iocascade.esm.js';


console.log('Index.js file 😎');



const cascade = new ioCascade({
  selector: '[data-io]',
  delay: 100,
  threshold: 1,
  rootMargin: '0px 100px 0px 100px',
  root: undefined,
  once: true
});