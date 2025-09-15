---
title: CS188 Project 1 (人工智慧 作業三)
published: 2025-05-20
description: '偶爾認真寫一下作業'
image: ''
tags: ['Course', 'Python', 'AI']
category: 'School'
draft: true 
lang: ''
---

# 前言
老師發了一個作業三，但給的資訊太少了<br>
後來發現是[CS188的課程專案](https://inst.eecs.berkeley.edu/~cs188/sp25/projects/proj1/)<br>
所以就去看原課程的專案解釋了

喔對老師給的`search.zip`還是舊版ㄉ<br>
遇到這個問題去把`cgi.escape`改成`html.escape`<br>
然後改成`import html`
![alt text](AI_HW3/image.png)


# 專案要求
* 實作搜尋演算法
* 要改的檔案
  * `search.py`
  * `searchAgent.py`
* 使用 `autograder.py` 進行評分
```
python autograder.py
```
* 有8項要評分
  * Q1 (3 pts): Finding a Fixed Food Dot using Depth First Search (Lecture 2) `用DFS找到指定點`
  * Q2 (3 pts): Breadth First Search (Lecture 2) `用BFS`
  * Q3 (3 pts): Varying the Cost Function (Lecture 2) `變更Cost函數`
  * Q4 (3 pts): A* search (Lecture 3) `用 A* 搜尋`
  * Q5 (3 pts): Finding All the Corners (Lecture 3) `找到所有角落`
  * Q6 (3 pts): Corners Problem: Heuristic (Lecture 3) `用 Heuristic 找角落`
  * Q7 (4 pts): Eating All The Dots `吃掉所有點點`
  * Q8 (3 pts): Suboptimal Search `用次優搜尋`
  
# 實作

## Q1: Finding a Fixed Food Dot using Depth First Search