---
layout: post
#标题配置
title:   C语言实现顺序表的基本操作
#时间配置
date:   2016-09-20 01:08:00 +0800
#大类配置
categories:   数据结构
#小类配置
tag: 教程
---

* content
{:toc}


### 前言

       数据结构老师给了几个接口，叫我们自己去实现顺序表的功能，感想就是顺序表实现起来比链表容易，但是还是要花费挺长的时间来构思，这一次的收获还是挺多的。

### 编译环境

       VS 2015

### 所用语言

       C

### 实现功能

       顺序表的初始化及创建

       顺序表的遍历

       顺序表的增删查改

### 代码

#### 顺序表.h

```c
#include<stdio.h>  
#include<stdlib.h>  
#include<malloc.h>  
#define LIST_INIT_SIZE 100  
#define LISTINCREMENT 10  
#define TRUE 1  
#define FLASE 0  
typedef int Elemtype;  
typedef int Status;  
  
  
  
/*接口定义 
Status InitList_Sq(SqList &L,int size,int inc); 
void CreateList_Sq(SqList &L); 
void print_Sq(SqList &L); 
int Search_Sq(SqList L, Elemtype e); 
Status DestroyList_Sq(SqList &L); 
Status ClearList_Sq(SqList &L); 
Status ListEmpty_Sq(SqList L); 
int ListLength_Sq(SqList L); 
Status GetElem_Sq(SqList L, int i, Elemtype &e); 
Status PutElem_Sq(SqList &L, int i, Elemtype e); 
Status Append_Sq(SqList &L, Elemtype e); 
Status DeleteLast_Sq(SqList &L, Elemtype &e); 
*/ 
```



#### 源代码.h

```c
#include "顺序表.h"  
  
//定义顺序表类型  
typedef struct {  
    Elemtype *elem;  
    int length;  
    int listsize;  
    int increment;  
}SqList;  
  
  
//初始化顺序表  
Status InitList_Sq(SqList &L,int size,int inc) {  
      
    L.elem = (Elemtype *)malloc(size * sizeof(Elemtype));  
    L.length = 0;  
    L.listsize = size;  
    L.increment = inc;  
    return TRUE;  
}  
  
//创建顺序表  
Status CreateList_Sq(SqList &L) {  
    int i;  
    printf("请输入你要创建的顺序表元素个数：\n");  
    scanf_s("%d", &L.length);  
    if (L.length >= L.listsize) {  
        L.elem = (Elemtype *)realloc(L.elem, (L.listsize + L.increment) * sizeof(Elemtype));  
    }  
    if (!L.elem) {  
        return FLASE;  
    }  
    printf("请输入你要创建的顺序表：\n");  
    for (i = 0; i<L.length; i++) {  
        scanf_s("%d", &L.elem[i]);  
    }  
}  
  
//遍历顺序表  
void print_Sq(SqList &L) {  
    int i;  
    for (i = 0; i<L.length; i++) {  
        printf("%4d", L.elem[i]);  
    }  
}  
  
//查找元素的位置  
int Search_Sq(SqList L, Elemtype e) {  
    int i = 0;  
    while (L.elem[i] != e&&i<L.length) {  
        i++;  
    }  
    if (i>L.length)  
        return -1;  
    else  
        return i + 1;//因为C语言是从下标为0开始的，当i=0时表示第一个元素   
}  
  
//销毁顺序表  
Status DestroyList_Sq(SqList &L) {  
    if (L.elem == NULL)  
        return -1;  
    else  
        free(L.elem);  
    printf("\n销毁成功\n");  
    return TRUE;  
}  
  
//清空顺序表  
Status ClearList_Sq(SqList &L) {  
    if (L.elem == NULL)  
        exit(0);  
    int i;  
    Elemtype *p_elem = L.elem;  
    for (i = 0; i<L.length; i++) {  
        *L.elem = NULL;  
        L.elem++;  
    }  
    L.elem = p_elem;  
}  
  
//判断顺序表是否为空  
Status ListEmpty_Sq(SqList L) {  
    int i;  
    Elemtype* p_elem = L.elem;  
    for (i = 0; i<L.length; i++) {  
        if (*L.elem != 0) {  
            L.elem = p_elem;  
            return FLASE;  
        }  
        L.elem++;  
    }  
    return TRUE;  
}  
  
//求顺序表的长度  
int ListLength_Sq(SqList L) {  
    return L.length;  
}  
  
//用e返回顺序表L中第i个元素的值  
Status GetElem_Sq(SqList L, int i, Elemtype &e) {  
    int j;  
    Elemtype* p_elem = L.elem;  
    if (i<1 || i>L.length)  
        return FLASE;  
    for (j = 1; j <= i; j++)  
        L.elem++;  
    e = *L.elem;  
    L.elem = p_elem;  
    return TRUE;  
}  
  
//将顺序表L中第i个元素赋值为e  
Status PutElem_Sq(SqList &L, int i, Elemtype e) {  
    L.elem[i - 1] = e;  
    return TRUE;  
}  
  
//在顺序表L表尾添加元素e  
Status Append_Sq(SqList &L, Elemtype e) {  
      
    L.elem[L.length] = e;  
    L.length++;  
    L.listsize += L.increment;  
    return TRUE;  
}  
  
//删除顺序表L表尾元素  
    Status DeleteLast_Sq(SqList &L, Elemtype &e) {  
    e = L.elem[L.length - 1];  
    L.length--;  
    return TRUE;  
}  
```



#### 主函数.c

```c
#include <stdio.h>  
#include <stdlib.h>  
#include "顺序表.h"  
#include "源代码.h"  
  
//--------------------主函数入口--------------------  
  
int main(){  
    SqList L;  
    int size, inc;  
    int e;  
    int a;  
    int length;   
    int i;  
    int temp;  
    int j=10;  
    int ee;   
    printf("\n--------------------顺序表初始化------------------\n");  
    printf("请输入顺序表的长度size以及扩容量：\n");  
    scanf_s("%d %d", &size, &inc);  
    InitList_Sq(L, size, inc);  
    CreateList_Sq(L);  
  
    printf("\n--------------------判断是否为空------------------\n");  
  
    if(ListEmpty_Sq(L)){  
        printf("该顺序表为空\n");   
    }  
    else  
        printf("该顺序表不为空\n");  
          
    printf("\n--------------------遍历顺序表--------------------\n");  
      
    printf("此时顺序表为：\n");  
    print_Sq(L);  
      
    printf("\n--------------------查找元素----------------------\n");  
  
    printf("\n请输入要查找的元素：\n");  
    scanf_s("%d",&e);  
    a = Search_Sq(L, e);  
    printf("%d为第%d位：\n",e,a);  
      
    printf("\n--------------------输出长度----------------------\n");  
  
    length = ListLength_Sq(L);   
    printf("顺序表的长度为%d\n",length);  
  
    printf("\n----------将顺序表L中第i个元素赋值为temp----------\n");  
  
    printf("请输入第i个元素的i值和temp值：\n");  
    scanf_s("%d %d",&i,&temp);  
    PutElem_Sq(L, i, temp);  
    printf("\n此时顺序表为：\n");  
    print_Sq(L);  
      
    printf("\n---------------在顺序表表尾添加元素---------------\n");  
  
    Append_Sq(L, j);  
    printf("\n此时顺序表为：\n");  
    print_Sq(L);  
      
    printf("\n---------------在顺序表表尾删除元素---------------\n");  
  
    DeleteLast_Sq(L, ee);  
    printf("\n被删除的元素为%d\n",ee);  
    printf("此时顺序表为：\n");  
    print_Sq(L);  
      
    printf("\n-------------------清空顺序表---------------------\n");  
  
    ClearList_Sq(L);  
    if(ListEmpty_Sq(L)){  
        printf("\n清空成功\n");   
    }   
  
    printf("\n------------------销毁顺序表----------------------\n");  
  
    DestroyList_Sq(L);   
    getchar();  
    getchar();  
    return 0;  
}  
```

### 总结

​	经过这次的实践，较为深刻的理解了顺序表的结构以及基本操作。