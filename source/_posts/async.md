---
title: 通过BabelPolyfill理解Await工作原理
---
 
现今前端工程实践中，由于Babel的出现，各种ES的新特性大行其道。

处理异步逻辑的方式也由最初的Callback思想，过渡到Promise方案，再到如今最流行的Async/Await。

实际上，根据Promise A+规范说明，Promise也是Callback方案，不少社区开发者声称Async/Await是Promise的语法糖，事实如此吗？

我们今天使用BabelPolyfill和一个简单的用例，将代码转为支持Chrome54版本的语法*注(Chrome54不支持Async/Await)，来进一步验证Async/Await的内部原理。

```javascript
async function main() {
    console.log('main-env');
    const fn1Result = await fn1();
    console.log(fn1Result, 'fn1Result');
    const fn2Result = await fn2();
    console.log(fn2Result, 'fn2Result');
}

function fn1() {
    console.log('fn1-env');
    return 'success-fn1';
}

async function fn2() {
    console.log('fn2-env');
    return 'success-fn2';
}

main();
console.log('global-env');

```

```javascript
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;

    console.log(info, arguments);
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
    const fn1Result = yield fn1();
    console.log(fn1Result, 'fn1Result');
    const fn2Result = yield fn2();
    console.log(fn2Result, 'fn2Result');
  });
  return _main.apply(this, arguments);
}

function fn1() {
  console.log('fn1-env');
  return 'success-fn1';
}

function fn2() {
  return _fn.apply(this, arguments);
}

function _fn() {
  _fn = _asyncToGenerator(function* () {
    console.log('fn2-env');
    return 'success-fn2';
  });
  return _fn.apply(this, arguments);
}

main();
console.log('global-env');
//# sourceMappingURL=async-post.es.js.map

```

通过上述代码可以看出，实际Async/Await是使用Generator + Promise，通过递归不停的调用Generator中的Next函数，直到返回Done。

那么处在每个被Yield关键字描述的语句的上一段落，就会逐行执行。如果被Yield关键字描述的方法中依旧存在异步内容，则再次被压入执行栈中并执行。

所以我们可以认为，被Await关键字描述的语句后的段落，实际上相当于书写在Promise.then中。

并且，查看被babel重新编译后的代码，对比函数fn1与async fn2可以看出，一个被Async关键字描述的方法，则一定会返回一个Promise。
