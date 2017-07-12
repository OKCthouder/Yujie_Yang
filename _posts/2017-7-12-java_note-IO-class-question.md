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

![微信图片_20170711085546](C:\Users\Simple_Y\Pictures\微信图片_20170711085546.png)



### 二、流的分类

![微信图片_20170711090132](C:\Users\Simple_Y\Pictures\微信图片_20170711090132.png)



### 三、节点流类型

![微信图片_20170711091350](C:\Users\Simple_Y\Pictures\微信图片_20170711091350.png)



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

![微信图片_20170711095142](C:\Users\Simple_Y\Pictures\微信图片_20170711095142.png)



#### 三、OutputStreamWriter工作原理

        如果只是用FileWriter的话只能每次写入一个字节，而在外面再包装一层BufferedWriter的话一次可以写入一个字符串的内容。

![微信图片_20170711100838](C:\Users\Simple_Y\Pictures\微信图片_20170711100838.png)

