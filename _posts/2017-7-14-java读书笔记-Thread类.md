---
layout: post
#标题配置
title:  java读书笔记-Thread类-编程小问题
#时间配置
date:   2017-7-14 01:08:00 +0800
#大类配置
categories: java
#小类配置
tag: 总结
---

* content
{:toc}


### 一、线程的三个常用方法

![img](http://img.blog.csdn.net/20170714082842505?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



### 二、线程死锁图解

![img](http://img.blog.csdn.net/20170714082902509?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)            Thread1锁住了上面的对象，等待锁住下面的对象来完成执行过程。但是下面的对象被Thread2锁住了，它也等着锁住上面的对象来完成执行，因此陷入了死锁。



### 三、死锁小程序

```java
public class TestDeadLock implements Runnable {
	public int flag = 1;
	static Object o1 = new Object(), o2 = new Object();
	public void run() {
	System.out.println("flag=" + flag);
		if(flag == 1) {
			synchronized(o1) {
				try {
					Thread.sleep(500);
				} catch (Exception e) {
					e.printStackTrace();
				}
				synchronized(o2) {
					System.out.println("1");	
				}
			}
		}
		if(flag == 0) {
			synchronized(o2) {
				try {
					Thread.sleep(500);
				} catch (Exception e) {
					e.printStackTrace();
				}
				synchronized(o1) {
					System.out.println("0");
				}
			}
		}
	}	
	
	public static void main(String[] args) {
		TestDeadLock td1 = new TestDeadLock();
		TestDeadLock td2 = new TestDeadLock();
		td1.flag = 1;
		td2.flag = 0;
		Thread t1 = new Thread(td1);
		Thread t2 = new Thread(td2);
		t1.start();
		t2.start();
		
	}
}
```

### 四、面试题

下面举个小例子：

```java
public class TT implements Runnable {
	int b = 100;
	
	public synchronized void m1() throws Exception{
		//Thread.sleep(2000);
		b = 1000;
		Thread.sleep(5000);
		System.out.println("b = " + b);
	}
	
	public  void m2() throws Exception {
		Thread.sleep(2500);
		b = 2000;
	}
	
	public void run() {
		try {
			m1();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) throws Exception {
		TT tt = new TT();
		Thread t = new Thread(tt);
		t.start();
		
		tt.m2();
		System.out.println(tt.b);
	}
}
```

上面的输出结果是：2000



### 五、wait()跟sleep()区别

1)wait时别的线程可以访问锁定对象(调用wait方法的时候必须锁定该对象)

2)sleep时别的线程也不可以访问锁定对象

2)Thread.sleep()与Object.wait()二者都可以暂停当前线程，释放CPU控制权，主要的区别在于Object.wait()在释放CPU同时，释放了对象锁的控制，而在同步块中的Thread.sleep()方法并不释放锁，仅释放CPU控制权。



### 六、wait()跟notify()方法

           1)wait()方法与notify()必须要与synchronized(resource)一起使用。(也就是wait与notify针对已经获取了resource锁的线程进行操作，从语法角度来说就是Obj.wait(),Obj.notify必须在synchronized(Obj){...}语句块内。)

          2) wait和notify方法均可释放对象的锁，但wait同时释放CPU控制权，即它后面的代码停止执行，线程进入阻塞状态，而notify方法不立刻释放CPU控制权，而是在相应的synchronized(){}语句块执行结束，再自动释放锁。