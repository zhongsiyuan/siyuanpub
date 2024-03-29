---
title: 前端之路：如何做好一个npm时代的前端程序员
categories: upgrade
tags: upgrade
date: 2021-05-31 12:42:28
---

马上从业两年了，在开发岗位上经历了很多，从一个个工程中不断的实践和成长。以后的生涯中，要不断的修正自己，沉下心继续学习，不忘自己的初心。总结一下这两年的感悟，希望给喜欢开发、热爱工程的同学们提供一些帮助。

<!--more-->

## 如何学习
作为技术从业人员，不应该浮躁的追求新兴技术，最终仅仅是又多了解了一些新词和热词，了解了几个API。

扎实的基础才是一切的根基，良好的基础可以帮助你写出更优的代码，快速的debug能力。你可以完全洞悉你所编写代码的工作方式，知道它运行时发生的事情。做技术一定要沉下心来，不能急于求成，你认为它是重要的，就一定要花时间去消化和理解，而不是只知其一。要有自己的方向，不要盲目跟风，在没有足够内功的情况下，适度的且有目的的去了解新兴技术。

阅读优秀开源作品的代码。你可以从中学到作者的编码习惯、架构设计思想，甚至是你没见过的一些特殊的写法与用法。

## 避免引入不成熟的方案
在工程中，引入的任何新的特性、或是新的轮子都有可能成为未来的技术债。

这些年轻的轮子往往没有经过市场的验证，在项目初期，由于项目复杂度低，或是需求相对简单，或是你没有对项目长期发展做出有效的评估，或对"新技术"有狂热的追求，导致你最终选用一个年轻、炫酷的轮子。 当项目的功能逐渐丰富时，流行的轮子或特性已经与系统内的代码严重捆绑。此时，如果项目上需要做一些变更，出现的各种不满足现有需求的问题，或是轮子中隐性的问题逐渐凸显出来，此时要么引入可能导致更多问题的补丁，要么只能花费大量人力替换旧的方案，无论如何，它的代价都可能是巨大的。

## 避免过度抽象
程序设计的思路是尽量做到高内聚，低耦合。抽象的粒度往往需要对标准规范、系统规模、复杂度、场景等情况进行综合的考虑。

举个例子，在React中，函数组件的更新是函数被重新调用产生的结果。我们可以将hook抽象到一个单独的文件中，但是模块化会导致这个单独文件中的所有的声明将会在第一次被调用后一直占用内存，即使它的调用组件已经被销毁了。也许我们可以换一个思路？我们使用函数写法，return一个new出来的对象，这样它可以和这个组件保持同步，调用组件内存被回收的时候，它也同样会被回收，可这样引起更新的组件拿到的hook，已经不是上一个hook，这时还可能会导致组件无限更新的bug等问题。当你特意而为之的代码不能带来额外的增益时，最好保持传统，使用官方的建议一般是最明智的选择。

## 取舍
在真实的开发场景下，有可能遇到性能、维护性、可用性取舍的问题。

如果你正在编写系统级的、细粒度的组件或是工具，一般情况需要偏向考虑可用性和性能带来的影响，其次才是维护性。一个可用的基本工具，用户只关心它的输入和输出。它的具体实现，与下游开发者无关。

如果你正在编写一些业务级别的代码，那么较高的扩展性、兼容性是你需要更多去考虑的问题。当然，这里不是说我们不需要做性能上的优化，而是在保证其他开发者，也能在后续过程中，良好的维护这些代码，降低其开发过充中的心智负担。
