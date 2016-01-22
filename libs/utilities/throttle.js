/*
http://www.es6fiddle.net/i8d8e1um/
*/
let throttle = (func, ms=50, context=window) => {
  let to;
  let wait=false;
  return (...args) => {
    let later = () => {
      func.apply(context,args);
    };
    if(!wait)  {
      later();
      wait = true;
      to = setTimeout(() => {
        wait = false;
      },ms);
    }
  };
};

export default {throttle};
