---
title: Browser Extension製作心得
published: 2023-08-08
description: '幫你改掉醜醜的X Logo。'
image: ''
tags: ["JavaScript", "CSS"]
category: 'Side project'
draft: false 
lang: ''
---

# 利用瀏覽器插件更改網頁樣貌

## 動機
相信各位都有耳聞Elon Musk將「Twitter」改名「X」的新聞，身為推特的使用者，我真的覺得那個X的Logo有夠醜，所以我決定自己寫一個瀏覽器插件把Logo改回來。

## 想法
肉眼可見的Logo有3個地方會出現，第一個是分頁上面的Logo，其次是網頁左上角的Logo，最後一個是最不明顯，只會出現一下子的載入畫面正中間的Logo，那我就把這3個地方的Logo改回原本的小鳥就好了。
<!-- ![](/img/twitterLogo/where.png) -->

## 撰寫程式
之前就有寫過瀏覽器插件把網站改成暗黑模式以保護眼睛，所以這次用同樣的思路，把網站裡面的元素改掉就好了，左上角和載入畫面的Logo用CSS直接改svg路徑，分頁上面的用JS改，由於推特不允許跨網站存取，所以我將推特Logo上傳到推特上直接讀取。

```css
[role=heading]>a>div>svg>g>path{
    color: #1D9BF0;
    d: path("M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z");
}
#react-root>div>div>div>svg>g>path{
    color: #1D9BF0;
    d: path("M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z");
}
```
```js
document.querySelector('link[rel*="icon"]').href = "https://pbs.twimg.com/media/F12BhZ7aEAIc1bQ?format=png&name=small";
document.querySelector('link[rel*="shortcut icon"]').href = "https://pbs.twimg.com/media/F12BhZ7aEAIc1bQ?format=png&name=small";
document.querySelector('link[rel*="apple-touch-icon"]').href = "https://pbs.twimg.com/media/F12BhZ7aEAIc1bQ?format=png&name=small";
```

## 更新
插件寫好後，我將自己的插件上傳到Github，並在匿名論壇發文分享，獲得了不錯的反響，然而隔天Twitter又更新了，他將分頁上的網站名稱也改成「X」了，網友留言問說能不能將分頁名稱也改回Twitter，所以我又打開Vscode更新了一下插件。

因為網頁載入需要時間，不會馬上就載入title，所以我先等網頁載入約2秒後才更改網頁名稱，接著為避免切換不同頁面時title沒改到，所以我也偵測了body元素點擊時偵測title是否為「X」，是的話就改成Twitter。

```js
function sleep(time) {
    return (new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, time);
    }));
}
sleep(1000).then(function() {
    loading();
});
document.body.onclick = function (e) {
    loading();
};
async function loading() { 
    sleep(1000).then(function () {
        let titleDOM = document.querySelector('title').textContent;
        if (titleDOM[titleDOM.length - 1] != 'X')
            return;
        let prefix = '';
        for (let i = 0; i < titleDOM.length-1; i++) {
            prefix += titleDOM[i];
        }
        prefix += "Twitter";
        console.log(prefix);
        document.title = prefix;
    })
}
```

## 成效
在完成插件後，我將自己的程式分享到Plurk上面，有Firefox的用戶問說能不能應用到Firefox上面，所以我去研究了一下該如何安裝到Firefox上面，發現意外地安裝第三方插件有點麻煩，所以我將自己的插件上架到FireFox的官方插件商店了，也順便上傳到Chrome Web Store(要5美金註冊費，盤)。

[Plurk文章連結](https://www.plurk.com/p/pc0577)

截至目前為止的使用者統計：
Chrome：848位
<!-- ![](/img/twitterLogo/Chrome.png) -->
Firefox：86位
<!-- ![](/img/twitterLogo/Firefox.png) -->



## 完整程式碼
Github Repo: https://github.com/YuYutw123/twitterLogo/