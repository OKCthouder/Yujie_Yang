---
layout: post
#标题配置
title:  C语言实现链表的基本操作
#时间配置
date:   2016-3-22 01:08:00 +0800
#大类配置
categories: 数据结构
#小类配置
tag: 教程
---

* content
{:toc}


## 前言

    本文是用C语言实现的关于链表的增删查改等基本操作。



## 编译环境

dev c++



下面贴出代码：

## 代码

```c
#include <stdio.h>  
#include <stdlib.h>  
  
typedef struct Node  
{  
    int data;  
    struct Node *next;  
}Node, *ptr_Node;  
  
typedef enum Status  
{  
    SUCCESS, ERROR  
}Status;  
  
const int MAXN = 1e5+7;  
const int totalPerLine = 8;  
int totalNode;  
  
ptr_Node create(int *arr, int n);  
void destroy(ptr_Node head);  
Status _insert(ptr_Node *head, ptr_Node node, int index);  
Status _delete(ptr_Node *head, int index, int *data);  
int search(ptr_Node head, int data);  
Status edit(ptr_Node head, int index, int *data);  
void print(ptr_Node head);  
Status sort(ptr_Node *head);  
  
int main()  
{  
    int i, n;  
    int data[MAXN];  
    printf("please input n:\n");   
    scanf("%d", &n);  
    printf("please input %d numbers:\n",n);  
    for(i = 0; i < n; ++i) scanf("%d", &data[i]);//初始化数组；   
    totalNode = n;  
    ptr_Node head = create(data, n);//将数组的内容输入到链表中；  
    printf("Now the List is:\n");   
    print(head);//输出链表的内容；   
    Node* node = (Node*)calloc(1, sizeof(Node*));//初始化要插入的结点；   
    node->data = 122344;  
    node->next = NULL;  
    printf("insert node to 2\n");  
    _insert(&head, node, 2);//将node插入到第2位之后；   
    print(head);//输出插入后的结果；   
    int k = 0;  
    printf("delete a number:\n");   
    _delete(&head, 2, &k);//删除第2个数字的后一位；   
    print(head);  
    printf("the delete number is:\n");  
    printf("%d\n", k);//输出删除后的结果 ；   
    k = search(head, 122344);//在链表中寻找122344；   
    printf("%d\n", k);  
    k = search(head, 12);  
    printf("%d\n", k);  
    printf("edit the (index+1) number:\n");  
    edit(head, 2, &k);  
    print(head);  
    printf("%d\n", k);   
    printf("the sort numbers are:\n");  
     sort(&head);  
    print(head);  
    destroy(head);  
    return 0;  
}  
  
ptr_Node create(int *arr, int n)  
{  
    Node *head = (Node*)calloc(1, sizeof(Node));  
    if(head == NULL) return NULL;  
    int cur = 0;  
    head->data = arr[cur++];  
    Node *curNode = head;  
    while(cur < n){  
        Node* temp = (Node*)calloc(1, sizeof(Node));  
        if(temp == NULL)  
        {  
            destroy(head);  
            return NULL;  
        }  
        temp->data = arr[cur++];  
        curNode->next = temp;  
        curNode = temp;  
    }  
    return head;  
}  
  
void destroy(ptr_Node head)  
{  
    Node *curNode = head;  
    while(curNode != NULL)  
    {  
        Node *temp = curNode->next;  
        free(curNode);  
        curNode = temp;  
    }  
}  
  
Status _insert(ptr_Node *head, ptr_Node node, int index)  
{  
    int cur = 1;  
    ptr_Node curNode = *head;  
    while(cur < index)  
    {  
        curNode = curNode->next;  
        ++cur;  
    }  
    Node* rest = curNode->next;  
    curNode->next = node;  
    node->next = rest;  
    ++totalNode;  
    return SUCCESS;  
}  
  
Status _delete(ptr_Node *head, int index, int *data)  
{  
    if(index == totalNode) return ERROR;  
    int cur = 1;  
    ptr_Node curNode = *head;  
    while(cur < index)  
    {  
        curNode = curNode->next;  
        ++cur;  
    }  
    Node *rest = curNode->next->next;  
    Node *temp = curNode->next;  
    curNode->next = rest;  
    *data = temp->data;  
    free(temp);  
    --totalNode;  
    return SUCCESS;  
}  
  
int search(ptr_Node head, int data)  
{  
    int cur = 0;  
    ptr_Node curNode = head;  
    while(curNode->data != data)  
    {  
        curNode = curNode->next;  
        if(curNode == NULL) return -1;  
        ++cur;  
    }  
    return cur;  
}  
  
Status edit(ptr_Node head, int index, int *data)  
{  
    if(index == totalNode) return ERROR;  
    int cur = 0;  
    ptr_Node curNode = head;  
    while(cur < index)  
    {  
        curNode = curNode->next;  
        ++cur;  
    }  
    printf("%d\n", *data);  
    int temp = curNode->data;  
    curNode->data = *data;  
    *data = temp;  
    return SUCCESS;  
}  
  
void print(ptr_Node head)  
{  
    int curPerLine = 0;  
    ptr_Node curNode = head;  
    while(curNode != NULL)  
    {  
        if(curPerLine == totalPerLine)  
        {  
            puts("");  
            curPerLine = 0;  
        }  
        printf("%d ", curNode->data);  
        ++curPerLine;  
        curNode = curNode->next;  
    }  
    puts("");  
}  
  
Status sort(ptr_Node *head)  
{  
    ptr_Node curNodeA = *head;  
    while(curNodeA != NULL)  
    {  
        ptr_Node curNodeB = curNodeA;  
        ptr_Node temp = curNodeA;  
        while(curNodeB != NULL)  
        {  
            if(temp->data > curNodeB->data) temp = curNodeB;  
            curNodeB = curNodeB->next;  
        }  
        int tempData = curNodeA->data;  
        curNodeA->data = temp->data;  
        temp->data = tempData;  
        curNodeA = curNodeA->next;  
    }  
    return SUCCESS;  
}  
```



## 总结

      这是第一次做这么长的东西，感觉有点凌乱，有时候找bug找到想哭，不过在这个过程中收获了特别多。