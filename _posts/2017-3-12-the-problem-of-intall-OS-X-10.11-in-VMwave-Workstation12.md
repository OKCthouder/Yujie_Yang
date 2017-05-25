---
layout: post
#标题配置
title:  VMwave Workstation12虚拟机安装OS X 10.11所遇到的各种问题集合(详细版)
#时间配置
date:   2017-03-12 01:08:00 +0800
#大类配置
categories: 装系统的那些事儿
#小类配置
tag: 教程
---

* content
{:toc}


## 一、前言

最近笔者闲着无聊，由于一直挺仰慕mac大法，所以想装个mac系统来玩玩。虽然说过程不是很难，但是出现的各种小问题还是挺多的，所以在这里跟大家分享一下我的解决方法。

1.首先，当然是安装工具：

- Mac OS X 10.11 镜像文件（链接：[http://pan.baidu.com/s/1pL8HE59](http://pan.baidu.com/s/1pL8HE59) 密码：cq4d）（此镜像为网络收集，如果觉得有问题自己找谢谢。）
- unlocker208文件（链接：[http://pan.baidu.com/s/1bpftVjT](http://pan.baidu.com/s/1bpftVjT) 密码：dp2g）
- VMware Workstation12（[http://blog.sina.com.cn/s/blog_af49f8090102wqmw.html](http://blog.sina.com.cn/s/blog_af49f8090102wqmw.html)）

2.详细教程请查看：[http://jingyan.baidu.com/article/363872ec206a356e4ba16f30.html](http://jingyan.baidu.com/article/363872ec206a356e4ba16f30.html)

在这里我就不再赘述。



## 二、所遇到的问题

下面来看看我安装后遇到的各种问题：

## 1)  VMware上MAC虚拟机不能上网问题

首先最大的问题当然就是没网啦，别急，且听我慢慢道来：

### 解决方法/步骤 

#### 1.从本机中选择打开连接网络，选择本地连接。如果是无线网可以选择无线网。

![img](http://img.blog.csdn.net/20170424190230322?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



#### 2.选择属性，点击共享按钮。

![img](http://img.blog.csdn.net/20170424190316370?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 3.将internet连接共享下面两个选项都选中，然后在家庭网络连接选择VMware Network Adapter VMnet1。

![img](http://img.blog.csdn.net/20170430203759981?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 4.在安装的虚拟机中选择虚拟机->设置选项。

![img](http://img.blog.csdn.net/20170424190515128?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 5.点击网络适配器，将网络连接改成仅主机模式（Host-only），然后在右侧选择主机模式，点击确定。

![img](http://img.blog.csdn.net/20170424190604613?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 6.进入Mac系统，选择设置，进入网络设置

![img](http://img.blog.csdn.net/20170424190642379?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 7.配置Ipv4选择设置DHCP，点击应用即可开始上网。



## 2)[OS X 10.11 El Capitan 无法连接Apple store 和登录Apple ID的问题](http://blog.csdn.net/qq_25131687/article/details/52194202)

#### 1.step 1 

强制退出Apple store进程

#### 2. step 2 

打开terminal终端（在launch中搜索终端），输入以下命令：

```c
sudo pkill -9 -f Account    

sudo rm $HOME/Library/Accounts/*  
```

 进行此操作时需要提供管理员密码，输入密码敲回车就行了。

#### 3.step 3

完成前面两步你已经可以进入apple store了，但是你发现你的apple ID无法登陆：

This action cant be Completed!

这时你可以terminal终端输入以下命令：

```c
sudo mkdir -p /Users/Shared     

sudo chown root:wheel /Users/Shared    

sudo chmod -R 1777 /Users/Shared   
```

至此，你的Apple ID就可以在Apple store上Login了。



## 3)苹果ID注册最后一步总是显示 如需帮助，请联系iTunes支持

由于我的apple id是刚刚注册的，登陆apple store后提示我还没有完善资料什么的，所以我就去填资料

填完资料发现老是出现上面的那一句，继续不了。

所以我又开始了尝试

#### 1.首先在iTunes软件上面注册Apple ID帐号时，注意要把提供[付款方式](https://www.baidu.com/s?wd=%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Yvm1TLPvn3PWw9mynLrj640ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EnW0dnWc1nHn4PHfsnWT3Pj6zPs)选择为“[银联](https://www.baidu.com/s?wd=%E9%93%B6%E8%81%94&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Yvm1TLPvn3PWw9mynLrj640ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EnW0dnWc1nHn4PHfsnWT3Pj6zPs)UnionPay”，目前因为iTunes软件版本更新了不能像以前那样不绑定银行卡就可以注册Apple ID帐号。

![img](http://img.blog.csdn.net/20170424190735973?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 2.然后填写银行卡以及输入银行预留手机号码。(注意：手机号码一定是要和银行卡绑定在一起的才可以使用。)

![img](http://img.blog.csdn.net/20170424190825299?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 3.接下来在帐单寄送地址下方依次将个人的姓、名、街道地址、所在地区、邮编、省份、手机号码填写正确完整。

![img](http://img.blog.csdn.net/20170424190901802?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 4.点击创建Apple ID，进入下一步。

![img](http://img.blog.csdn.net/20170424190938535?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 5.然后收取绑定银行的[短信验证码](https://www.baidu.com/s?wd=%E7%9F%AD%E4%BF%A1%E9%AA%8C%E8%AF%81%E7%A0%81&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Yvm1TLPvn3PWw9mynLrj640ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EnW0dnWc1nHn4PHfsnWT3Pj6zPs)输入里面进行验证。

![img](http://img.blog.csdn.net/20170424191016740?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvT25seUxvdmVfS0Q=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

填入验证码就可以完美解决，我也试过用银行卡的方式，但是还是不行，最后尝试了银联这个就OK了。



## 三、补充

对了，补充一下，可能安装后会发现虚拟机没办法占全屏，只要安装VMwave Tools既可以完美解决，至于卡顿问题，我笔记本是8G内存，我分了4G在虚拟机，相对来说比较不卡，也可以下载一个叫做beamoff的工具,在mac osx下解压即可消除卡顿的感觉。

下载链接 :   [http://download.csdn**.NET**/detail/u013803262/9702291](http://download.csdn.net/detail/u013803262/9702291)

具体解决方法参考：[http://blog.csdn.net/u013803262/article/details/53467693](http://blog.csdn.net/u013803262/article/details/53467693)

好了，以上就是我装mac虚拟机所遇到的比较难缠的问题，分享给大家一下。