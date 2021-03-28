---
title: 深入剖析原型与原型链
categories: JavaScriptBasic
tags: prototype
date: 2021-03-25 11:14:28
---
MDN对JavaScript的描述是 基于原型 的脚本语言。

熟悉前端领域的同学们应该都听说过原型和原型链的概念，出于学习交流的目的，这篇文章用于梳理笔者对原型/原型链的个人理解。

<!--more-->

首先需要明确的是：在JavaScript中，我们认为一切都是对象实例。关于这段话的解释如下：
```javascript
// fn 是 Function构造函数的实例。 注：与使用new操作符构造的Function实例对象的区别是，new Function返回的是匿名的funcition实例对象
function fn() {};

// fnInstance 是 Fn构造函数的实例。 注：function Fn()与function fn()没有本质的区别，只是在开发中，如果采用全驼峰式写法，表示该函数为构造函数。
function Fn() {};
const fnInstance = new Fn();

// str 是 String构造函数的实例。
const str = 'str';
```

### 原型是JS实现继承的基石

通常，所有构造函数都存在一个prototype属性，prototype实际上就是大家通常说的原型对象。实际上准确来讲，prototype属性是一个引用类型，指向一个原型对象。

我们就可以认为，这个原型对象就是这个构造函数的一个属性，这个属性存在一个特殊的描述，叫做原型。

### prototype， [[prototype]] 与 \__proto__

首先介绍一下\__proto__，其本身最初并不是ES标准的一部分，起初由各浏览器厂商对对象实例的[[prototype]]进行了实现，便于开发者进行调试使用。最终ES基金会将这一实现标准化，所以在浏览器中，x.__proto__ === Object.getPrototypeOf(x)。其内部实现是采用了Object.defineProperty的getter与Object.getPrototypeOf()方法。

由构造函数实例化的对象实例，也存在一个引用类型的属性，叫做[[prototype]]属性，它也指向了构造函数prototype所指向的原型对象。这样所有被该构造函数实例化的对象，都共享了这个原型属性。

构造函数在JavaScript中是Function构造函数的实例，所以以下表达式结果为真。
```javascript
function fn() {}

Object.getPrototypeOf(fn) === Function.prototype;
```

需要特殊说明的是，原型对象中存在两个特殊的属性。
- constructor 该属性指向了引用它的构造函数本身
- [[prototype]] 该属性指向了引用它的构造函数*注(该构造函数是父构造函数的对象实例)的构造函数

如下所示，使用new操作符时，fn是fnInstance实例对象的构造函数，fnInstance的[[prototype]]属性，是指向fn.prototype的指针。

所有实例对象（fnInstance）都存在[[prototype]]属性，原型对象（fnInstanceProto）也不例外，因为原型也是实例对象。原型对象的[[prototype]]指向该实例对象（fnInstance）构造函数原型（fn.prototype）的[[prototype]]

```javascript
function fn() {}

// 原型对象内部结构
// fn.prototype = {
//   constructor: fn,
//   [[prototype]]: Object.prototype,
// }

fn.prototype.constructor === fn;
Object.getPrototypeOf(fn.prototype) === Object.prototype;

const fnInstance = new fn();

const fnInstanceProto = Object.getPrototypeOf(fnInstance);
```

### 原型链与继承
JavaScript在访问实例自身属性/方法时，如果不存在该属性/方法，就会查找并返回该实例对象的[[prototype]]属性所指向的原型对象中的属性，如果构造函数本身原型对象属性上也没有该属性/方法，则查找该构造函数prototype属性所指向的原型对象的[[prototype]]中的属性/方法，即该实例对象构造函数的构造函数的原型对象中的属性/方法。查找规则为向上递归查找，直到查找到null为止。

这种原型的层层引用关系，组成了原型链。即原型链是实现JS继承的机制。

### 原型链图解

![原型](/images/prototype/1.png)
