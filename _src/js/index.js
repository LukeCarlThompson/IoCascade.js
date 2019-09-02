import IoCascade from '../../dist/iocascade.esm.js';




const cascade = new IoCascade({
  selector: '[data-io]',
  classToAdd: 'io-in',
  delay: 100,
  threshold: 0.5,
  rootMargin: '0px 100px 0px 100px',
  root: null,
});