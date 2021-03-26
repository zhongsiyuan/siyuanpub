### 通过babel-polyfill理解await工作原理
 
现今前端工程实践中，es6+大行其道。

异步逻辑处理过程也由最初的callback思想，再过渡到promise方案，再到如今最流行的async/await语法。


```javascript
async function main() {
    console.log('main-env');
    try {
        const result = await sleeper();
        console.log(result, 'result');
    } catch (e) {
        console.error(e);
    } finally {
        console.log('something...');
    }
}

async function sleeper() {
    console.log('sleeper-env');
    return new Promise((resolve, reject) => {
       try {
           console.log('sleeper-promise-env');
           setTimeout(() => {
               console.log('sleeper-promise-timer-env');
               resolve('success');
           });
       } catch (e) {
           reject(e);
       }
    });
}

main();
console.log('global-env');
```

```javascript
import 'core-js/modules/es6.object.to-string.js';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    console.log('main-env');

    try {
      const result = yield sleeper();
      console.log(result, 'result');
    } catch (e) {
      console.error(e);
    } finally {
      console.log('something...');
    }
  });
  return _main.apply(this, arguments);
}

function sleeper() {
  return _sleeper.apply(this, arguments);
}

function _sleeper() {
  _sleeper = _asyncToGenerator(function* () {
    console.log('sleeper-env');
    return new Promise((resolve, reject) => {
      try {
        console.log('sleeper-promise-env');
        setTimeout(() => {
          console.log('sleeper-promise-timer-env');
          resolve('success');
        });
      } catch (e) {
        reject(e);
      }
    });
  });
  return _sleeper.apply(this, arguments);
}

main();
console.log('global-env');
//# sourceMappingURL=async-post.es.js.map
```
