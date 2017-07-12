---
layout: post
#标题配置
title:  java读书笔记-IO类-编程小问题
#时间配置
date:   2017-7-12 01:08:00 +0800
#大类配置
categories: java
#小类配置
tag: 总结
---

* content
{:toc}


### 一、Java流式输入输出原理图

![img](http://img.blog.csdn.net/20170712114742456?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



### 二、流的分类

![img](http://img.blog.csdn.net/20170712114801974?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



### 三、节点流类型

![img](http://img.blog.csdn.net/20170712114821261?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



### 总结

     以stream结尾的是字节流，以reader或writer结尾的是字符流。

#### 一、字节流文件复制

```java
import java.io.*;
public class TestFileOutputStream {
  public static void main(String[] args) {
	  int b = 0;
	  FileInputStream in = null;
	  FileOutputStream out = null;
	  try {
	    in = new FileInputStream("d:/share/java/HelloWorld.java");
	    out = new FileOutputStream("d:/share/java/io/HW.java");
	    while((b=in.read())!=-1){
	      out.write(b);
	    }
	    in.close();
	    out.close();
	  } catch (FileNotFoundException e2) {
	    System.out.println("找不到指定文件"); System.exit(-1);
	  } catch (IOException e1) {
	    System.out.println("文件复制错误"); System.exit(-1);
	  }
	  System.out.println("文件已复制");
  }
}
```

#### 二、BufferedWriter和BufferedReader图解

        如果只是用FileWriter的话只能每次写入一个字符，而在外面再包装一层BufferedWriter的话一次可以写入一个缓冲区的内容。

![img](http://img.blog.csdn.net/20170712114952059?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



#### 三、OutputStreamWriter工作原理

        如果只是用FileWriter的话只能每次写入一个字节，而在外面再包装一层BufferedWriter的话一次可以写入一个字符串的内容。

![img](http://img.blog.csdn.net/20170712115009370?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

