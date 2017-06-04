---
layout: post
#标题配置
title:  C语言实行顺序栈的基本操作
#时间配置
date:   2016-10-01 01:08:00 +0800
#大类配置
categories: 数据结构
#小类配置
tag: 教程
---

* content
{:toc}


### 前言

          继顺序表之后再写一个顺序栈的基本操作。

### 语言

          C

### 编译环境

          VS 2015

### 实现功能

Status InitStack(SqStack &S);                        //栈的初始化  
Status Push(SqStack &S,Elemtype e);         //入栈  
Status Pop(SqStack &S,Elemtype &e);        //弹栈  
Status GetTop(SqStack S,Elemtype &e);     //取得栈顶元素  
Status StackEmpty(SqStack S);                    //判空  
int StackLength(SqStack S);                          //求得栈的长度  
Status StackTraverse(SqStack S);                 //栈的转置  
Status ClearStack(SqStack &S);                    //清空栈  
Status DestroyStack(SqStack &S);               // 栈的销毁  

### 代码

   #### SqStackHeader.h

```c
//--------------------栈的顺序存储结构--------------------  
  
#define STACK_INIT_SIZE 100  
#define STACKINCREACE 10  
typedef int Elemtype;//在头文件中说明  
typedef int Status;  
typedef struct{  
    Elemtype *base;  
    Elemtype *top;  
    int stacksize;  
}SqStack;  
  
//----------------------函数声明部分----------------------  
  
Status InitStack(SqStack &S);  
Status Push(SqStack &S,Elemtype e);  
Status Pop(SqStack &S,Elemtype &e);  
Status GetTop(SqStack S,Elemtype &e);  
Status StackEmpty(SqStack S);  
int StackLength(SqStack S);  
Status StackTraverse(SqStack S);  
Status ClearStack(SqStack &S);  
Status DestroyStack(SqStack &S);  
  
//------------------栈的初始化函数------------------  
  
Status InitStack(SqStack &S){  
    S.base = (Elemtype *)malloc(STACK_INIT_SIZE*sizeof(Elemtype));  
    if(!S.base){  
        return false;  
    }  
    S.stacksize=STACK_INIT_SIZE;  
    S.top=S.base;  
    return true;  
}  
  
//---------------------入栈函数---------------------  
  
Status Push(SqStack &S,Elemtype e){  
//判断是否溢出  
    if(S.top-S.base>=S.stacksize){          
        S.base=(Elemtype *)realloc(S.base,(S.stacksize+STACKINCREACE)*sizeof(Elemtype));  
        if(!S.base){  
            return false;  
        }  
        S.top=S.base+S.stacksize;//注意因为这里的栈底指针的改变，导致栈顶指针随之改变  
        S.stacksize+=STACKINCREACE;  
    }  
//压栈部分  
    *S.top=e;  
    S.top++;//栈顶指针加一   
    return true;  
}  
  
//---------------------出栈函数---------------------  
  
Status Pop(SqStack &S,Elemtype &e){  
//非法判断  
    if(S.base==S.top){  
        return false;  
    }  
    S.top--;    //注意这里因为top指向栈中当前元素的上一个空间，所以要先将其位置减一  
    e=*S.top;  
    return true;  
    }  
      
//-------------------查看栈顶元素-------------------  
  
Status GetTop(SqStack S,Elemtype &e){  
    if(S.base==S.top ){  
        return false;  
    }  
    e=*(S.top-1);  
    return true;  
}  
  
//------------------判断栈是否为空------------------  
  
Status StackEmpty(SqStack S){  
    if(S.base==S.top){  
        return true;  
    }  
    return false;  
}  
  
//------------------返回栈元素个数------------------  
  
int StackLength(SqStack S){  
    if(S.base==S.top){  
        return 0;  
    }  
    return S.top-S.base;  
}  
  
//--------------------遍历栈------------------------  
  
Status StackTraverse(SqStack S){//从栈底到栈顶的方向  
    if(S.top==S.base){  
        return false;  
    }  
    while(S.base <S.top ){  
        printf("%d\t",*(S.base++));  
    }  
    printf("\n");  
    return true;  
}  
  
//--------------------清空栈------------------------  
  
Status ClearStack(SqStack &S){//清空栈的时候不用将stacksize重新赋值  
    S.top=S.base;             //因为经过realloc函数重新分配空间后(stacksize大小改变)，  
    return true;            //S.base指向的是一段stacksize大小的连续存储空间               
                            //即使将他重置，剩余的空间也是闲置的(顺序表里也只是经当前长度置为0)               
    }  
         
//--------------------销毁栈------------------------  
  
Status DestroyStack(SqStack &S){  
    free(S.base);  
    free(S.top);  
    S.base=NULL;  
    return true;  
}  
```

#### main.cpp

```c
//源文件内容  
#include <stdio.h>  
#include <stdlib.h>  
#include "SqStackHeader.h"  
  
//--------------------主函数入口--------------------  
  
int main(){  
    SqStack stack;  
    int temp=1;  
    int getElem=NULL;  
    int popElem=NULL;  
      
printf("\n--------------------栈的初始化--------------------\n");  
  
    InitStack(stack);  
      
printf("\n--------------------元素的入栈--------------------\n");  
  
    Push(stack,temp);  
    Push(stack,2);  
      
printf("\n--------------------遍历顺序栈--------------------\n");  
  
    printf("此时的栈元素有：\n");   
    StackTraverse(stack);  
      
printf("\n-------------------获取栈顶元素-------------------\n");  
  
    GetTop(stack,getElem);  
    printf("栈顶元素是：%d\n",getElem);  
      
printf("\n-------------------判断是否为空-------------------\n");  
  
    bool empty;  
    empty=StackEmpty(stack);  
    if(empty==true){  
        printf("该栈是空栈\n");  
    }  
    else{  
        printf("该栈不是空栈");   
    }   
      
printf("\n--------------------弹栈测试----------------------\n");  
  
    Pop(stack,popElem);  
    printf("弹出的元素是：%d\n",popElem);  
      
printf("\n------------------栈的清空及销毁------------------\n");  
  
//    ClearStack(stack);  
//    DestroyStack(stack);  
  
    printf("此时的栈元素有：\n");   
    StackTraverse(stack);  
printf("\n--------------------输出栈长度--------------------\n");  
  
    printf("栈的长度：%d\n",StackLength(stack));  
    getchar();  
    return 0;  
}  
```



### 总结

        本次也是根据书里给的接口，然后自己去实现这些功能，相比链栈，顺序栈简单了不少，感觉收获还是挺大的。