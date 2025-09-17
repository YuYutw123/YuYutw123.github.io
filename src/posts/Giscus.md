---
title: "Astro + Github Pages + giscus"
category: "筆記"
date: "2024-11-28"
tags: 
    - Astro
    - giscus
    - Tutorial
---

# 前言
我很喜歡[現在這個 Blog 模板](https://github.com/saicaca/fuwari)，但目前作者還沒有做出留言功能，所以我就用 giscus 幫這個 Blog 嵌入留言功能。

# 前置作業
1. 先到 [giscus 官網](https://giscus.app/zh-TW)
2. 根據官方設定步驟操作
    * 首先選擇語言 
    ![alt text](/giscus/image.png)
    * 輸入你的 repo
    ![alt text](/giscus/image-1.png)
    * 選擇 Discussion 要用的標題<br>
    因為 giscus 是利用 Github repo 中的 Discussion 功能去保存留言，每一篇 post 會開一個 Discussion，所以這邊建議用 title 也就是你 post 頁面的標題當成 Discussion的標題<br>
    ~~(其實我不確定你們的 title 是不是 post 的標題，反正我的是:poop:)~~
    ![alt text](/giscus/image-2.png)
    * 剩下的依個人所好做選擇
    ![alt text](/giscus/image-3.png)
    ![alt text](/giscus/image-4.png)

# 將 giscus 嵌入網頁
當你將上述步驟完成後，往下滑會看到`啟用 giscus`下面有段 code <br>
基本上把他嵌入到你的網頁中就可以顯示 comment 區塊了 <br> <br>
**但是！！** <br>

你會發現通常 Blog 都有分亮色和暗色模式，但是giscus正常的嵌入只能選一個 theme <br>
所以我們要設變數讓網頁在切換亮暗的時候，留言區也可以切換主題 <br>

## 用 React 寫一個留言的 Component 偵測主題變換

```ts
import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const getSavedTheme = () => window.localStorage.getItem('theme') || 'dark'

const Comments = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('auto')

  // If theme == auto, then get systemtheme, to prevent giscus theme error
  useEffect(() => {
    const handleStorageChange = event => {
      if (event.key === 'theme') {
        const newTheme =
          event.newValue === 'auto'
            ? getSystemTheme()
            : event.newValue || 'light'
        setTheme(newTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Initial theme setup
    setTheme(getSavedTheme() === 'auto' ? getSystemTheme() : getSavedTheme())

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div id='inject-comments' className='w-full'>
      {mounted && (
        <Giscus
          id='inject-comments'
          repo='YuYutw123/YuYutw123.github.io'
          repoId='R_kgDONUsJVg'
          category='Announcements'
          categoryId='DIC_kwDONUsJVs4CkrUq'
          mapping='title'
          reactionsEnabled='1'
          emitMetadata='0'
          inputPosition='top'
          lang='en'
          loading='lazy'
          theme={theme === 'auto' ? getSystemTheme() : theme}
        />
      )}
    </div>
  )
}

export default Comments;

```

## 導入 post 檔案
```js
import Comments from '../../components/customize/Comment'

<Comments client:only="react" />
```

# 結語

之後有機會的話再看看有沒有更好的留言板系統，giscus要登入 Github 才能留言，還是有點小麻煩

# Reference
[使用 giscus 为你的 Astro 博客添加评论功能 (By liruifengv李瑞丰)](https://juejin.cn/post/7359405432802607167)

