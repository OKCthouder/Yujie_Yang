

```
---
layout: post
#标题配置
title:  [jQuery读书笔记]
#时间配置
date:   2017年5月20日09:38:22
#大类配置
categories: document
#小类配置
tag: 读书笔记
---
```



```
* content
{:toc}
```







本人最近在学习jQuery，在学的过程中顺便做一下读书笔记，在这里跟大家分享一下。**



### 1)

$("form :input") 返回form中的所有表单对象，包括textarea、select、button等

$("form input")返回form中的所有input标签对象

$("#form1:input")表示id为#form1的input

form input 是属于层级选择器(将每一个选择器匹配到的元素合并后一起返回)

form :input是属于表单选择器(匹配所有<input>、<textarea>、<select>、<button>元素



### 2) 

```javascript
1. <div id = "id#b">bb</div>  
2. <div id = "id[1]">cc</div>  
```

上述div不能用普通方式来获取，例如

```javascript
1. $("#id#b");  
2. $("#id[1]");  
```

而应该用转义字符：

```javascript
1. $("#id\#b");  
2. $("#id\[1\]");  
```



### 3)

```javascript
1. $(document).ready(function(){  
2.      //...  
3. });  
4. 可以简写为  
5. $(function(){  
6.   //...  
7. })  
```



### 4)

```html
1. <div class="test">  
2.    <div style="display:none;">aa</div>  
3.    <div style="display:none;">bb</div>  
4.    <div style="display:none;">cc</div>  
5.    <div class="test" style="display:none;">dd</div>  
6. </div>  
7. <div class="test" style="display:none;">ee</div>  
8. <div class="test" style="display:none;">ff</div>  
```

下面用jquery选取：

```javascript
1. $(function(){  
2.   //注意区分类似这样的选择器  
3.   //虽然一个空格，却截然不同的效果.  
4.    var t_a = ('.test :hidden');  
5.    var t_b = ('.test:hidden');  
6.    var len_a = $t_a.length;  
7.    var len_b = $t_b.length;  
8.    ("<p>('.test :hidden')的长度为"+len_a+"</p>").appendTo("body");  //4  
9.    ("<p>('.test:hidden')的长度为"+len_b+"</p>").appendTo("body");   //3  
10. })  

```

原因是：

var $t_a = $(".test :hidden");

以上代码是选取class为"test"的元素里面的隐藏元素

而代码：

var $t_b = $(".test:hidden");

这是选取隐藏的class为“test”的元素



### 5)

detach()和remove()一样，也是从DOM中去掉匹配的元素。但是这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素，与remove不同的是，所以绑定的事件、附加的数据等都会保留下来。



### 6)

$(this).clone(true).appendTo("body"); //注意参数true

在clone()方法中传递了一个参数true，它的含义是复制元素的同事复制元素中所绑定的事件，因而该元素的副本也同样具有复制功能。



### 7)

在css()方法中，如果属性中带有“-”符号，例如font-size属性，如果在设置这些属性的值得时候不带引号，那么就要用驼峰式写法，例如：

$("p").css({fontSize : "30px" , backgroundColor : "#888888"});

如果加上了引号，既可以写成"font-size",也可以写成“fontSize”。



## #8)

show()方法和hide()方法会同时修改元素的多个样式属性，即高度、宽度和不透明度；fadeOut()和fadeIn()方法智慧修改元素的不透明度；slideDown()方法和slideUp()方法智慧改变元素的高度。

9) 

```javascript
1. $("button:eq(1)").click(function () {  
2.       $("#panel").stop();//停止当前动画，继续下一个动画  
3.   });  
4.   $("button:eq(2)").click(function () {  
5.       $("#panel").stop(true);//清除元素的所有动画  
6.   });  
7.   $("button:eq(3)").click(function () {  
8.       $("#panel").stop(false,true);//让当前动画直接到达末状态 ，继续下一个动画  
9.   });  
10.   $("button:eq(4)").click(function () {  
11.       $("#panel").stop(true,true);//清除元素的所有动画，让当前动画直接到达末状态   
12.   });  

```



### 10)

animate回调函数

```javascript
 $("#panel").click(function () {  
 $(this).animate({left: "400px", height: "200px", opacity: "1"}, 3000)  
                     .animate({top: "200px", width: "200px"}, 3000, function () {  
                         $(this).css("border", "5px solid blue");  
                     })  

```



### 11)

用attr()和prop()访问对象的属性的原则：

第一个原则：只添加属性名称该属性就会生效应该使用prop()；

第一个原则：只存在true/false的属性应该使用prop()。

按照官方说明，如果是设置disable和checked这些属性，应使用prop()方法，而不是使用attr()方法。（例如在某些浏览器里，只要写了disabled属性就可以，有些则要写：disabled = “disabled”。）