# 一、一级题目

## 数据类型

### 1.JavaScript有哪些数据类型，它们的区别？



### 2.数据类型检测的方式有哪些

①typeof

使用 typeof 检测数据类型，首先返回的都是一个字符串，其次字符串中包含了对应的数据类型
 例如："number"、"string"、"boolean"、“undefined”、"function"、"object"

局限性：
a、`typeof null === "object"`
b、不能具体细分是数组、正则还是对象中其他值，使用 typeof 检测数据类型对于对象数据类型中的值返回结果都是"object"

②instanceof

**检测某一个实例是否属于某个类**

局限性：
 a、**不能用来处理字面量方式创建出来的基本数据类型值**，对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建出来的结果是有区别的。严格意义上来说只有实例创建出来的结果才是标准的对象数据类型值，字面量方式创建出来的基本数据类型值，是不严谨的实例，
 b、instanceof 特性，只要在当前实例的原型上，检测出来的结果都是 true

③constructor构造函数

和 instanceof 非常相似，用 constructor 检测 Object 和 instanceof 不一样，一般情况下检测不了

④**Object.prototype.toString.call()** 是最准确最常用方法

首先获取 Object 原型上的 toString 方法，让方法执行，并且改变方法中的 this 关键字指向
 **所有数据类型中他的原型上都有toString方法，除了Object.prototype.toString不是把数据值转为字符串，其余都是转化为字符串。**
 Object.prototype.toString 是返回当前方法的执行主体（方法中的 this）所属类的详细信息

### 3.判断数组的方式有哪些

 Array.isArray()

Object.prototype.toString.call()

obj instanceof Array

Array.prototype.isPrototypeOf(obj);

### 4.null和undefined区别

- null 指空对象，但它是被定义过的

- undefined 指声明未赋值的对象或者是不存在的对象属性值

- null：

  （1）作为函数的参数，来表示该函数的参数不是对象

  （2）作为对象原型链的终点

  ```javascript
  Object.getPrototypeOf(Object.prototype)
  // null
  ```

  undefined：

  （1）变量被声明了，但没有赋值时，就等于undefined。

  （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

  （3）对象没有赋值的属性，该属性的值为undefined。

  （4）函数没有返回值时，默认返回undefined。

### 5.instanceof操作符的实现原理及实现

### 6.为什么0.1+0.2！==0.3，如何让其相等

0.1的二进制是0.0001100110011001100...（1100循环），0.2的二进制是：0.00110011001100...（1100循环），这两个数的二进制都是无限循环的数。那JavaScript是如何处理无限循环的二进制小数呢？

JavaScript中所用的数字包括整数和小数，但是只有一种类型——Number，它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位，再加上前面的1，其实就是保留53位有效数字，剩余的舍去，遵从“0舍1入”的原则。

根据这个原则，0.1和0.2的二进制数相加，再转化为十进制数就是：0.30000000000000004
```javascript
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

```

### 7.==操作符的强制类型转换规则

```text
1.判断两者类型是否相同，若相同直接比较大小

2.类型不同的话，进行类型转换

3.若一个是null，一个是undefined，返回true

4.若一个是string，一个是number，把string转换成number

                1 == '1'
                         ↓
                1 == 1

5.若一个是boolean，把boolean转换成0或1

                '1' == true

                 ↓

                '1' == 1

                ↓

                1 == 1

6.若一个是object，另一个是string,number或symbol,则把object转换成原始类型
Object与任何类型比较，都是 自身调用ToPrimitive()之后的结果 与其他类型进行比较

                '1' == { name: 'js' }

                ↓

                '1' == '[object Object]'

```



## 基础

### 1.new操作符实现的实现原理

1. 在内存中创建一个新对象

2. 这个新对象内部的_proto_指针被赋值给构造函数的prototype属性

3. 构造函数内部的this指向新对象

4. 执行构造函数内部的代码

5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

   ```javascript
   function People(name) {
       this.name = name; //实例上的属性
   }
   People.prototype.say = function () {
       console.log('haha')
   }
   let ada = new People('ada');
   
   console.log(ada.name); // 'ada'
   ada.say(); // 'haha'
   //实现new
   function myNew() {
       let Constructor = Array.prototype.shift.call(arguments) //1、通过参数shift方法取到Constructor
       let obj = {} ///2、在内存中定义一个新对象
       obj._proto_ = Constructor.prototype // 3、新对象的_proto_指针指向构造函数的prototype属性
       let r = Constructor.apply(obj,arguments); // 4、this指向新对象，并执行构造函数代码
   }
   let ada = myNew(People, 'ada')
   console.log(ada)
   ```

   

### 2.数组有哪些原生方法

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法
- 数组归并方法 reduce() 和 reduceRight() 方法

### 3.什么是DOM什么是BOM

1、DOM，文档对象模型（Document Object Model）。
2、DOM是 W3C（万维网联盟）的标准，DOM定义了访问HTML和XML文档的标准。
W3C DOM由以下三部分组成：

- 核心DOM - 针对任何结构化文档的标准模型

- XML DOM - 针对 XML 文档的标准模型

- HTML DOM - 针对 HTML 文档的标准模型

-   DOM模型将整个文档（XML文档和HTML文档）看成一个树形结构，

  在DOM中，HTML文档的层次结构被表示为一个树形结构。并用document对象表示该文档，树的每个子节点表示HTML文档中的不同内容。
  每个载入浏览器的 HTML 文档都会成为 Document 对象,Document是探索DOM的入口,利用全局变量document可以访问Document对象  

  ![img](JavaScript.assets/v2-51b79fc0af49248ac5ad1cfd5603512e_720w.jpg)

  

  

  <hr>

  BOM 是 Browser Object Model，浏览器对象模型。
  DOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

  - BOM：浏览器对象模型(Brower Object Model)，是用于操作浏览器而出现的API，BOM对象则是Javascript对BOM接口的实现。
  - BOM提供了独立于内容的、可以与浏览器窗口进行交互的对象结构。通过BOM对象可以访问浏览器功能部件和属性。
  - BOM对象由多个对象构成，其中代表浏览器窗口的window对象是Javascript顶层对象，其他BOM对象均为window对象的子对象。被作为window对象的属性来引用。
  - 其他BOM对象都是在window对象中进行操作。
  - BOM对象 是 各个浏览器厂商根据 DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]

  BOM对象最根本的是window。

  ![img](JavaScript.assets/v2-a66d89cf1c74eb65da275e9b6685050f_720w.jpg)

  ![img](JavaScript.assets/v2-517780104e7410b094f00ff577615ec7_720w.jpg)

  ![img](JavaScript.assets/v2-1547e0fd719c3c1128553deadb4c3be6_720w.jpg)

### 4.对类数组对象的理解，如何转化为数组

**和数组类似，拥有length属性，可以通过索引来访问或设置里面的元素，但是不能使用数组的方法。**

转换方法：

1.slice

语法：slice(begin,end) 方法选择一个从开始到结束(不包括结束)的数组的一部分浅拷贝到一个新的数组对象，方法不会改变原数组。如果是对象则拷贝对象的引用到新数组，如果是基本类型则会拷贝这些值到新数组。

如果省略begin则会从0开始。如果end被省略则会抽取到最后一个元素，如果end数值大于数组长度则会抽取到最后一个元素。

使用Array.prototype.slice.call(arguments)可以将类数组转化为数组对象，[].slice.call(arguments)亦可

```javascript
1 function list(){
2     return Array.prototype.slice.call(arguments);  
3 }
4 
5 var list=list(1,2,3);//[1,2,3]
```

2.splice

语法：splice(start)

​         splice(start,deleteCount)

​         splice(start,deleteCount,item1,item2......)

返回一个包含被删除元素的数组，start是必须值，其他是可选值，item表示要添加的元素，splice方法会直接对数组进行修改。

Array.prototype.splice.call(arguments,0);

**3.Es6 Array.from**

**语法：Array.from(arguments)**

4.Array.prototype.concat.apply([],arguments

)

### 5.对AJAX的理解，实现一个AJAX请求

Ajax说一种异步请求数据的Web开发技术，对于改善用户的体验和页面性能提升很有帮助。简单地说，Ajax实现了在不重新刷新页面的情况下，通过异步请求来获取后台数据，并在网页上呈现出来。同时，Ajax请求获取的是数据而不是一整个HTML文档，因此也节省了网络带宽，让用户的使用体验变得更加流畅。

```javascript
const SERVER_URL = "/server";
// 1.创建一个XMLHttpRequest对象
let xhr = new XMLHttpRequest();
// 2.在这个对象上使用open方法创建一个 Http 请求
// open方法所需要的参数上请求的方法、请求的地址、是否异步喝用户的认证信息
xhr.open("GET", url, true);
// 3.在发起请求前，可以为这个对象添加一些信息和状态监听函数
xhr.onreadystatechange = function() {
  // 设置监听函数后，当对象的readyState变为4的时候，代表服务器返回的数据接收完成
  // readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。
  //  readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义
  //  0：未初始化 -- 尚未调用.open()方法；
  //  1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
  //  2：发送 -- 已经调用.send()方法，但尚未接收到响应；
  //  3：接收 -- 已经接收到部分响应数据；
  //  4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 4.当对象的属性和监听函数设置完成后，最后调用sent方法来向服务器发送 Http 请求，可以传入参数作为发送的数据体
xhr.send(null);
```



### 6.js为什么要进行变量提升，它导致了什么问题？

首先我们要知道，JS在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行。

在解析阶段，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。

全局上下文：变量定义，函数声明
函数上下文：变量定义，函数声明，this，arguments
在执行阶段，就是按照代码的顺序依次执行。

那为什么会进行变量提升呢？主要有以下两个原因：

提高性能，容错性更好

可能导致的问题：

```javascript
var tmp = new Date();

function fn(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';
	}
}

fn();  // undefined
//内层tmp 覆盖了外层tmp 导致输出undefined】
-----------------------------------------------------------
var tmp = 'hello world';

for (var i = 0; i < tmp.length; i++) {
	console.log(tmp[i]);
}

console.log(i); // 11
//由于遍历时定义的i会变量提升成为一个全局变量，在函数结束之后不会被销毁，所以打印出来11。
```



## 原型

### 1.对原型，原型链的理解

**原型**

无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向
原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构
造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而
异，可能会给原型对象添加其他属性和方法。
在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自
Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构
造函数的原型对象。

**原型链**

在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个
实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原
型对象，然后在原型对象上找到属性后，再返回对应的值。



### 2.原型链指向

所有的对象的“**proto**”属性指向它的构造函数的prototype属性。

eg：

`Person`是一个函数类型的变量，因此自带了`prototype`属性，`prototype`属性中的`constructor`又指向`Person`本身；通过`new`关键字生成的`Person`类的实例`p1`，通过`__proto__`属性指向了`Person`的原型。这里的`__proto__`只是为了说明实例`p1`在内部实现的时候与父类之间存在的关联（指向父类的原型），在实际操作过程中实例可以直接通过`.`获取父类原型中的属性，从而实现了继承的功能。

![img](JavaScript.assets/20180415102953721)



## ES6

### 1.let、var、const的区别

#### ①var

在ES5中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象

使用`var`声明的变量存在变量提升的情况

使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

在函数中使用使用`var`声明变量时候，该变量是局部的

而如果在函数内不使用`var`，该变量是全局的

#### ②let

`let`是`ES6`新增的命令，用来声明变量

用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效

不存在变量提升

这表示在声明它之前，变量`a`是不存在的，这时如果用到它，就会抛出一个错误

只要块级作用域内存在`let`命令，这个区域就不再受外部影响

使用`let`声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

最后，`let`不允许在相同作用域中重复声明

#### ③const

`const`声明一个只读的常量，一旦声明，常量的值就不能改变

这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值

如果之前用`var`或`let`声明过变量，再用`const`声明同样会报错

***const实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动***

对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变

### 2.箭头函数与普通函数的区别

1.写法不同

箭头函数使用箭头定义，普通函数中没有。

```javascript
//箭头函数
(参数1，参数2...参数n)=>{  //代码段 }
//普通函数
function 函数名(参数1，参数2...参数n)=>{  //代码段  }
```



**2.箭头函数不能用于构造函数**

普通函数可以用于构造函数，以此创建对象实例。

**3.箭头函数中this的指向不同**

箭头函数自身没有this，它的this是父级普通函数的this.
在普通函数中，this总是指向调用它的对象或者，如果用作构造函数，它指向创建的对象实例。

**4.箭头函数不具有arguments对象**

每一个普通函数调用后都具有一个arguments对象，用来存储实际传递的参数。
但是箭头函数并没有此对象。

5.箭头函数不能当做Generator函数，不能使用yield关键字。
6.箭头函数不具有prototype原型对象。
7.箭头函数不具有super。

### 3.对rest参数的理解(...)

Rest 参数(剩余参数)
Rest 参数（剩余参数语法）可以把一个不定数量的参数表示为一个数组。

函数的最后一个命名参数以三个点...为前缀，则它就会成为一个由剩余参数组成的真数组。

例如，我们需要把所有的参数都放到数组 args 中：

```javascript
function sumAll(...args) { // 数组名为 args
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
//或者获取前面几个参数作为变量，并将剩余的参数收集起来。：

function(a, b, ...theArgs) {
  // ...
}
```



注意!!!

Rest 参数必须放到参数列表的末尾

Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误：

```javascript
function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
  // error
}
```

...rest 必须处在最后。

**Rest 参数和 arguments 的区别**
**在过去，JavaScript 中没有 rest 参数，而使用 arguments 是获取函数所有参数的唯一方法。**

但缺点是，尽管 **arguments 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 arguments.map(…) 等方法。**

Spread 语法(展开语法)
Spread 语法(展开语法) 可以将数组表达式或者string在语法层面展开；将对象表达式按key-value的方式展开。

```javascript
//以 Math.max 为例：

let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5（spread 语法把数组转换为参数列表）

//还可以通过这种方式传递多个可迭代对象：

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8

// 连接多个数组
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];

//构造字面量对象时使用展开语法

var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }


```

### 4.new一个箭头函数会怎么样

**箭头函数、没有prototype、没有自己的this指向、不可以使用arguments、自然不可以new。**

1）new关键字的执行过程,**new操作实质上是定义一个具有构造函数内置对象的实例**。

new构造函数后，会在内存中创建一个空对象
this就会指向刚才创建的这个空对象
执行构造函数中代码，给空对象添加属性方法
返回这个新的对象（所以构造函数中不需要return）
2）箭头函数
箭头函数内的this是静态的，指向定义时所在的对象，而不会是调用时的对象，this指向不可以改变

```javascript
    var age=18
    var obj={
        age:20,
        getAge(){
            //构造函数，谁调用，this就指向谁
            console.log(this.age);
        },
        getAge1:()=>{
            //this是静态的，指向定义时所在的对象（window对象），不能作为构造函数
            console.log(this.age);
        },
    }
    obj.getAge()//20
    obj.getAge1()//18
```
## 异步编程

### 1.对Promise的理解

promise是是一种异步操作的解决方案，把写法复杂的传统的回调函数和监听事件的异步操作，用同步代码的影视表达出来。避免了多级异步操作的回调函数的嵌套。

用于异步操作
可以把异步操作队列化，按照期望的顺序执行，返回复合预期的结果
可以把在对象之间传递和操作promise，帮助我们处理队列

期约是一个有状态的对象，可能处于如下 3 种状态之一：

 待定（pending）
 兑现（fulfilled，有时候也称为“解决”，resolved）
 拒绝（rejected）



### 2.promise的基本用法

1）then表示异步操作成功后的数据状态改变为reslove

Promise.prototype.then()是为期约实例添加处理程序的主要方法。这个 then()方法接收最多
两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话，
则会在期约分别进入“兑现”和“拒绝”状态时执行。

注：两个处理程序参数都是可选的。而且，传给 then()的任何非函数类型的参数都会被静
默忽略。如果想只提供 onRejected 参数，那就要在 onResolved 参数的位置上传入 undefined。这
样有助于避免在内存中创建多余的对象，对期待函数参数的类型系统也是一个交代。

```javascript
function onResolved(id) {
 setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
 setTimeout(console.log, 0, id, 'rejected');
}
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));
// 非函数处理程序会被静默忽略，不推荐
p1.then('gobbeltygook');
// 不传 onResolved 处理程序的规范写法
p2.then(null, () => onRejected('p2'));
// p2 rejected（3 秒后）
```



2）catch表示异步操作失败后的数据状态改变为reject,

Promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：
onRejected 处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用 Promise.prototype.
then(null, onRejected)。

3）all表示把多个没有关系的promise封装成一个pomise对象使用then返回一个数组数据

 Promise.all()
Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个
可迭代对象，返回一个新期约：

```javascript
合成的期约只会在每个包含的期约都解决之后才解决：
let p = Promise.all([
 Promise.resolve(),
 new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
setTimeout(console.log, 0, p); // Promise <pending>
p.then(() => setTimeout(console.log, 0, 'all() resolved!'));
// all() resolved!（大约 1 秒后）
如果至少有一个包含的期约待定，则合成的期约也会待定。如果有一个包含的期约拒绝，则合成的
期约也会拒绝：
// 永远待定
let p1 = Promise.all([new Promise(() => {})]);
setTimeout(console.log, 0, p1); // Promise <pending>
// 一次拒绝会导致最终期约拒绝
let p2 = Promise.all([
 Promise.resolve(),
 Promise.reject(),
 Promise.resolve()
]);
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught (in promise) undefined
如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序：
let p = Promise.all([
 Promise.resolve(3),
 Promise.resolve(),
 Promise.resolve(4)
]);
p.then((values) => setTimeout(console.log, 0, values)); // [3, undefined, 4]
```



promise构造函数有两个变量,**reslove**用于返回异步操作执行成功的函数,**reject**用于返回异步操作执行失败后的函数，配合then与catch一起使用

### 3.async/await的理解

#### async

async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。因此对async函数可以直接then，返回值就是then方法传入的函数。

```javascript
// async基础语法
async function fun0(){
    console.log(1);
    return 1;
}
fun0().then(val=>{
    console.log(val) // 1,1
})

async function fun1(){
    console.log('Promise');
    return new Promise(function(resolve,reject){
        resolve('Promise')
    })
}
fun1().then(val => {
    console.log(val); // Promise Promise
})

```

#### await

await 也是一个修饰符，只能放在async定义的函数内。可以理解为等待。

await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；

如果不是Promise对象：把这个非promise的东西当做await表达式的结果。

```javascript
async function fun(){
    let a = await 1;
    let b = await new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('setTimeout')
        },3000)
    })
    let c = await function(){
        return 'function'
    }()
    console.log(a,b,c)
}
fun(); // 3秒后输出： 1 "setTimeout" "function"
--------------------------------------------------------------------------------------------------
function log(time){
    setTimeout(function(){
        console.log(time);
        return 1;
    },time)
}
async function fun(){
    let a = await log(1000);
    let b = await log(3000);
    let c = log(2000);
    console.log(a);
    console.log(1)
}
fun(); 
// 立即输出 undefined 1
// 1秒后输出 1000
// 2秒后输出 2000
// 3秒后输出 3000

```



### 4.async/await对比Promise的优势

1.简洁
        节省代码。即使是在这么一个简单的例子中，我们也节省了可观的代码。我们不需要为.then编写一个匿名函数来处理返回结果，也不需要创建一个data变量来保存我们实际用不到的值。我们还避免了代码嵌套。这些小优点会在真实项目中变得更加明显。
 2.错误处理
       async/await终于使得用同一种构造（古老而好用的try/catch）处理同步和异步错误成为可能。在下面这段使用promise的代码中，try/catch不能捕获JSON.parse抛出异常，因为该操作是在promise中进行的。要处理JSON.parse抛出的异常，你需要在promise上调用.catch并重复一遍异常处理的逻辑。通常在生产环境中，异常处理逻辑都远比console.log要复杂，因此这会导致大量的冗余代码。

  3.条件分支

假设有如下逻辑的代码。请求数据，然后根据返回数据中的某些内容决定是直接返回数据还是继续请求更多数据：

```javascript
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```

​       只是阅读这些代码已经够让你头疼的了。一不小心你就会迷失在这些嵌套(6层)，空格，返回语句中。
在使用async/await改写后，这段代码的可读性大大提高了。

```javascript
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```

​       4.中间值
​       你可能会遇到这种情况，请求promise1，使用它的返回值请求promise2，最后使用这两个promise的值请求promise3，对应的代码看起来是这样的：

```javascript
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}
```


​       如果promise3没有用到value1，那么我们就可以把这几个promise改成嵌套的模式。如果不喜欢这种编码方式，也可以把value1和value2封装在一个Promise.all调用中以避免深层次的嵌套：

```javascript
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something          
      return promise3(value1, value2)
    })
}
```

​        这种方式为了，保证可读性而牺牲了语义。除了避免嵌套的promise，没有其他理由要把value1和value2放到一个数组里。
​       同样的逻辑，如果换用async/await编写，就会非常简单直观。

```javascript
const makeRequest = async () =>{
	const value1 = await promise1()
	const value2 = await promise2(value1)
	return promise3(value1,value2)
}
```

​       5.异常堆栈
​       假设有一段串行调用多个promise的代码，在promise串中的某一点抛出了异常：

```javascript
const makeRequest = () => {
  return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
      throw new Error("oops");
    })
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
  })
```

​       从promise串返回的异常堆栈中，没有包含关于异常是从哪一环节抛出的信息。更糟糕的是，它还会误导你，它包含的唯一的函数名是callAPromise，然而，该函数与此异常并无关系。（这种情况下，文件名和行号还是有参考价值的）。
​       然而，在使用了async/await的代码中，异常堆栈指向了正确的函数：

```javascript
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })
```

​       这带来的好处，在本地开发环境中可能并不明显，但当你想要在生产环境的服务器上，获取有意义的异常信息时，这会非常有用。在这种情况下，知道异常来自maske Request而不是一连串的then调用会有意义的多。
​        6.调试
​       最后一点，使用async/await最大的优势在于它很容易被调试。由于以下两个原因，调试promise一直依赖都是很痛苦的。
​        ①你不能在一个返回表达式的箭头函数中设置断点（因为没有代码块）

​	②如果你在一个.then代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的.then代码块，因为调试器只能跟踪同步代码的【每一步】。
​	通过使用async/await，你不必再使用箭头函数。你可以对await语句执行步进操作，就好像它们都是普通的同步调用一样。



## 执行上下文/作用域链/闭包

### 1.对闭包的理解

**闭包的定义：**
如果在一个内部函数里，对在外部作用域(但不是全局作用域)的变量进行引用，那么内部函数就被认为是闭包(closure)。

||   闭包指的是那些引用了另一个函数作用域中变量的函数。

通常是在嵌套函数中实现的。比如，下面是之前展示的 createComparisonFunction()函数，注
意其中加粗的代码：

```javascript
function createComparisonFunction(propertyName) {
return function(object1, object2) {
let value1 = object1[propertyName];
let value2 = object2[propertyName];
if (value1 < value2) {
return -1;
} else if (value1 > value2) {
return 1;
} else {
return 0;
}
};
}
```


这里加粗的代码位于内部函数（匿名函数）中，其中引用了外部函数的变量 propertyName。在这
个内部函数被返回并在其他地方被使用后，它仍然引用着那个变量。这是因为内部函数的作用域链包含
createComparisonFunction()函数的作用域。

**闭包的特点：**
1.可以读取自身函数外部的变量(沿着作用域链寻找)先从自身开始查找，如果自身没有才会继续往上级查找，自身如果拥有将直接调用。(哪个离的最近就用哪一个)
2.延长内部变量的生命周期
3.函数b嵌套在函数a内部
4.函数a返回函数b
**闭包的作用：**
在函数a执行完并返回后，闭包使得JavaScript的垃圾回收机制不会收回a所占用的资源，因为a的内部函数b的执行需要依赖a中的变量，闭包需要循序渐进的过程。

**闭包的构成：**
闭包由俩个部分构成：

1.函数
2.创建该函数的环境
**应用场景：**
保护函数内的变量安全。函数a中只有函数b才能访问，而无法通过其他途径访问到，因此保护了i的安全性。
在内存中维持一个变量

**闭包的缺点：**

在JavaScript中，如果一个对象不再被引用，那么这个对象就会被垃圾回收程序回收。如果俩个对象互相引用，而不再被第3者所引用，那么这俩个互相引用的对象也会被回收。因为函数a被b引用，b又被a外的c引用，这就是为什么函数a执行后不会被回收的原因。

**滥用闭包会造成内存泄露**，因为闭包中引用到的包裹函数中定义的变量都永远不会被释放，所以我们应该在必要的时候，及时释放这个闭包函数。

### 2.对作用域、作用域链的理解

**全局作用域和函数作用域**
（1）全局作用域

最外层函数和最外层函数外面定义的变量拥有全局作用域
所有未定义直接赋值的变量自动声明为全局作用域
所有window对象的属性拥有全局作用域
全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突。
（2）函数作用域
函数作用域声明在函数内部的变零，一般只有固定的代码片段可以访问到
作用域是分层的，内层作用域可以访问外层作用域，反之不行
块级作用域
使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由{ }包裹的代码片段）
let和const声明的变量不会有变量提升，也不可以重复声明
在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。

**作用域链**
当查找变量的时候都发生了什么？

1.会先从当前上下文的变量对象中查找；
2.如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找；
一直找到全局上下文的变量对象，也就是全局对象；
3.作用域链的顶端就是全局对象；
这样由多个执行上下文的变量对象构成的链表就叫做作用域链，从某种意义上很类似原型和原型链。

作用域链和原型继承查找时的区别：

查找一个普通对象的属性，但是在当前对象和其原型中都找不到时，会返回undefined
查找的属性在作用域链中不存在的话就会抛出ReferenceError。

------------------------------------------------


### 3.对执行上下文的理解

执行上下文

1. 执行上下文类型
   （1）全局执行上下文
   任何不函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。
   （2）函数执行上下文
   当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。
   （3）eval函数执行上下文
   执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用，不做介绍。
2. 执行上下文栈
   JavaScript引擎使用执行上下文栈来管理执行上下文
   当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。
3. 创建执行上下文
   1）创建阶段
   （1）this绑定
   在全局执行上下文中，this指向全局对象（window对象）
   在函数执行上下文中，this指向取决于函数如何调用。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined
   （2）创建词法环境组件
   词法环境是一种有标识符——变量映射的数据结构，标识符是指变量/函数名，变量是对实际对象或原始数据的引用。
   词法环境的内部有两个组件：环境记录器:用来储存变量个函数声明的实际位置 外部环境的引用：可以访问父级作用域
   （3）创建变量环境组件
   变量环境也是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。
   2）执行阶段
   此阶段会完成对变量的分配，最后执行完代码。
   简单来说执行上下文就是指：
   在执行一点JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。

## this/call/apply/bind

![](JavaScript.assets/this指向.png)

### 1.对this对象的理解

this 总是（非严格模式下）指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境；
除了不常用的with和eval的情况，具体到实际应用中，this指向大概可以分为四种：
1.作为对象的方法调用；
2.作为普通函数调用；
3.构造器调用；
4.call 或 apply调用；
5.箭头函数中，this指向函数上层作用域的this；
6.构造器和普通函数的区别在于被调用的方式；
A,call(B) => 可以理解成在B的作用域内调用了A方法；

### 2.call()和apply()的区别

![](JavaScript.assets/call_apply.png)

当它们被设计出来时要做到的事情一摸一样，唯一的区别就在于传参的格式不一样

apply接受两个参数
第一个参数指定了函数体内this对象的指向
第二个参数为一个带下标的参数集合（可以是数组或者类数组）
call接受的参数不固定
第一个参数指定了函数体内this对象的指向
第二个参数及以后为函数调用的参数



```javascript
var obj1 = {
    name: 1,
    getName: function (num = '') {
        return this.name + num;
    }
};

var obj2 = {
    name: 2,
};
// 可以理解成在 obj2的作用域下调用了 obj1.getName()函数
console.log(obj1.getName()); // 1
console.log(obj1.getName.call(obj2, 2)); // 2 + 2 = 4
console.log(obj1.getName.apply(obj2, [2])); // 2 + 2 = 4

```



### 3.实现call、apply以及bind函数

call、apply、bind我们要想实现它们首先要知道他们的异同
三者都是改变this的指向，把函数内this指向了第一个参数
不同点：
1、call、apply会执行函数，bind不会需要再次调用
2、传参区别，第一个参数都是函数内部this的指向，其余参数call、bind逐个传入，
apply以数组的形式传入

call:

```javascript
call实现
Function.prototype.myCall = function(context) {
	//第一个参数未传（null、undefined）时是window
	context = context || window;
	
	//console.log(this);
	//这里打印this得知在执行时this就是调用myCall的函数
	
	if (typeof this !== 'function') {
		throw new Error('type Error');
	}
	context.fn = this;
	//除第一个参数，其余参数是参入的实参
	const argus = [...arguments].slice(1);
	
	//调用myCall就执行函数，result就是返回值
	const result = context.fn(...argus);
	
	//把context上面的fn删除
	delete context.fn;
	return result;
}
```



apply:

```javascript
apply实现，基本上和call一样只是传参的区别
Function.prototype.myApply = function(context){
	context = context || window;
	if (typeof this !== 'function'){
		throw new Error('type error')
	}
	context.fn = this;

	//在函数调用myApply时传参最多两个，第二个参数以数组形式传入
	//所以在context.fn(arguments[1])
	let result;
	if (arguments.length > 1){
		const argus = arguments[1];
		result = context.fn(argus);
	} else {
		result = context.fn();
	}
	delete context.fn;
	return result;
}
```



bind:

```javascript
bind实现  bind返回的是改变this的函数
Function.prototype.myBind = function (context) {
	contex = context || window;
	if (typeof this !== 'function'){
		throw new Error('type error');
	}
	const _this = this;
	const argus = [...arguments].slice(1);
	return function () {
		return _this.apply(context, argus);
	}
}
这么些貌似可以实现，但是我们调用可以这样：fn.bind(obj)(1,2);
所以_this.apply(context, argus)参数不全
----------------------------------------------------

Function.prototype.myBind = function (context) {
	contex = context || window;
	if (typeof this !== 'function'){
		throw new Error('type error');
	}
	const _this = this;
	const argus = [...arguments].slice(1);
	return function () {
		_this.apply(context, argus.concat(...arguments));
	}
}
现在看来参数的问题解决了，但是我们还可以这么用bind
(new Fn()).bind(obj)(1,2)
---------------------------------------------------------

Function.prototype.myBind = function (context) {
	contex = context || window;
	if (typeof this !== 'function'){
		throw new Error('type error');
	}
	const _this = this;
	const argus = [...arguments].slice(1);
	return function Fn() {
		if (_this instanceof Fn) {
			return new _this(...argus, arguments);
		}
		_this.apply(context, argus.concat(...arguments));
	}
}

```



## 游览器的垃圾回收机制

执行环境会负责管理代码执行过程中使用的内存。其原理是：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销比较大并且GC时停止响应其他操作，所以垃圾回收器会按照固定的时间间隔周期性的执行。

通常情况下有两种实现方式：标记清除和引用计数。引用计数不太常用，标记清除较为常用。

Javascript引擎基础GC方案是（simple GC）：mark and sweep（标记清除），即：

1. **遍历所有可访问的对象。**
2. **回收已不可访问的对象。**





# 二、二级题目

## 数据类型

### 1.typeof null  的结果什么 为什么？

typeof null的结果为**Object的原因是一个bug**。 在 javascript的最初版本中，使用的 32位系统，js为了性能优化，使用低位来存储变量的类型信息。 在判断数据类型时，是根据机器码低位标识来判断的，而null的机器码标识为全0，而对象的机器码低位标识为000。

### 2.isNaN和Numbe.risNaN函数的区别

Number.isNaN()方法判断传入的参数是否严格的等于NaN，也就是传入的值是NaN时，才会返回true；除此之外全部返回false；

alert(Number.isNaN(NaN))			// true
alert(Number.isNaN(10))				// false
alert(Number.isNaN(true))			// false
alert(Number.isNaN("10"))			// false
……

isNaN()函数只是判断传入的参数是否能转换成数字，并不是严格的判断是否等于，如果能转换为数字，返回false；如果不能转换成数字，则返回true；

alert(isNaN(NaN))			// true
alert(isNaN("blue"))		// true
alert(isNaN(10))			// false
alert(isNaN(true))			// false
alert(isNaN("10"))			// false
……

### 3.js如何进行隐式类型转换？

#### 隐式转换规则

1.转为number类型：`+` `-` `*` `/`  `++` `--`（算数运算符）   `>` `<` `>=` `<=` `==` `!=` `===` `!==`（比较运算符）；
 2.转为string类型：`+` 不仅是算术运算符，还可以做为字符串连接符把数据转换成string类型；
 3.转为boolean类型： `!`（逻辑非运算符）
 **另外需要补充的一点常用的几种运算符各运算符优先级：**
 算术运算符：`+` `-` `*` `/`  `++` `--`
 比较运算符： `>` `<` `>=` `<=` `==` `!=` `===` `!==`
 逻辑运算符：`&&` `||` `!`
 赋值运算符：`=` `+=` `-=` `*=` `/=`
 **算术运算符 > 比较运算符 > 逻辑运算符 > 赋值运算符**

## 基础

### 1.map和object的区别

不同点：

在 Object 中， key 必须是简单数据类型（整数，字符串或者是 symbol），而在 Map 中则可以是 JavaScript 支持的所有数据类型，也就是说可以用一个 Object 来当做一个Map元素的 key。
**元素顺序：**

Map 元素的顺序遵循插入的顺序，而 Object 的则没有这一特性。
**继承：**

Map 继承自 Object 对象。
新建实例
Object 支持以下几种方法来创建新的实例：

var obj = {...};
var obj = new Object();
var obj = Object.create(null);
Map 仅支持下面这一种构建方法：

var map = new Map([[1, 2], [2, 3]]); // map = {1 => 2, 2 => 3}
**数据访问**
Map 想要访问元素，可以使用 Map 本身的原生方法：

map.get(1); // 2  访问元素
map.has(1);  判断某个元素是否在 Map 中可以使用
map.set(key, value);  新增一个数据
map.delete(1);   删除指定数据
map.clear();  全部删除
Object 可以通过 . 和 [ ] 来访问：

// 获取数据
obj.id;
obj['id'];

// 新增/修改数据
obj['key'] = value;
obj.key = value;

// 删除数据
delete obj.id;
// 下面这种做法效率更高
obj.id = undefined

需要注意的是，使用 delete 会真正的将属性从对象中删除，而使用赋值 undefined 的方式，仅仅是值变成了 undefined。属性仍然在对象上，也就意味着 在使用 for … in… 去遍历的时候，仍然会访问到该属性。 

**判断某个元素是不是在 Object 中需要以下操作：**

obj.id === undefined;
// 或者
'id' in obj;
另外需要注意的一点是，Object 可以使用 Object.prototype.hasOwnProperty() 来判断某个key是否是这个对象本身的属性，从原型链继承的属性不包括在内。

**获取size**
Map 自身有 size 属性，可以自己维持 size 的变化。
Object 则需要借助 Object.keys() 来计算

console.log(Object.keys(obj).length); 
Iterating
**Map 自身支持迭代，Object 不支持。**

如何确定一个类型是不是支持迭代呢？ 可以使用以下方法：

console.log(typeof obj[Symbol.iterator]); // undefined
console.log(typeof map[Symbol.iterator]); // function
何时使用 Map ，何时使用 Object？
虽然Map 在很多时候优于 Object，但是作为 JavaScript 最基础的数据类型，还是有很多情景更适合使用 Object。
**当所要存储的是简单数据类型，并且 key 都为字符串或者整数或者 Symbol 的时候，优先使用 Object ，因为Object可以使用 字符变量 的方式创建，更加高效。**
    **当需要在单独的逻辑中访问属性或者元素的时候，应该使用 Object**，例如：

var obj = {
    id: 1, 
    name: "It's Me!", 
    print: function(){ 
        return `Object Id: ${this.id}, with Name: ${this.name}`;
    }
}
console.log(obj.print());//Object Id: 1, with Name: It's Me.
// 以上操作不能用 Map 实现
JSON 直接支持 Object，但不支持 Map
Map 是纯粹的 hash， 而 Object 还存在一些其他内在逻辑，所以在执行 delete 的时候会有性能问题。所以写入删除密集的情况应该使用 Map。
**Map 会按照插入顺序保持元素的顺序，而Object做不到。**
**Map 在存储大量元素的时候性能表现更好，特别是在代码执行时不能确定 key 的类型的情况。**

------------------------------------------------


### 2.js脚本延迟加载的方式有哪些

js延迟加载就是当页面全部加载完毕，然后再加载js文件，这样做有助于提高页面加载的速度。
下面将总结js中延迟加载的几种方式。

**1、defer属性****

在script标签上，设置defer属性，可以达到异步加载js文件，延迟执行js脚本文件的目的。
①、defer属性只对外部文件有效，对本地js文件没有效果。
②、defer属性是在遇到scirpt标签时，浏览器开始异步下载，当遇到</html>标签时，表名页面加载完毕，开始执行js文件。
③、并且js文件是按顺序执行的。

**2、async属性**

在script标签上，设置async属性，可以达到异步加载js文件的目的。
①、async属性只对外部文件有效，对本地js文件没有效果。
②、async属性是遇到scirpt标签开始通知浏览器异步下载，下载完毕之后，就可以立即执行。
③、async设置的js文件不是按照顺序的。

**3、动态创建DOM方式**

动态创建script标签，当页面的全部内容加载完毕后，在执行创建挂载。

```html

   <script>
      function loadJS() {
        let element = document.createElement("script")
        element.src = "download.js"
        document.body.appendChild(element)
      }
      if(window.addEventListener) {
        window.addEventListener("load", loadJS, false)
      }else if(window.attachEvent) {
        window.attachEvent("onload", loadJS)
      }else {
        window.onload = loadJS
      }
    </script>
```



**4、使用setTimeout**

在每一个脚本文件最外层设置一个定时器。

**5、把js文件放在最后**

当外部加载js文件是，应该将js脚本放在最后，当全部的文件都加载完成后，再开始加载执行js脚本。

### 3.js类数组对象的定义

javascript定义类数组对象的方法是：1、首先创建一个空对象；2、为对象直接定义数字下标的属性；3、关键点，为对象设置length属性和splice属性为数字和函数。
js中类数组对象很多，概念简单的讲就是看上去像数组，又不是数组，可以使用数字下标方式访问又没有数组方法。

例： arguments ， NodeList ， HTMLCollection ， jQuery 等

类数组对象特性

1、拥有 length 属性

2、可以使用数字下标的方式访问对象

3、不能使用数组原型的方法(如 slice ， pop 等)

4、使用 instanceof 操作不属于 Array

5、可以转换为真数组对象

PS:注意在IE8下部分对象无法使用slice方法转换为真数组对象。

建议使用jquery提供的 $.makeArray() 方法转换类数组对象

6、通常可定义有其他自定义属性



### 4.为什么arguments是类数组而不是数组，如何遍历类数组

1.数组对象：使用单独的变量名来存储一系列的值。从Array构造函数中继承了一些用于进行数组操作的方法。
比如

var mycars = new Array();
mycars[0] = "Saab";
mycars[1] = "Volvo";
mycars[2] = "BMW";
2.类数组对象：对于一个普通的对象来说，如果它的所有property名均为正整数，同时也有相应的length属性，那么虽然该对象并不是由Array构造函数所创建的，它依然呈现出数组的行为，在这种情况下，这些对象被称为“类数组对象”。

区别：
1、一个是对象，一个是数组

2、数组的length属性，当新的元素添加到列表中的时候，其值会自动更新。类数组对象的不会。

3、设置数组的length属性可以扩展或截断数组。

4、数组也是Array的实例可以调用Array的方法，比如push,pop等等

所以说arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。

**如何遍历**

方法一：for循环遍历（比较耗性能，一般不用）

```javascript
let tranche = document.getElementsByClassName("modify__quarter-date")

for(let i = 0; i < tranche.length; i++) {
tranche[i].style.display = "none"
}
```



方法二：slice和call将类数组转化为数组

```javascript
let tranche = [].slice.call(document.getElementsByClassName("modify__quarter-date"))

tranche.forEach(item => {
item.style.display = "none"
})
```



说明：

①[ ]表示数组的实例，[ ].slice表示将数组整个进行返回，call表示将作用域提升到document.getElementsByClassName("modify__quarter-date")这个类数组中。

②foreach 语法：

```javascript
[ ].forEach(function(value,index,array){
    // code
});
```

方法三：ES6中的...扩展运算符


```javascript
let tranche = [...(document.getElementsByClassName("modify__quarter-date"))]

for(let item of tranche){
item.style.display = "none"
  }
```



说明：

①for of无法循环遍历对象

②for of不会遍历自定义属性

③for of遍历的是数组的值，而不是索引



### 5.ES6模块和commonJS模块有什么异同？

**一、区别：**
1.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

2.CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

3.CommonJS是对模块的浅拷⻉，ES6 Module是对模块的引⽤,即ES6 Module只存只读，不能改变其值，具体点就是指针指向不能变，类似const 。

4.import的接⼝是read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向。可以对commonJS重新赋值（改变指针指向），但是对ES6 Module赋值会编译报错。

**二、共同点：**
1.CommonJS和ES6 Module都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变。

### 6.如何判断一个对象属于什么类？

```javascript

if(a instanceof Person){
   alert('yes');
}
// 判断对象类型最好的方式
// 对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
```



### 7.for...in...和for...of...的区别？

**for…in**
for...in是为遍历对象属性而构建的，它以任意顺序遍历一个对象的除Symbol以外的可枚举属性，可用break或者throw跳出

语法：

for (variable in object) {
    // 在此执行代码
}

例子：

```javascript
let obj = {
  name: '张三',
  age: 18
}

for(let item in obj) {
  console.log(item)
}
// 输出 name age
//在JavaScript中，数组也是对象的一种，所以数组也是可以使用for...in遍历

let arr = ['a', 'b', 'c']

for(let item in arr) {
  console.log(item)
}
// 输出 0 1 2
```

**for…of**
for...of语句在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句（包括Array，Map，Set，String，TypedArray，arguments等等，不包括Object），可用break或者throw跳出。

```javascript
//语法：

for (variable of 可迭代对象) {
    // 操作语句
}

//例子：

let arr = ['a', 'b', 'c']

let obj = {
  name: '张三',
  age: 18,
  sex: '男'
}

for (let i of arr) {
  console.log(i)
}
// 输出 a b c

for (let i of obj) {
  console.log(i)
}
// 报错 obj is not iterable (obj不是可迭代的)
```


**区别**
无论是for...in还是for...of都是迭代一些东西。它们之间的主要区别在于它们的迭代方式

for...in语句以任意顺序迭代对象的可枚举属性

for...of语句遍历可迭代对象定义要迭代的数据

下面列出遍历Array时候，for...in和for...of的区别：

```javascript
let arr = ['a', 'b', 'c']

Array.prototype.ufo = '张三'

for(let item in arr) {
  console.log(item)
}
// 输出 0 1 2 ufo

for(let item of arr) {
  console.log(item)
}
// 输出 a b c
```


上例，通过Array.prototype添加了ufo属性，由于继承和原型链，所以arr也继承了ufo属性，属于可枚举属性，所以for...in会遍历出来，而for...of则不会。

------------------------------------------------


### 8.数组的遍历方法有哪些？

**let arr = [ 'a', 'b', 'c', 'a' ]**

1. **indexOf()   遍历数组,返回元素在数组中第一次出现的下标**

里面接收2个参数.参数1是要查找的元素,参数2是开始查找的下标

  arr.indexOf( 'a',1 )  // 3

分析: 查找字符串a在数组里第一次出现时的下标,从数组的下标1开始查找,第一次出现时为下标3.

2. **forEach()  遍历数组获取每一个元素,没有返回值**

参数为一个函数,函数的形参1代表数组元素,形参2代表元素下标

  arr.forEach(function( item, index){ })

3. **map()  遍历数组,返回一个新数组,数组由参数里的返回值组成.必须使用return.**

参数为一个函数,函数的形参1代表数组元素,形参2代表元素下标

举例1:   

```javascript
let res = arr.map(function(item){ 
	return   item == 'a' 
    }) ;
console.log(res)   ;    //[true, false, false]
    
```

举例2:   

```javascript
   let res = arr.map(function(item, index){ 
  return   item.index 
   }) ;
```

  console.log(res)  ;      //[0,1,2,3]

4. **filter() 遍历数组,返回一个新数组:新数组由参数里,条件为true的元素组成.**

参数为一个函数,函数的形参1代表数组元素,形参2代表元素下标

```javascript
let res = arr.filter(function(item, index){
	return item.index >= 2
    });
 console.log(res)  ; // [ 'c' ,'a' ]
```

 console.log(res)  ; // [ 'c' ,'a' ]

5. **some()  遍历数组,返回参数函数里符合条件的元素,只要检测到有一个元素符合条件就return.**

参数为一个函数,函数的形参1代表数组元素,形参2代表元素下标

```javascript
  let res = arr.some(function(item, index){
 		 return item.index >= 2
    });
    console.log(res)  ; //   c
```

console.log(res)  ; //   c

应用: 遍历购物车,判断商品id是否在购物车里存在,没有就加入id,有就增加数量

6. **every()  遍历数组,判断数组元素是否全部符合函数参数里的条件,全部满足返回true,否则false.**

参数为一个函数,函数的形参1代表数组元素,形参2代表元素下标

```javascript
   let res = arr.every(function(item, index){
  		 return item.index >= 2
    });
```

console.log(res)  ;  //false

应用:全选功能,只要有一个没有被选中,就取消全选按钮的选中状态.

7. **reduce() 遍历数组, 返回参数函数里的返回值.一般作为累加器计算总价** 

情况1.只有一个函数作为参数1时,函数的形参1代表数组的第一个元素,形参2代表剩余所有元素

```javascript
    let arr=[1,4,7,2,9]

	let res = arr.reduce(function(firstItem, item){
  		return firstItem += item
    })
    console.log(res)  //23
```

 情况2.参数1是一个函数,参数2代表函数的形参1的值,此时函数的形参2就代表数组所有元素

```javascript
    var res = arr.reduce(function(firstItem, item){
    	console.log(item)
    }, 0)

    console.log(res)
    // 0是给firstItem设置的值，现在item表示所有数组元素
```



  8. **for  of  遍历数组/字符串**

```javascript
 for( let item of arr ){
       console.log(item)
    }
```
------------------------------------------------


### 9.forEach和map方法有什么区别？

**关于forEach()**

**敲黑板：没有返回值！！！！**

arr[].forEach(function(value,index,array){
	xxxxx
})
参数：value数组中的当前项，index当前项的索引，array原始数组；

数组中有几项，那么传递进去的匿名回调函数就需要执行几次

理论上这个方式是没有返回值的，只是遍历数组中的每一项，不对原来数组进行修改，但是可以自己通过数组的索引来修改原来的数组

举例：

```javascript
var array = [10,34,57,43,76];  
var res = array.forEach(function (item,index,input) {  
       input[index] = item*10;  
})  
console.log(res);//--> undefined;  
console.log(array);//--> 通过数组索引改变了原数组； 
[100,340,570,430,760]
```



**关于map()**

**敲黑板：有返回值，可以return出来！！！！**

arr[].map(function(value,index,array){
	xxx
	return xxx
});
参数：value数组中的当前项，index当前项的索引，array原始数组

区别：map的回调函数中支持return返回值，return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆了一份，把克隆这一份的数组中的对应项改变了 ）；

```javascript
var array = [10,34,57,43,76];  
var res = array.map(function (item,index,input) {  
       return item*10;   
})  
console.log(res);
console.log(array);不变
```



## 异步编程

### 1.异步编程的实现方式

1、回调函数

优点：简单、容易理解
缺点：不利于维护，代码耦合高，多个异步操作下容易形成回调地狱。

2、事件监听

优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
缺点：事件驱动型，流程不够清晰

3、发布/订阅(观察者模式)

类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者

4、Promise

优点：可以利用then方法，进行链式写法；可以书写错误时的回调函数；
缺点：编写和理解，相对比较难

5、Generation

优点：函数体内外的数据交换、错误处理机制
缺点：流程管理不方便

6、async/await

优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰。
缺点：错误处理机制



### 2.promise.all和promise.race的区别和使用场景

※ Promise.all() ※

Promise.all方法接受一个数组作为参数，但每个参数必须是一个Promise实例。Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作都执行完毕后才执行回调，只要其中一个异步操作返回的状态为rejected那么Promise.all()返回的Promise即为rejected状态，此时第一个被reject的实例的返回值，会传递给Promise.all的回调函数：

```javascript
    function createPromise(p, arg) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (arg === 0) {
            reject(p + ' fail')
          } else {
            resolve(p + ' ok')
          }
        }, 0);
      })
    }
 
    // test: 两个Promise都成功
    Promise.all([createPromise('p1', 1), createPromise('p2', 1)])
      .then((success) => {
        console.log(success) // ['p1 ok', 'p2 ok']
      }).catch((error) => {
        console.log(error)
      })
 
    // test: 其中一个Promise失败
    Promise.all([createPromise('p1', 0), createPromise('p2', 1)])
      .then((success) => {
        console.log(success)
      }).catch((error) => {
        console.log(error) // p1 fail 
      })
 
    // test: 两个Promise都失败
    Promise.all([createPromise('p1', 0), createPromise('p2', 0)])
      .then((success) => {
        console.log(success)
      }).catch((error) => {
        console.log(error) // p1 fail 只打印第一个失败的异步操作信息
      })
```



------------------------------------------------
※ Promise.race() ※

Promise的race方法和all方法类似，都提供了并行执行异步操作的能力。顾名思义，race就是赛跑的意思，意思就是说Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态，以下就是race的执行过程：

```javascript
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 1000)
    })
 
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('failed')
      }, 500)
    })
 
    Promise.race([p1, p2]).then((success) => {
      console.log(success)
    }).catch((error) => {
      console.log(error)  // failed
    })
```



------------------------------------------------


## 面向对象

### 1.对象的创建方式有哪些

1、{}

2、new Ｏbject()

3、使用字面量

4、工厂模式

5、构造函数模式（constructor）

约定俗成，构造函数的名称首字母大写，普通函数的首字母小写。通过new 构造函数来创建对象。

6、原型模式（prototype）

7、构造函数+原型模式    常用

### 2.对象的继承方式有哪些

①.传统的继承方式-[原型链](https://so.csdn.net/so/search?q=%E5%8E%9F%E5%9E%8B%E9%93%BE&spm=1001.2101.3001.7020)形式：缺点：过多的继承了没有用的属性 比如Father工厂里面创建的name

```javascript
		Father.prototype.lastName = "teng";
		function Father(){
			this.name = "anchao"
		}
		var father = new Father();
		Son.prototype =father;
		function Son(){

		}
		var son = new Son();

```



②借用构造函数来继承，使用call和apply改变this指向，借用别人的工厂创建了自己的对象。缺点：不能继承别人工厂的原型 比如访问student.address = undefined;

```javascript
		Person.prototype.address = "地球";
		function Person(name,sex,age){
			this.name = name;
			this.sex = sex;
			this.age = age;
			this.sing = function(){
				console.log("I am"+this.name);
			}
		}
		function Student(name,sex,age,className){
			Person.call(this,name,sex,age);
			this.className = className;
		}

		var student = new Student("tenganchao","male",26,"三年五班");

```



③共享原型来继承。缺点：不能更改儿子的原型，否则父亲的原型也跟着变化

```javascript
		Father2.prototype.lastName = "teng";
		function Father2(){
			this.name = "anchao"
		}
		function Son2(){

		}
		function inherit(Target,Origin){
			Target.prototype = Origin.prototype
		}
		inherit(Son2,Father2);

		var son2 = new Son2();
//ECMAScript5通过新增Object.create()方法规范化了原型式继承，这个方法接收两个参数：一个用作新对象原型的对象和一个作为新对象定义额外属性的对象。
var person = {
name:"EvanChen",
friends:["Shelby","Court","Van"];
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends);//"Shelby","Court","Van","Rob","Barbie"
```



④圣杯模式。在共享原型的基础上，通过一个function F(){} 来改掉共享原型上的缺点，这样即能达到继承效果，又可以在自己原型链上进行更改

```javascript
	Father3.prototype.lastName = "teng";

		function Father3(){

		}
		function Son3(){

		}
		function inherit3(Target,Origin){
			function F(){};
			F.prototype = Origin.prototype;//将原构(父)造函数与F构造函数共享一个原型
			Target.prototype = new F();//将目标(子)构造函数的原型指向了通过new F()创建的对象
			Target.prototype.constuctor = Target;//将constructor复原
			Target.prototype.uber = Origin.prototype;//查找继承的超类
		}
		inherit3(Son3,Father3);

		var son3 = new Son3();

```

**⑤ extends——寄生组合继承的语法糖**

**在 es6 之后，新增了类 class 的关键字，以及类的继承extends（寄生组合式继承语法糖）。**

```javascript
class Father{
    constructor(name){
        this.name=name
    }
    getName(){
        return this.name
    }
}

class Son extends Father{
    constructor(name,age,sex){
        // 这里如果子类中存在构造函数，就必须在使用 this 之前先调用 super()
        // 相当于借用父类的 constructor 跟构造函数式继承中的 call 继承方法类似
        super(name)
        this.age=age
        this.sex=sex
    }
}

const son= new Son('joney',18,'女')
console.log(son);

```



## 哪些情况会导致内存泄漏

1、 意外的全局变量引起的内存泄漏
function fun(){
leak=’xxx’;//leak会成为一个全局变量，不会被回收
}
2、 闭包引起的内存泄漏
3、 没有清理的DOM元素引用，比如：button,image,text
function removeButton(){
document.body.removeChild(document.getElementById(‘button’));
}
4、 被遗忘的定时器或者回调
5、 子元素存在引用引起的内存泄漏

## 求字符串中出现最多的字符以及次数

```javascript
const str = 'jordanbryantjamescurrydurant';
const res1 = str.split('').reduce((pre, cur) => {
    pre[cur] ? pre[cur]++ : pre[cur] = 1;
    return pre;
}, {});
console.log(res1);  //{j:2,o:1,r:5,d:2,...}
let arr = []
let num = Math.max(...new Set(Object.values(res1)))
let value;
for (let keys in res1) {
    if (res1[keys] == num) {
        value = keys
        break
    }
}
console.log(`出现最多的字母为${value},出现的次数为${num}次`); //出现最多的字母为r,出现的次数为5次
————————————————

```

