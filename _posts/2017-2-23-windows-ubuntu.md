---
layout: post
#标题配置
title:  U盘安装Windows 10和Ubuntu Linux双系统图解教程
#时间配置
date:   2017-2-23 01:08:00 +0800
#大类配置
categories: 装系统的那些事儿
#小类配置
tag: 教程
---

* content
{:toc}


### 前言

         按照本图解教程的方法可以完成Windows 10和Ubuntu Kylin双系统的安装。（有些图片是百度得来的）

Windows 10和Ubuntu Kylin双系统引导成功图：

![下载](C:\Users\Simple_Y\Pictures\Camera Roll\下载.jpg)

### 1.安装环境

        Windows 10系统

### 2.安装 ubuntu 首先需要准备以下工具以及安装包：

#### 1、ubuntu 系统安装包

​       [https://mirrors.tuna.tsinghua.edu.cn/#](https://mirrors.tuna.tsinghua.edu.cn/#)（这个是清华的镜像站点，里面有各种镜像，下载速度也很可观）

  #### 2、刻录软件，推荐**[软碟通]()**，会提示注册，选择继续使用

​       下载：在百度搜一大把

  #### 3、一个大于 2G 的 U 盘

  #### 4、EasyBCD 软件，此软件是同来作为系统引导所用

​       下载地址：[http://dl.pconline.com.cn/download/90611.html](http://dl.pconline.com.cn/download/90611.html)

### 3.准备安装

1、回到桌面，鼠标右键点击开始菜单图标，选择属性，结果如下

![](http://img.blog.csdn.net/20170424185733237?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

 2、进入然后选择[磁盘管理]()，结果如下：

![](http://img.blog.csdn.net/20170424185845859?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

3、选择你认为剩余磁盘空间够大的磁盘，比如 D 盘，右键点击磁盘，选择压缩卷，结果如下：

![](http://img.blog.csdn.net/20170424185932850?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

4、然后就是分区的大小了，个人建议分个 50G 出去最好，然后等待，最终结果如下：压 缩后会发现多出一块未分区磁盘（黑色分区），如果选择的压缩大小是 50G， 则黑色的的应该是 50G 可用空间。

![](http://upload-images.jianshu.io/upload_images/671333-774209de6270a208.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

好了，[磁盘分区]()到此结束，现在进行第四步。



### 4.用软碟通将 UBUNTU 的镜像写入 U 盘

1、安装并打开软碟通，插上 U 盘，并且最好[备份]()你的 U 盘，因为之后需要[格式化]()

2、进入软碟通，进行如下操作 选择文件，并且打开你下载的 UBUNTU 所在的目录，选择 unbuntu 镜像（改成选择Ubuntu Kylin 镜像即可），选择打开，如图：

![下载1](C:\Users\Simple_Y\Pictures\Camera Roll\下载1.jpg)

3、在[软碟通]()界面菜单栏选择启动，选择写入硬盘映像，如图所示

![下载3](C:\Users\Simple_Y\Pictures\Camera Roll\下载3.jpg)

接下来很重要，记住次序：

进入以后界面如下：

![下载4](C:\Users\Simple_Y\Pictures\Camera Roll\下载4.jpg)

1、看你的硬盘驱动器是否对应的是你的 U 盘（必须是） ，一般默认是

2、看[映像文件]()是否对应你的 ubuntu 镜像

3、如果上述均没有错误，选择格式化，之后就会格式化你的 U 盘

4、在 U 盘[格式化]()完毕之后，选择写入，之后就是慢慢等待了，等待写入完毕



### 5.U 盘安装系统（记得关闭电脑的快速启动）

         写在前面，因为个厂商的计算机 BOOT 启动的快捷键不相同，所以 个人觉得要是你无法进入接下来的 BOOT 界面，还是自行百度如何 进入 BOOT 界面，本人华硕笔记本，所以默认快捷键是 F2。 第 6 步非常关键，如果你不想重装系统，你一定要小心
1、重启系统，在开机刚开始按 F2，之后里面会有如下界面，手机 渣渣，多多包涵，选择 USB HDD，回车确认

![下载5](C:\Users\Simple_Y\Pictures\Camera Roll\下载5.jpg)

2、之后就进入 unbuntu 的安装界面了

![下载6](C:\Users\Simple_Y\Pictures\Camera Roll\下载6.jpg)

3、或许没有这个界面，但是下面的界面是一定有的

![下载7](C:\Users\Simple_Y\Pictures\Camera Roll\下载7.jpg)

4、然后选择左边的，往下拉会有中文选择，如图

![下载8](C:\Users\Simple_Y\Pictures\Camera Roll\下载8.jpg)

5、安装 **unbuntu**

![下载9](C:\Users\Simple_Y\Pictures\Camera Roll\下载9.jpg)

6、选择继续（注意，接下来这一步非常重要，一定小心），得到如下所视界面，如图

![下载10](C:\Users\Simple_Y\Pictures\Camera Roll\下载10.jpg)

这一步很关键，一定要选择其他选项，切记，然后进入如下界面

![下载11](C:\Users\Simple_Y\Pictures\Camera Roll\下载11.jpg)

看到没有，里面会有一个空闲分区，也就是我们之前所创建的那个分区

在这里，我们谈谈关于 [Linux](http://lib.csdn.net/base/linux) 的分区：
a.首先 Linux 分区适合 WINDOWS 分区是不一样的， Linux 是以文 件形式作为分区

b.所以分区就像划分磁盘大小一样， 在这里我个人建议如果你的 划分的空盘分区为 60G，则我们可以将其分为 :

1)、/:这是 linux 也就是 ubuntu 的根目录就一个反斜杠表示， 我们将其分为 25G，文件格式为 ext4

2）、 /home:这是 ubuntu 根目录下的一个文件夹， 这个也可以说 是我们的个人目录，所以为了让我们自己的目录大一点，我们可 以将其分为 30G 或者 20G，文件格式为 ext4

3）、swap:这个是 Linux 也就是 ubuntu 的交换区目录，这个一 般的大小为内存的 2 倍左右， 主要是用来在电脑内存不足的情况 下，系统会调用这片区域，来运行程序，我们可以将其分为 4G， 这个没有让你选用文件格式

4）、/boot：这个就是实现你双系统的原因了，这个就是用启动 ubuntu 的目录，里面会有系统的引导，这个文件其实只有几十 兆，但是我们建议将其划分为 200M 文件格式为 ext4，这个分区必不可少，否则后果你懂得！ 好了，这部分分区讲诉完毕，下面就让我们来进行期待已久的分区吧。当然，你可以划分的更详细，具体划分可以百度。
7、分区 选择空闲分区之后，点击添加，会得到如图界面：

![2-150P41142422X](C:\Users\Simple_Y\Pictures\Camera Roll\2-150P41142422X.jpg)

A.首先就是创建根目录，上面提到过，大小 25G 左右，用于 EXT4 文件系统，挂载点有下拉菜单，选择/就好，然后确定，继续选择空闲分区，别看错了，然后添加

B.然后就是交换区的创建，步骤如上，区别是大小为 4G，用于那个下拉菜单选择交换空间，即 SWAP，然后确定

C./BOOT 的创建，大小 200M，文件系统为 EXT4，挂载点选择/boot，点击确定

D、/HOME 的创建，大小 30G，文件系统 40G，挂载点/HOME,点击确定 到此分区完成 接下来的这一步很重要，切记（关系到 ubuntu 的开机启动） 依然在这个界面上，选择安装启动下拉菜单，我们刚刚不是创建了/boot 的文件 吗，现在你看看这个区前面的编号是多少，我的是下面这个 /dev/sda1,不同的机 子在在这个上面会有不同的编号，也就是 sda1

然后在安装启动的下拉菜单中找到 sda1，选择它，切记一定是/boot 的编号 如下图

![下载12](C:\Users\Simple_Y\Pictures\Camera Roll\下载12.jpg)

接下来就选择开始安装了；
8、选择继续，进入下一步操作，并设置地区为：chongqing，按你需要设置，在下一步操作中选择语言

![下载13](C:\Users\Simple_Y\Pictures\Camera Roll\下载13.jpg)

9、键盘布局“默认”，建议选择下面的这个

![下载14](C:\Users\Simple_Y\Pictures\Camera Roll\下载14.jpg)

10、这里设置系统用户，自己设置输入就可以了

![下载15](C:\Users\Simple_Y\Pictures\Camera Roll\下载15.jpg)

11、这个可选可不选，点“继续”

![下载16](C:\Users\Simple_Y\Pictures\Camera Roll\下载16.jpg)

12． 系统开始安装，可以喝杯咖啡，等安装完毕就可以了（这里应该是欢迎使用Ubuntu Kylin）

![下载17](C:\Users\Simple_Y\Pictures\Camera Roll\下载17.jpg)

当这些全部完成之后，机子会重启。你会发现直接进入你的 win10 系统，因为我们把它的引 导搞到/boot 分区了。我们要用 EasyBCD 来给它创建启动时候的选择系统是 windows 还是 ubuntu 。

### 6.用 EasyBCD 引导 ubuntu

接下来就很简单了，在 WIN10 下安装 EasyBCD,之后呢打开如图并且选择添加新条目：

![下载18](C:\Users\Simple_Y\Pictures\Camera Roll\下载18.jpg)

得到如图，选择有企鹅那个，也就是 LINUX/BSD 那个选项，在磁盘驱动器那个下拉菜单选 择以 linux 开头，大小为 200M 左右的那个选项，如图

![下载19](C:\Users\Simple_Y\Pictures\Camera Roll\下载19.jpg)

选择完了之后，添加条目，重启电脑，你就会发现你的 UBUNTU 和 WIN10的[双系统]()就安装完成了。到此，ubuntu 安装结束！ 当你不要 ubuntu 的时候，直接在 window 里[磁盘管理]()删了它所在的分区，然后在 Easybcd 里 删了它的引导就行，不影响你的 windows 系统，这就是为啥我不用 ubuntu 来引导 windows 的原因。



然后就可以尽情享受双系统的乐趣了哈哈哈。

![671333-c221037a9a4731f5](C:\Users\Simple_Y\Pictures\Camera Roll\671333-c221037a9a4731f5.png)

<center> Ubuntu Kylin桌面</center>





