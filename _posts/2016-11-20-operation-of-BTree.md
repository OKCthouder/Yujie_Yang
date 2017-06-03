---
layout: post
#标题配置
title:   抽象性设计——用C语言实现B树的基本操作
#时间配置
date:   2016-12-20 01:08:00 +0800
#大类配置
categories: 数据结构
#小类配置
tag: 教程
---

* content
{:toc}


### 前言

          这次做的是**[数据结构](http://lib.csdn.net/base/datastructure)**的一个抽象性实验，我选择的是B树的基本操作。

### 语言

         C

### 编译环境

          VS 2015

### 实现功能

          //接口定义  


          void CreatBTree(BTree&T, int n, int m);  
          /* 
          初始条件:初始化关键字个数n大于等于0，B树的阶数m大于3小于等于20 
          操作结果:构建一颗阶数为m,含有n个关键字的B树 
          */  


          void SearchBTree(BTree T, int k, result &r);  
          /* 
          初始条件:树T存在 
          操作结果:在m阶B数T上查找关键字k，返回p{pt,i,tag} 
          */  


          void InsertBTree(BTree &T, int k, BTree q, int i,int m);  
          /* 
          初始条件:树T存在 
          操作结果:在B树T上结点p->pt的key[i]和key[i+1]之间插入关键字k 
          */  


          void DeleteBTree(BTree p, int i, int m, BTree &T);  
          /* 
          初始条件:B树上p结点存在 
          操作结果:删除B树T上结点p->pt的关键字k 
          */  


          void PrintBTree(BTree T);  
          /* 
          初始条件:树T存在 
          操作结果:中序遍历B树 
          */  


          void DestroyBTree(BTree T);  
          /* 
          初始条件:树T存在 
          操作结果:销毁B树 
          */  

          int menu();  
          /* 
          输出选择菜单 
          */  



### 源代码

#### BTree.h

```c
#include<stdio.h>  
#include<stdlib.h>  
#include<time.h>  
  
  
#define TRUE 1  
#define FALSE 0  
#define OVERFLOW -1  
#define OK 1  
#define ERROR 0  
#define M 20//定义阶数最大值  
  
  
  
  
typedef int KeyType;  
typedef int Status;  
typedef struct {  //记录的结构定义  
KeyType key;  
char data;  
}Record;  
  
  
typedef struct BTNode{        //B树结点类型定义  
int keynum;      //结点中关键字个数，即结点的大小  
KeyType key[M + 1]; //关键字，key[0]未用  
struct BTNode *parent; //双亲结点指针  
struct BTNode *ptr[M + 1];//孩子结点指针数组  
Record *recptr[M + 1];    //记录指针向量，0号单元未用  
}BTNode,*BTree;  //B树结点和B树类型  
  
  
typedef struct {  
BTree pt;  //指向找到的结点  
int i;  //1<=i<=m,在结点中的关键字位序  
int tag;  //1:查找成功，0:查找失败  
}result,*resultPtr;  //B树的查找结果类型  
  
  
//接口定义  
  
  
void CreatBTree(BTree&T, int n, int m);  
/* 
初始条件:初始化关键字个数n大于等于0，B树的阶数m大于3小于等于20 
操作结果:构建一颗阶数为m,含有n个关键字的B树 
*/  
  
  
void SearchBTree(BTree T, int k, result &r);  
/* 
初始条件:树T存在 
操作结果:在m阶B数T上查找关键字k，返回p{pt,i,tag} 
*/  
  
  
void InsertBTree(BTree &T, int k, BTree q, int i,int m);  
/* 
初始条件:树T存在 
操作结果:在B树T上结点p->pt的key[i]和key[i+1]之间插入关键字k 
*/  
  
  
void DeleteBTree(BTree p, int i, int m, BTree &T);  
/* 
初始条件:B树上p结点存在 
操作结果:删除B树T上结点p->pt的关键字k 
*/  
  
  
void PrintBTree(BTree T);  
/* 
初始条件:树T存在 
操作结果:中序遍历B树 
*/  
  
  
void DestroyBTree(BTree T);  
/* 
初始条件:树T存在 
操作结果:销毁B树 
*/  
  
  
int menu();  
/* 
输出选择菜单 
*/  
```

#### OperationDefine.cpp

```
#include "BTree.h"  
  
  
void CreatBTree(BTree &T, int n, int m) {//构建一颗阶数为m,含有n个关键字的B树(3<=m<=M,0<=n<=10000)  
//创建B树  
int i, j;  
resultPtr p = NULL;  
p = (result*)malloc(sizeof(result));  
srand((unsigned)time(NULL));  
if (n == 0)  
printf("已成功初始化一棵空树。\n");  
else {  
for (j = 0; j < n; j++) {  
i = rand() % 1000;//生成随机数i  
SearchBTree(T, i, *p);//查找i插入位置  
InsertBTree(T, i, p->pt, p->i, m);  //进行插入  
}  
printf("创建B树成功！\n");  
}  
}  
  
  
void PrintBTree(BTree T) {  
//中序遍历B树  
int i = 1;  
if (NULL != T) {  
for (; i <= T->keynum; i++) {  
PrintBTree(T->ptr[i - 1]);  
printf("%d  ", T->key[i]);  
}  
PrintBTree(T->ptr[i - 1]);  
}  
}  
  
  
int Search(BTree p, int k) {  
int i = 1;  
while (i <= p->keynum&&k > p->key[i])  
i++;  
return i;  
}  
  
  
void SearchBTree(BTree T, int k, result &r) {  
//在m阶B树T上查找关键字k，返回(pt,i,tag)  
//若查找成功，则特征值tag=1,指针pt所致结点中第i个关键字等于k;否则  
//特征值tag=0，等于k的关键字记录应插入在指针pt所指结点中第i-1个和第i个关键字间  
int i = 0, found = 0;  
BTree p = T, q = NULL;  
while (p != NULL && 0 == found) {  
i = Search(p, k);//在p->key[1..keynum]中查找p->key[i-1]<k<=p->p->key[i]  
if (i > 0 && p->key[i] == k)  
found = 1;//找到待查关键字  
else{  
q = p;  
p = p->ptr[i - 1];  
}  
}  
if (1 == found) {//查找成功  
r.pt = p;  
r.i = i;  
r.tag = 1;  
}  
else {//查找不成功，返回key的插入位置i  
r.pt = q;  
r.i = i;  
r.tag = 0;  
}   
}  
  
  
void split(BTree &q, int s, BTree &ap) {  
//将q结点分裂成两个结点，前一半保留，后一半移入新结点ap  
int i, j, n = q->keynum;  
ap = (BTNode*)malloc(sizeof(BTNode));//生成新结点ap  
ap->ptr[0] = q->ptr[s];  
for (i = s + 1, j = 1; i <= n; i++, j++) {//后一半移入ap结点  
ap->key[j] = q->key[i];  
ap->ptr[j] = q->ptr[i];  
}  
ap->keynum = n - s;  
ap->parent = q->parent;  
for (i = 0; i <= n - s; i++) {  
if (ap->ptr[i])  
ap->ptr[i]->parent = ap;//将ap所有孩子结点指向ap  
}  
q->keynum = s - 1;//q结点的前一半保留，修改keynum  
}  
  
  
void newroot(BTree &T, BTree p, int x, BTree ap) {//生成新的根结点  
T = (BTNode*)malloc(sizeof(BTNode));  
T->keynum = 1;  
T->ptr[0] = p;  
T->ptr[1] = ap;  
T->key[1] = x;  
if (p != NULL) p->parent = T;  
if (ap != NULL) ap->parent = T;  
T->parent = NULL;//新根的双亲是空指针  
}  
  
  
void Insert(BTree &q, int i, int x, BTree ap) {//x和ap分别插到q->key[i]和q->ptr[i]  
int j, n = q->keynum;  
for (j = n; j >= i; j--) {  
q->key[j + 1] = q->key[j];//关键字指针向后移一位  
q->ptr[j + 1] = q->ptr[j];//孩子结点指针向后移一位  
}  
q->key[i] = x;//赋值  
q->ptr[i] = ap;  
if (ap != NULL) ap->parent = q;  
q->keynum++;//关键字数+1  
}  
  
  
void InsertBTree(BTree &T, int k, BTree q, int i, int m) {  
//在B树T上q结点的key[i-1]和key[i]之间插入关键字k  
//若引起结点过大,则沿双亲指针进行必要的结点分裂调整,使T仍是m阶的B树  
int x, s, finished = 0, neednewroot = 0;  
BTree ap;  
if (NULL == q)//q为空，则新建根结点  
newroot(T, NULL, k, NULL);  
else {  
x = k;  
ap = NULL;  
while (0 == neednewroot && 0 == finished) {  
Insert(q, i, x, ap);//key和ap分别插到q->key[i]和q->ptr[i]  
if (q->keynum < m) finished = 1;//插入完成  
else {//分裂q结点  
s = (m + 1) / 2;  
split(q, s, ap);  
x = q->key[s];  
if (q->parent != NULL) {  
q = q->parent;  
i = Search(q, x);//在双亲结点中查找x的插入位置  
}  
else neednewroot = 1;  
}  
}//while  
if (1 == neednewroot)//T是空树或者根结点已分裂为q和ap结点  
newroot(T, q, x, ap);//生成含信息(q,x,ap)的新的根结点T  
}  
}  
  
  
void Successor(BTree &p, int i) {//由后继最下层非终端结点的最小关键字代替结点中关键字key[i]。  
BTNode *temp;  
temp = p->ptr[i];  
for (; NULL != temp->ptr[0]; temp = temp->ptr[0]) ;//找出关键字的后继  
p->key[i] = temp->key[1];  
p = temp;  
}  
  
  
void Remove(BTree &p, int i) {   //从结点p中删除key[i]  
int j;  
int n = p->keynum;  
for (j = i; j < n; j++) {  //关键字左移  
p->key[j] = p->key[j + 1];  
p->ptr[j] = p->ptr[j + 1];  
}  
p->keynum--;  
}  
  
  
void Restore(BTree &p, int i, int m, BTree &T) {//调整B树  
int j;  
BTree ap = p->parent;  
BTree lc, rc, pr;  
int finished = 0, r = 0;  
while (0 == finished) {  
r = 0;  
while (ap->ptr[r] != p)//确定p在ap子树的位置  
r++;  
if (r == 0) {  
r++;  
lc = NULL;  
rc = ap->ptr[r];  
}  
else if (r == ap->keynum) {  
rc = NULL;  
lc = ap->ptr[r - 1];  
}  
else {  
lc = ap->ptr[r - 1];  
rc = ap->ptr[r + 1];  
}  
if (r > 0 && lc != NULL && (lc->keynum > (m - 1) / 2)) {//向左兄弟借关键字  
p->keynum++;  
for (j = p->keynum; j > 1; j--) {//结点关键字右移  
p->key[j] = p->key[j - 1];  
p->ptr[j] = p->ptr[j - 1];  
}  
p->key[1] = ap->key[r];//父亲插入到结点  
p->ptr[1] = p->ptr[0];  
p->ptr[0] = lc->ptr[lc->keynum];  
if (NULL != p->ptr[0])//修改p中的子女的父结点为p  
p->ptr[0]->parent = p;  
ap->key[r] = lc->key[lc->keynum];//左兄弟上移到父亲位置  
lc->keynum--;  
finished = 1;  
break;  
}  
else if (ap->keynum > r&&rc != NULL && (rc->keynum > (m - 1) / 2)) {  
p->keynum++;  
p->key[p->keynum] = ap->key[r];//父亲插入到结点  
p->ptr[p->keynum] = rc->ptr[0];  
if (NULL != p->ptr[p->keynum]) {//修改p中的子女的父结点为p  
p->ptr[p->keynum]->parent = p;  
}  
ap->key[r] = rc->key[1];//右兄弟上移到父亲位置  
rc->ptr[0] = rc->ptr[1];  
for (j = 1; j < rc->keynum; j++) {//右兄弟结点关键字左移  
rc->key[j] = rc->key[j + 1];  
rc->ptr[j] = rc->ptr[j + 1];  
}  
rc->keynum--;  
finished = 1;  
break;  
}  
r = 0;  
while (ap->ptr[r] != p) r++;//重新确定p在ap子树的位置  
if (r > 0 && (ap->ptr[r - 1]->keynum <= (m - 1) / 2)) {//与左兄弟合并  
lc = ap->ptr[r - 1];  
p->keynum++;  
for (j = p->keynum; j > 1; j--) {//将p结点关键字和指针右移1位  
p->key[j] = p->key[j - 1];  
p->ptr[j] = p->ptr[j - 1];  
}  
p->key[1] = ap->key[r];//父结点的关键字与p合并  
p->ptr[1] = p->ptr[0];//从左兄弟右移一个指针  
ap->ptr[r + 1] = lc;  
for (j = 1; j <= lc->keynum + p->keynum; j++) {//将结点p中关键字移到p左兄弟中  
lc->key[lc->keynum + j] = p->key[j];  
lc->ptr[lc->keynum + j] = p->ptr[j];  
}  
if (p->ptr[0]) {//修改p中的子女的父结点为lc  
for (j = 1; j <= p->keynum; j++) {  
p->ptr[p->keynum + j]->parent = lc;  
}  
}  
lc->keynum = lc->keynum + p->keynum;//合并后的关键字个数  
ap->keynum--;  
pr = p;  
free(pr);//释放p结点空间  
pr = NULL;  
p = lc;  
}  
else {//与右兄弟合并  
rc = ap->ptr[r + 1];  
if (r == 0) r++;  
p->keynum++;  
p->key[p->keynum] = ap->key[r];//父结点的关键字与p合并  
p->ptr[p->keynum] = rc->ptr[0];//从右兄弟左移一个指针  
rc->keynum = p->keynum + rc->keynum;//合并后关键字的个数  
ap->ptr[r - 1] = rc;  
for (j = 1; j <= (rc->keynum - p->keynum); j++) {//将p右兄弟的关键字和指针右移  
rc->key[p->keynum + j] = rc->key[j];  
rc->ptr[p->keynum + j] = rc->ptr[j];  
}  
for (j = 1; j <= p->keynum; j++) {//将结点p中关键字和指针移到p右兄弟中  
rc->key[j] = p->key[j];  
rc->ptr[j] = p->ptr[j];  
}  
rc->ptr[0] = p->ptr[0];  
if (p->ptr[0]) {//修改p中的子女的父结点为rc  
for (j = 1; j <= p->keynum; j++) {  
p->ptr[p->keynum + j]->parent = rc;  
}  
}  
for (j = r; j < ap->keynum; j++) {//将父结点中关键字和指针左移  
ap->key[j] = ap->key[j + 1];  
ap->ptr[j] = ap->ptr[j + 1];  
}  
ap->keynum--;//父结点的关键字个数减1  
pr = p;  
free(pr);//释放p结点空间  
pr = NULL;  
p = rc;  
}  
ap = ap->parent;  
if (p->parent->keynum >= (m - 1) / 2 || (NULL == ap&&p->parent->keynum > 0)) {  
finished = 1;  
}  
else if (NULL == ap) {//若调整后出现空的根结点，则删除该根结点，树高减1  
pr = T;  
T = p;//根结点下移  
free(pr);  
pr = NULL;  
finished = 1;  
}  
p = p->parent;  
}  
}  
  
  
void DeleteBTree(BTree p, int i, int m, BTree &T) {  
//删除B树上p结点第i个关键字  
if (p->ptr[i - 1] != NULL) {  
Successor(p, i);         //若不是最下层非终端结点  
DeleteBTree(p, 1, m, T);      //由后继最下层非终端结点的最小关键字代替它  
}  
else {//若是最下层非终端结点  
Remove(p, i);  //从结点p中删除key[i]  
if (p->keynum < (m - 1) / 2)  //删除后关键字个数小于(m-1)/2  
Restore(p, i, m, T); //调整B树  
}  
}  
  
  
void DestroyBTree(BTree T) {  
int i = 1;  
if (NULL != T) {  
for (; i <= T->keynum; i++) {  
DestroyBTree(T->ptr[i - 1]);  
free(T->ptr[i - 1]);  
}  
DestroyBTree(T->ptr[i - 1]);  
}  
}  
  
  
int menu() {//菜单  
int choice;  
printf("\n\n\t\t\t|**********************************************|\n");  
printf("\t\t\t|**********************************************|\n");  
printf("\t\t\t _____________请先创建B树再进行操作！__________\n");  
printf("\t\t\t|                  B树测试界面                 |\n");  
printf("\t\t\t|                                              |\n");  
printf("\t\t\t|   1.创建B树            2.B树结点的查找       |\n");  
printf("\t\t\t|                                              |\n");  
printf("\t\t\t|   3.B树结点的插入      4.B树结点的删除       |\n");  
printf("\t\t\t|                                              |\n");  
printf("\t\t\t|   5.B树的遍历          6.B树的销毁           |\n");  
printf("\t\t\t|                                              |\n");  
printf("\t\t\t|   0.退出                                     |\n");  
printf("\t\t\t|______________________________________________|\n");  
printf("\t\t\t|**********************************************|\n");  
printf("\t\t\t|**********************************************|\n");  
printf("\t\t\t|              15软件工程(4)班                 |\n");  
printf("\t\t\t|                 3115005372                   |\n");  
printf("\t\t\t|                   杨宇杰                     |\n");  
printf("\t\t\t|********************S**************************|\n");  
do {  
printf("\t\t\t请选择功能（输入1-6任意一个数字）:");  
scanf_s("%d", &choice);  
} while (choice<0||choice>6);//避免非法输入  
return choice;  
}  
```

#### BTree_Test.cpp

```
#include<stdio.h>  
#include"BTree.h"  
  
  
int main() {  
BTree T=NULL;  
result r;  
int choice, k, i, m, n;  
  
do{  
choice = menu();  
if (choice >= 0 && choice <= 7) {  
system("cls");//把菜单清除  
switch (choice) {  
case 1:  
printf("请输入B树的阶数m:(3<=m<=20)\n");  
scanf_s("%d", &m);  
printf("请输入B树的初始化关键字个数:(0<=n<=10000)\n");  
scanf_s("%d", &n);  
CreatBTree(T, n, m);  
break;  
case 2:  
printf("请输入要查找的关键字：\n");  
scanf_s("%d", &k);  
SearchBTree(T, k, r);  
if (r.tag) {  
printf("该关键字的位置为该结点中第%d个关键字\n",r.i);  
}  
else {  
printf("该关键字不存在！\n");  
}  
break;  
case 3:  
printf("请输入要插入的关键字k：\n");  
scanf_s("%d", &k);  
SearchBTree(T, k, r);  
InsertBTree(T, k, (&r)->pt, (&r)->i, m);  
printf("插入成功！\n");  
break;  
case 4:  
printf("请输入要删除B树T上的关键字：\n");  
scanf_s("%d", &i);  
SearchBTree(T, i, r);  
DeleteBTree(r.pt, r.i, m, T);  
printf("删除成功！\n");  
break;  
case 5:  
printf("此时的B树序列为：\n");  
PrintBTree(T);  
printf("\n");  
break;  
case 6:  
DestroyBTree(T);  
printf("销毁成功！\n");  
break;  
default:;  
}  
}  
}while (choice > 0 && choice < 7);  
return 0;  
}  
```

### 总结

          本次是数据结构课程的课程设计之一，从中学到了好多东西，更加深刻的理解了B树的操作原理，也为后来做B树图书馆提供了基础。