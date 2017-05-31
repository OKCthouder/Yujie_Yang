---
layout: post
#标题配置
title:  别再乱用jQuery return false
#时间配置
date:   2017-5-14 01:08:00 +0800
#大类配置
categories: document
#小类配置
tag: 教程
---

* content
{:toc}




## 前言

​	event.preventDefault()方法是用于取消事件的默认行为，但此方法并不被ie支持，在ie下需要用window.event.returnValue = false; 来实现。这不是[jQuery](http://lib.csdn.net/base/jquery)的方法，是JS本身自带的

event.preventDefault()
​	该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。

event.stopPropagation()
​	该方法将停止事件的冒泡，阻止它被分派到其他 Document 节点。在事件冒泡的任何阶段都可以调用它。注意，虽然该方法不能阻止同一个 Document 节点上的其他事件句柄被调用，但是它可以阻止把事件分派到其他节点。
event是DOM的事件方法，所以不是单独使用，比如指定DOM。



## 测试

在[jQuery](http://lib.csdn.net/base/jquery)代码中，我们常见用return false来阻止浏览器的默认行为。例如点击链接，浏览器默认打开一个新窗口/标签，为了阻止浏览器的默认行为，我们往往这样操作：

```javascript
$("a.toggle").click(function() {  
    $("#mydiv").toggle();  
    return false;  
});  
```

这段代码的作用是通过点击toggle来隐藏或显示#mydiv，并阻止浏览器继续访问href指定链接。[测试](http://lib.csdn.net/base/softwaretest)如下：

[click toggle](http://www.berlinix.com/js/jquery-return-false.php#)

点击上一行的toggle，这段文字将被显示或隐藏。



## return false的作用

return false达到了我们想要的目的，但这并不是阻止浏览器执行默认行为的正确方法。调用return false，它实际完成了3件事：

#### 	1.event.preventDefault()

#### 	2.event.stopPropagation()

#### 	3.停止回调函数执行并立即返回。

我们真正的目的是event.preventDefault()，后两者可不是我们想要的。[JavaScript](http://lib.csdn.net/base/javascript)事件有两种，一种称为事件冒泡（event bubbling），一种称为事件捕捉（event capturing）。事件冒泡指事件在初始DOM上触发，通过DOM树往上在每一级父元素上触发；当事件向下冒泡时，我们则称之为事件捕获。

## 测试

因为return false多做了两件事，由此为代码埋下隐患。下面有一个简单的例子，点击一个链接，加载新的页面内容到当前页面：

```javascript
<div class="post">  
    <a href="/js/loadp1.txt">Click here to load page1</a>  
    <div class="content">  
    </div>  
</div>  
  
<div class="post">  
    <a href="/js/loadp2.txt">Click here to load page2</a>  
    <div class="content">  
    </div>  
</div>  
  
$("div.post a").click(function() {  
    var href = $(this).attr("href");  
    $(this).next().load(href);  
    return false;  
});  
```



[测试](http://lib.csdn.net/base/softwaretest)如下：

[Click here to load page1](http://www.berlinix.com/js/loadp1.txt)

[Click here to load page2](http://www.berlinix.com/js/loadp2.txt)

​	点击链接就能加载页面内容到当前页，一切都OK。现在我们想要加一个新功能，例如论坛帖子的浏览，只有当前点击的帖子内容才会显示，其他帖子都隐藏。为此我们需要为div.post加一个click()事件处理：

```javascript
$("div.post").click(function(){  
    $("div.post .content").hide();          // hide all content  
    $(this).children(".content").show();    // show this one  
}); 
```

​	添加完这段代码后，我们发现它不生效，缘故是因为`$("div.post a").click(function() { return false; });`，由于return false执行了event.stopPropagation()，因此事件不能冒泡到上一级DOM，即`$("div.post").click()`不会被事件触发。要达成我们的任务，应该把return false替换为event.preventDefault()：

```javascript
$("div.post a").click(function(e) {  
    var href = $(this).attr("href");  
    $(this).next().load(href);  
    e.preventDefault();  
});  
```

测试修改后的代码：

[Click here to load page1](http://www.berlinix.com/js/loadp1.txt)

[Click here to load page2](http://www.berlinix.com/js/loadp2.txt)

## return false 和 live/delegate

如果把**return false和live/delegate**事件混用，情况就更糟糕了：

```javascript
$("a").click(function(){  
    // do something  
    return false;  
});  
  
$("a").live("click", function(){  
    // this won't fire  
});  
```

如果确实需要阻止事件冒泡，也应该**显式**地调用：

```javascript
$("div.post").click(function(){  
    // do something  
});  
$("div.post a").click(function(e){  
    // 浏览器跳转到新页面（默认行为）  
    // 但阻止事件冒泡，即不会执行$("div.post").click()  
    e.stopPropagation();  
});  
```

## event.stoplmmediatePropagetion()

​	event.stopPropagation()用于阻止事件冒泡，jQuery中还有另一个函数：event.stopImmediatePropagation()，它用于阻止一个事件的继续执行，即使当前对象上还绑定了其他处理函数：

```javascript
$("div a").click(function(){  
    // do something  
});  
  
$("div a").click(function(e){  
    // stop immediate propagation  
    e.stopImmediatePropagation();  
});  
  
$("div a").click(function(){  
    // never fires  
});  
  
$("div a").click(function(){  
    // never fires  
});  
```

## 总结

​	最后结论是：理解return false，尽量避免使用它，请用event.preventDefault()替代return false。