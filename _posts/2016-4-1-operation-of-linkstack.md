---
layout: post
#标题配置
title:  用C语言实现链栈的基本操作
#时间配置
date:   2016-4-1 01:08:00 +0800
#大类配置
categories: 数据结构
#小类配置
tag: 教程
---

* content
{:toc}


### 前言  

      本文是关于链栈的**增删查改**等基本操作。

### 所用语言

      C

### 编译环境

      dev c++

### 代码

#### LinkStack.h

```c
typedef struct StackNode{  
  ElemType data;   
  struct StackNode *next;   
} StackNode, *StackNodePtr;  
typedef struct LinkStack {   
StackNodePtr top;   
int count;  
} LinkStack, *LinkStackPtr;  
// 构造一个空栈 S，成功返回 TRUE，失败返回 FALSE   
Status initStack(LinkStackPtr S);  
/********************************************************************************** 
Name............:  
Status push(LinkStackPtr S,ElemType e)  
Description.....:  
数据 e 压栈  
Parameters......: S-指向 LinkStack 类型指针变量 e-压栈的数据  
Return values...:  
成功-return TRUE 失败-return FALSE  
PreCondition....：调用 push 前，S 需要经过 initStack 初始化 
PostCondition...：成功时，生成了一个存储 e 的新结点，数据 e 压入了 S 栈顶，栈 S 的长度 count 增 1，同时栈 S 的 top 指针指向新结点；失败时，栈 S 不改变 **********************************************************************************/  
// 数据压栈，成功返回 TRUE,失败返回 FALSE   
Status push(LinkStackPtr S, ElemType e);   
// 数据弹栈，并赋值给 e，成功返回 TRUE,失败返回 FALSE   
Status pop(LinkStackPtr S, ElemType *e);   
// 栈的判空，若为空，返回 TRUE，否则返回 FALSE   
Status isStackEmpty(LinkStackPtr S);  
// 获取栈顶元素，并赋值给 e，成功返回 TRUE,失败返回 FALSE   
Status getTop(LinkStackPtr S, ElemType *e);   
// 销毁栈，成功返回 TRUE,失败返回 FALSE   
Status destroyStack(LinkStackPtr S);  
//利用上面的操作，实现一个算术表达值的求值。  
（求值独立成一个函数，写在 test.c 中，带括号的中 缀表达式只包括加减，包括括号），比如： (1+(2-3)-(4+5))   
*/ 
```



#### 栈作业.h

```c
//将int类型定义为ElemType   
typedef int ElemType;  
  
//链栈结构   
typedef struct StackNode {  
     ElemType data;  
     struct StackNode *next;  
} StackNode, *StackNodePtr;  
  
typedef struct LinkStack {  
    StackNodePtr top;  
    int count;  
} LinkStack, *LinkStackPtr;   
  
typedef enum Status  
{  
    FLASE, TRUE  
}Status;  
  
// 构造一个空栈S，成功返回TRUE，失败返回FALSE   
  
Status initStack(LinkStackPtr S);   
  
/********************************************************************************** 
 
 Name............: Status push(LinkStackPtr S,ElemType e)  
 
 Description.....: 数据e压栈  
 
 Parameters......: S-指向LinkStack类型指针变量  
 
                  e-压栈的数据  
 
 Return values...: 成功-return TRUE  
 
                  失败-return FALSE  
 
 PreCondition....：调用push前，S需要经过initStack初始化  
 
 PostCondition...：成功时，生成了一个存储e的新结点，数据e压入了S栈顶，栈S的长度count  
 
增1，同时栈S的top指针指向新结点；失败时，栈S 不改变  
 
**********************************************************************************/  
  
// 数据压栈，成功返回TRUE,失败返回FALSE   
  
Status push(LinkStackPtr S, ElemType e);   
  
// 数据弹栈，并赋值给e，成功返回TRUE,失败返回FALSE   
  
Status pop(LinkStackPtr S, ElemType *e);   
  
// 栈的判空，若为空，返回TRUE，否则返回FALSE   
  
Status isStackEmpty(LinkStack S);   
  
// 获取栈顶元素，并赋值给e，成功返回TRUE,失败返回FALSE   
  
Status getTop(LinkStackPtr S, ElemType *e);   
  
// 销毁栈，成功返回TRUE,失败返回FALSE   
  
Status destroyStack(LinkStackPtr S);   
  
// 输出栈的元素   
Status StackTraverse(LinkStack S);  
  
unsigned char Prior[8][8] =    
{ // 运算符优先级表     
    // '+' '-' '*' '/' '(' ')' '#' '^'     
    /*'+'*/'>','>','<','<','<','>','>','<',     
    /*'-'*/'>','>','<','<','<','>','>','<',     
    /*'*'*/'>','>','>','>','<','>','>','<',     
    /*'/'*/'>','>','>','>','<','>','>','<',     
    /*'('*/'<','<','<','<','<','=',' ','<',     
    /*')'*/'>','>','>','>',' ','>','>','>',     
    /*'#'*/'<','<','<','<','<',' ','=','<',     
    /*'^'*/'>','>','>','>','<','>','>','>'     
};     
    
typedef struct StackChar    
{    
    char c;     
    struct StackChar *next;     
}SC;       //StackChar类型的结点SC    
    
typedef struct StackFloat    
{    
    float f;     
    struct StackFloat *next;     
}SF;       //StackFloat类型的结点SF  
```



#### 栈作业.c

```c
#include<stdio.h>  
#include<stdlib.h>  
#include"栈作业.h"   
#include<math.h>   
#include<string.h>  
  
/* 构造一个空栈S */   
Status initStack(LinkStackPtr S)  
{  
    S->top = (StackNodePtr)malloc(sizeof(StackNode));    
           if(!S->top)    
        {    
            return FLASE;    
            }     
        S->top = NULL;    
        S->count = 0;    
        return TRUE;  
}  
  
/*插入元素e为新的栈顶元素*/   
Status push(LinkStackPtr S, ElemType e)  
{  
    StackNodePtr s= ( StackNodePtr ) malloc (sizeof (StackNode));   
    if( NULL == s)  
      return FLASE;  
    s->data = e;  
    s->next = S->top;/*把当前的栈顶元素复制给新结点的直接后继*/   
    S->top = s;      /*把新的结点s赋值给栈顶指针*/   
    S->count++;  
    return TRUE;   
}   
  
/*若栈不空，则删除S的栈顶元素，用e返回其值，并返回TRUE；否则返回FALSE*/   
Status pop(LinkStackPtr S, ElemType *e)  
{  
    StackNodePtr p;  
    if(isStackEmpty(*S))  
       return FLASE;  
    *e = S->top->data;  
    p = S->top;  
    S->top = S->top->next;  
    free(p);  
    S->count--;  
    return TRUE;  
}   
  
// 栈的判空，若为空，返回TRUE，否则返回FALSE   
Status isStackEmpty(LinkStack S)  
{  
    return S.count==0?TRUE:FLASE;      
}   
  
// 获取栈顶元素，并赋值给e，成功返回TRUE,失败返回FALSE   
Status getTop(LinkStackPtr S, ElemType *e)  
{  
    if(S->top == NULL)  
    {  
        return FLASE;  
    }  
    else  
    {  
        *e = S->top->data;  
    }  
    return TRUE;  
}  
  
// 销毁栈，成功返回TRUE,失败返回FALSE   
Status destroyStack(LinkStackPtr S)  
{  
    StackNodePtr p,q;  
    p = S->top;  
    while(p)  
    {  
        q = p;  
        p = p->next;  
        free(q);  
    }  
    S->count=0;  
    return TRUE;  
}  
//输出栈的元素   
Status StackTraverse(LinkStack S)    
{    
    StackNodePtr p;    
    p=S.top;    
    while(p)    
    {    
        printf("%d ",p->data);    
        p=p->next;    
    }    
    printf("\n");   
         return TRUE;    
}   
  
  
/*********************************************************************** 
 
 
各个模块的主要功能： 
 *Push(SC *s,char c)：把字符压栈 
 *Push1(SF *s,float f)：把数值压栈 
 *Pop(SC *s)：把字符退栈 
 *Pop1(SF *s)：把数值退栈 
 Operate(a,theta,b)：根据theta对a和b进行'+' 、'-' 、'*' 、'/' 、'^'操作 
 In(Test,*TestOp)：若Test为运算符则返回true，否则返回false 
 ReturnOpOrd(op,*TestOp)：若Test为运算符，则返回此运算符在数组中的下标 
 precede(Aop,Bop)：根据运算符优先级表返回Aop与Bop之间的优先级 
 EvaluateExpression(*MyExpression)：用算符优先法对算术表达式求值 
  
  
 ***********************************************************************/  
  
  
SC *Push(SC *s,char c)          //SC类型的指针Push，返回p    
{    
    SC *p=(SC*)malloc(sizeof(SC));     
    p->c=c;     
    p->next=s;     
    return p;     
}     
    
SF *Push1(SF *s,float f)        //SF类型的指针Push，返回p    
{    
    SF *p=(SF*)malloc(sizeof(SF));     
    p->f=f;     
    p->next=s;     
    return p;     
}     
    
SC *Pop(SC *s)    //SC类型的指针Pop    
{    
    SC *q=s;     
    s=s->next;     
    free(q);     
    return s;     
}     
    
SF *Pop1(SF *s)      //SF类型的指针Pop    
{    
    SF *q=s;     
    s=s->next;     
    free(q);     
    return s;     
}     
    
float Operate(float a,unsigned char theta, float b)      //计算函数Operate    
{    
    switch(theta)    
    {    
    case '+': return a+b;     
    case '-': return a-b;     
    case '*': return a*b;     
    case '/': return a/b;     
    case '^': return pow(a,b);     
    default : return 0;     
    }     
}     
    
char OPSET[8]={'+','-','*','/','(',')','#','^'};     
    
Status In(char Test,char *TestOp)    
{    
    int Find=FLASE,i;     
    for(i=0; i< 8; i++)    
    {    
        if(Test == TestOp[i])    
            Find= TRUE;     
    }     
    return Find;     
}     
    
Status ReturnOpOrd(char op,char *TestOp)    
{     
    int i;  
    for(i=0; i< 8; i++)    
    {    
        if (op == TestOp[i])    
            return i;    
    }    
}   
   
char precede(char Aop, char Bop)    
{     
    return Prior[ReturnOpOrd(Aop,OPSET)][ReturnOpOrd(Bop,OPSET)];     
}     
    
float EvaluateExpression(char* MyExpression)    
{     
    // 算术表达式求值的算符优先算法    
    // 设OPTR和OPND分别为运算符栈和运算数栈，OP为运算符集合     
    SC *OPTR=NULL;       // 运算符栈，字符元素     
    SF *OPND=NULL;       // 运算数栈，实数元素     
    char TempData[20];     
    float Data,a,b;     
    char theta,*c,Dr[]={'#','\0'};     
    OPTR=Push(OPTR,'#');     
    c=strcat(MyExpression,Dr);     
    strcpy(TempData,"\0");//字符串拷贝函数     
    while (*c!= '#' || OPTR->c!='#')    
    {     
        if (!In(*c, OPSET))    
        {     
            Dr[0]=*c;     
            strcat(TempData,Dr);           //字符串连接函数     
            c++;     
            if (In(*c, OPSET))    
            {     
                Data=atof(TempData);       //字符串转换函数(double)     
                OPND=Push1(OPND, Data);     
                strcpy(TempData,"\0");     
            }     
        }     
        else    // 不是运算符则进栈     
        {    
            switch (precede(OPTR->c, *c))    
            {    
            case '<': // 栈顶元素优先级低     
                OPTR=Push(OPTR, *c);     
                c++;     
                break;     
            case '=': // 脱括号并接收下一字符     
                OPTR=Pop(OPTR);     
                c++;     
                break;     
            case '>': // 退栈并将运算结果入栈     
                theta=OPTR->c;OPTR=Pop(OPTR);     
                b=OPND->f;OPND=Pop1(OPND);     
                a=OPND->f;OPND=Pop1(OPND);     
                OPND=Push1(OPND, Operate(a, theta, b));     
                break;     
            } //switch    
        }     
    } //while     
    return OPND->f;     
} //EvaluateExpression  
```



#### Test.c

```c
#include<stdio.h>  
#include<stdlib.h>   
#include"栈作业.c"  
int main()  
{  
    int j;    
    LinkStack s;    
    int e;    
    if(initStack(&s))    
        for(j=1;j<=10;j++)    
            push(&s,j);    
    printf("栈中元素依次为：");    
    StackTraverse(s);    
    pop(&s,&e);    
    printf("弹出的栈顶元素 e=%d\n",e);    
    printf("栈空否：%d(1:空 0:否)\n",isStackEmpty(s));    
    getTop(&s,&e);   
    destroyStack(&s);    
    printf("清空栈后，栈空否：%d(1:空 0:否)\n",isStackEmpty(s));  
    char array[128];    
    puts("请输入表达式:");     
    gets(array);    
    puts("该表达式的值为:");     
    printf("%s\b=%g\n",s,EvaluateExpression(array));   
    getchar();    
    return 0;   
}  
```



### 总结

     本次通过对链栈的基本操作的编写，较深刻的理解了栈的结构以及原理，虽然过程磕磕绊绊，但是收获蛮多的。