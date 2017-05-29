---
layout: post
#标题配置
title:  关于解决VS2015不能用fscanf而老是提示用fscanf_s的方法
#时间配置
date:   2016-12-17 01:08:00 +0800
#大类配置
categories: document
#小类配置
tag: 教程
---

* content
{:toc}




### 前言

​	由于笔者之前用的是dev还有code block，没怎么用过VS2015这个软件，所以发现有些东西不太一样，在下面跟大家分享一下。



### 问题

​	在处理文件输入的时候，我本来是想用fscanf函数，但是编译的时候老是说fscanf函数不安全，建议改成fscanf_s函数。但是fscanf_s函数我不会用，找了挺久的资料，终于知道解决方法了。



### 解决方法

方法一：在程序最前面加#define _CRT_SECURE_NO_DEPRECATE；

方法二：在程序最前面加#define _CRT_SECURE_NO_WARNINGS；

方法三：在程序最前面加#pragma warning(disable:4996)；

方法四：把scanf改为scanf_s；.

方法五：无需在程序最前面加那行代码，只需在新建项目时取消勾选“SDL检查”即可；

方法六：若项目已建立好，在项目属性里关闭SDL也行；

方法七：在工程项目设置一下就行；将报错那个宏定义放到 项目属性 -- C/C++-- 预处理器 -- 预处理器定义；

方法八：在 项目属性 -- c/c++ -- 命令行 添加：/D _CRT_SECURE_NO_WARNINGS 就行了。