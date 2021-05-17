Array.prototype.myFilter = function (callback, thisArg) {
  
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }

  if (this == null) {
    throw new Error("Cant iterate over undefined or null");
  }

  let context = this;

  let Ob = Object(this);

  if (arguments.length > 1) {
    context = thisArg;
  }

  let len = Ob.length;

  let result = [];

  for (let i = 0; i < len; i++) {
    if (i in Ob) {
      if (callback.call(context, this[i], i, Ob)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};

function createDebounceFunction(fn, ms) {

  if (typeof fn !== 'function') {
    throw new Error("fn is not a function");
  }

  if (ms === undefined || (typeof ms !== 'string' && typeof ms !== 'number')) {
    throw new Error("ms invalid argument type or undefined");
  }

    let timeout;
    
    return function () {

        function fnCall() { 
           return fn.apply(this, arguments);
        }

        clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
}

const log100 = () => console.log(100);
const debounceLog100 = createDebounceFunction(log100, 1000);

debounceLog100();

setTimeout(debounceLog100, 200);
setTimeout(debounceLog100, 400);
