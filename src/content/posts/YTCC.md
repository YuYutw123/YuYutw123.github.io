---
title: YouTube CC字幕輸出工具
published: 2022-04-17
description: '輸出YT CC字幕的東東。'
# image: '/assets/images/logo.png'
tags: ["Python", "Tkinter"]
category: 'Side project'
draft: false 
---
# YouTube CC字幕輸出工具

## 動機
我自己本身有在經營翻譯影片的頻道，大多翻譯英文影片，多次翻譯下來，我發現YouTube上有許多原文為英文的影片會自動產生英文字幕，準確率頗高，如果能善加利用，便會提高翻譯的效率。

我的翻譯頻道↓[頻道連結](https://www.youtube.com/c/%E7%83%A4%E8%82%89%E4%BB%94)
![](https://i.imgur.com/uYeMNsR.png)

## 程式構思
最一開始我想寫出一個程式，能透過api抓取youtube自動生成的字幕，標記時間戳後，輸出成txt文字檔。
很快地，大約花了兩個小時我就完成以上功能。

![](https://i.imgur.com/tNu2UPA.png)

## 改良程式
看著程式成功執行，我卻覺得還不夠，簡陋的執行畫面、不精確的時間標記，這不是我想完成的程式。
我還有許多能做的，可以為他加上GUI、可以將他輸出能srt字幕檔，讓人便於操作，能直接透過字幕檔案翻譯。
決定好該做的東西後，我便開始排版規劃程式的外觀，我透過Photoshop設計了GUI的外觀。
![](https://i.imgur.com/CHwFefC.png)

再來是主程式的編寫，我使用tkinter這個模組來建立圖形化介面，加上各個物件，並撰寫各個功能。
完成後，程式的最終樣貌如下。
![](https://i.imgur.com/HEStwoJ.png)

## 程式測試
完成程式後，接著就是測試環節，我用了自己的電腦進行測試，程式能夠順利執行，接著請了幾位朋友測試，也都能正常執行。
測試影片連結: https://youtu.be/tC0tWLqr-LQ

## 心得
其實在寫這個程式之前，我對python這個語言的語法不是很熟悉，所以找了入門教學來看，依靠過去學其他語言的經驗，我大概花了2個小時就熟悉了python，過去寫python程式都是照樣造句，看完教學後我才了解了每行程式碼背後的意義，並自行寫出自己的程式。

編寫程式時，困擾我最久的是轉換srt字幕檔案的功能，利用api抓下來的資料型態是一個list of dict，所得到的資料是每段話「開始的時間」和「持續的時間」且單位為秒，我需要自行計算每段話何時結束，我得讓結束時間小於等於下一段話的開始時間。
由於輸出字幕的方式是用for迴圈讓他一個dict一個dict跑，所以我無法取得下一個dict的資料，再查了許多資料後才終於解決這個問題。

這個程式算是我目前寫過最完整的程式，有圖形化介面、實質用途，真的對自己有幫助的程式。
這次的經驗也讓我知道註解的重要性，因為整個程式大約花了兩個星期才做完，每次重新開啟檔案，先前的思緒都會消失，需要再重新閱讀去理解自己之前寫的東西，這時註解就顯得十分重要，能讓自己更快回到狀態。

我很開心自己接觸了許多不同的事物，其實我對影像設計這塊也十分感興趣，這也是為何我自己設計了程式的GUI，我想要擁有自己獨立開發一款程式的能力，而這些都是要達成此目標不可缺少的能力，希望大學四年後，各個能力都可以更上一層樓。


## 完整程式碼
GitHub Repo: https://github.com/YuYuTW123/YTCC/
