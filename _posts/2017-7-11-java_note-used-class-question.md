---
layout: post
#标题配置
title:  java读书笔记-常用类-编程小问题
#时间配置
date:   2017-7-11 01:08:00 +0800
#大类配置
categories: java
#小类配置
tag: 教程
---

* content
{:toc}


### 一、用Java编写一个程序，输出一个字符串中的大写英文字母数，小写英文字母数以及非英文字母数。

```java
import java.util.regex.*;
public class TestString {
	public static void main(String[] args) {

      //方法一
		//String s = "AaaaABBBBcc&^%adfsfdCCOOkk99876 _haHA";
		//int lCount = 0, uCount = 0, oCount = 0;
		/*
		for(int i=0; i<s.length(); i++) {
			char c = s.charAt(i);
			if(c >= 'a' && c <= 'z') {
				lCount ++;
			} else if (c >='A' && c <= 'Z') {
				uCount ++;
			} else {
				oCount ++;
			}
		}
		*/
      
      //方法二
		/*
		String sL = "abcdefghijklmnopqrstuvwxyz";
		String sU = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for(int i=0; i<s.length(); i++) {
			char c = s.charAt(i);
			if(sL.indexOf(c) != -1) {
				lCount ++;
			} else if (sU.indexOf(c) != -1) {
				uCount ++;
			} else {
				oCount ++;
			}
		}
		*/
		
      //方法三
		for(int i=0; i<s.length(); i++) {
			char c = s.charAt(i);
			if(Character.isLowerCase(c)) {
				lCount ++;
			} else if (Character.isUpperCase(c)) {
				uCount ++;
			} else {
				oCount ++;
			}
		}
		
		System.out.println(lCount + " " + uCount + " " + oCount);

```

### 二、将“1,2;3,4,5;6,7,8”这个字符串分解为二维数组。

```java
public class ArrayParser {
  public static void main(String[] args){
    double[][] d;
    String = "1,2;3,4,5;6,7,8";
    String[] sFirst = s.split(";");
    d = new double[sFirst.length][];
    for(int i = 0; i < sFirst.length; i++){
      String[] sSecond = sFirst[i].split(",");
      d[i] = new double[sSecond.length];
      for(int j = 0; j < sSecong.length; j++){
        d[i][j] = Double.parseDouble(sSecond[j]);
      }
    }
    for(int i = 0; i < d.length; i++){
      for(int j = 0; j < d[i].length; j++){
        System.out.print(d[i][j] + " ");
      }
      System.out.println();
    }
  }
}
```

### 三、利用递归列出目录结构

```java
import java.io.*;

public class FileList {
	public static void main(String[] args) {
		File f = new File("d:/A");
		System.out.println(f.getName());
		tree(f, 1);
	}

	private static void tree(File f, int level) {

		String preStr = "";
		for(int i=0; i<level; i++) {
			preStr += "    ";
		}

		File childs = f.listFiles();
		for(int i=0; i<childs.length; i++) {
			System.out.println(preStr + childs[i].getName());
			if(childs[i].isDirectory()) {
				tree(childs[i], level + 1);
			}
		}
	}
}
```



###     四、编写一个方法，输出在一个字符串中，指定字符串出现的次数

```java

	String s = "sunjavahpjavaokjavajjavahahajavajavagoodjava";
	
	String sToFind = "java";
	int count = 0;
	int index = -1;
	
	while((index = s.indexOf(sToFind)) != -1) {
		s = s.substring(index + sToFind.length());
		count ++;
	}
	
	System.out.println(count);

}
```
