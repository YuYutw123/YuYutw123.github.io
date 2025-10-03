---
title: "棋類 AI 介紹"
date: "2025-06-02"
category: "筆記"
tags: 
    - Othello
    - Gomoku
    - AI
---

# 棋類遊戲

本次報告會介紹兩種棋類的 AI
* 五子棋
* 黑白棋

## 思考方式
* 人類：會去思考預判對手的行為，做出對當前狀況最好的判斷
* 程式：模擬人類做判斷，所以會根據深度去模擬棋盤走向，做出對當前狀況最好的判斷

因為棋類遊戲的變化種類非常龐大，導致傳統神經網路很難直接用暴力方式枚舉所有可能，因此通常會結合搜尋演算法來輔助判斷局勢。

## Game Tree

* 組合賽局理論中用來表達一個賽局中各種後續可能性的樹
![image](https://hackmd.io/_uploads/B1M_H1cMlx.png)


## Minimax 極小化極大演算法

* 一種零總和演算法，常用於棋類遊戲
* 一方要在可選的選項中選擇將其優勢最大化的選擇，另一方則選擇令對手優勢最小化的方法

## Alpha-Beta 剪枝法

* 是 Minimax 對局搜尋法的一個修改版
* 加入了 α 與 β 兩個紀錄值，用來做為是否要修剪的參考標準
    * 在最小層取最小值的時候，發現了一個小於等於α 的值，也不用再對其它分枝進行搜尋，這就是所謂的α剪枝
    * 在最大層取最大值的時候，若發現了一個大於等於β 的值，就不用再對其它分枝進行搜尋，這就是所謂的β剪枝

## 評估函數

* 除了前面提到的「Minimax 極小化極大演算法」、「Alpha-Beta 剪枝法」，每種棋類都有一些定石
* 在編寫棋類AI時，會記下固定的pattern以加速計算
* 使用字串比對的方式，尋找盤面上的常見棋型
    * 五子棋
        * 11111：五連 → +100000
        * 011110：活四 → +10000
        * 01100、001100：活三 → +1000
        * 011010：跳三 → +500
        * 0001000：中間有子 → +50
    * 黑白棋
        * 我使用的
        * ![image](https://hackmd.io/_uploads/r1E2515Mex.png)
        * 世界第一的黑白棋AI所使用的pattern
        * ![image](https://hackmd.io/_uploads/B1R3s15Mel.png)


* 所有橫、直、兩條斜線都會被轉為字串來比對這些pattern
    

# 五子棋

* 規則：五個同顏色的棋子連在一起就贏了
* 先手必勝

## 實作細節

* 為了加速計算，只考慮「所有已下棋子的周圍2格內」的空白位置，減少搜尋分支，提升速度
![image](https://hackmd.io/_uploads/r18k915flx.png)
* 使用 Minimax 模擬並回復走法，可設定搜尋深度
* 並使用 Alpha-Beta 剪枝法
![image](https://hackmd.io/_uploads/SJlGhkqMeg.png)

# 黑白棋

* 規則：可以翻的地方才能下，最後誰的棋最多就誰贏
![image](https://hackmd.io/_uploads/ByfAh19fel.png) 

## 實作細節

* 使用 Minimax 搜尋落子路徑，評估盤面並模擬雙方輪流落子
* ![image](https://hackmd.io/_uploads/ByHPlx5Mee.png)
* 評分函式（evaluate）採用棋盤位置權重表：
    * 角落最有價值，避免被包圍
    * 中心與邊緣位置分數較低
    * 整體策略以「控角穩定」、「避免靠近角落」為核心
    * ![image](https://hackmd.io/_uploads/BkNW-gqfex.png)


## 棋類差異

| 項目 | 黑白棋 | 五子棋 |
| ------ | ----------------- | --------------------- |
| 合法落子數量 | 每輪約 5~20 個（中後期變少） | 每輪可能高達百餘格（需靠鄰近範圍篩選加速） |
| 評估依據   | 棋盤位置權重 + 棋子數      | 棋型 pattern 出現次數       |
| 遊戲節奏   | 落子後會變動盤面（翻轉）      | 落子不影響其他格              |
| 剪枝效果   | 黑白棋剪枝效果較明顯（合法步少）  | 五子棋需加上篩選（只搜尋周邊）才實用    |

# 總結

* 強度在 Othello Quest 中 大概介於 1100 ~ 1200 之間，前 40% 左右
* 可藉由更精準的評估函數、搜尋深度、擴大開局庫提升強度


# Reference
[AI - Ch4 極大極小搜尋法與剪枝 Minimax Algorithm and Alpha-beta Pruning](https://www.mropengate.com/2015/04/ai-ch4-minimax-alpha-beta-pruning.html)
[オセロAIの教科書](https://note.com/nyanyan_cubetech/m/m54104c8d2f12)