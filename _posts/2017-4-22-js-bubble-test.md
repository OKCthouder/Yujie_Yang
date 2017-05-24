---
layout: post
#标题配置
title:  javascript冒泡事件的作用效果
#时间配置
date:   2017-04-22 01:08:00 +0800
#大类配置
categories: document
#小类配置
tag: 教程
---

* content
{:toc}




​	这段时间在学习js，忽然发现了冒泡事件挺有趣的，故研究后来跟各位分享一下效果。

话不多说，直接上代码：

## 代码

```javascript
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Document</title>  
</head>  
<body>  
    <div id="body">    
        <ul>    
            <li><a href="">home</a></li>    
            <li><a href="">About</a></li>  
        </ul>  
    </div>      
<script>  
    function stopBubble(e){  
        if(e && e.stopPropagation){//如果不是IE浏览器  
            e.stopPropagation();  
        }else{//是IE浏览器  
        window.event.cancelBubble=true;  
    }  
}  
   var all = document.getElementsByTagName("*");  
   for(var i =0;i<all.length;i++){  
        all[i].onmouseover = function(e){//鼠标悬停在元素上  
            this.style.border="1px solid red";  
            stopBubble(e);  
    };  
    all[i].onmouseout=function(e){//鼠标离开  
        this.style.border="0px";  
        stopBubble(e);//阻止冒泡  
    };  
}  
</script>  
  
</body>  
</html>
```



## 总结

​	上面是一个简单的例子,当鼠标悬停在元素之上,我们为这个元素加上红色边框,如果离开了再去掉这个红色边框,

​	如果不加 这个 阻止冒泡的方法,每次都会给父类增加红色边框,大家 可以试验一下.一试便知!