---
title: Debug 日記
category: Notes
description: 抓蟲蟲
draft: false
published: 2025-05-08
tags: ["日常"]
---

# Node.js

## port access denied
```
error when starting dev server:
Error: listen EACCES: permission denied ::1:1111
    at Server.setupListenHandle [as _listen2] (node:net:1885:21)
    at listenInCluster (node:net:1964:12)
    at GetAddrInfoReqWrap.callback (node:net:2170:7)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:132:8)
```

### 解法一: 改port

### 解法二: 重開 winnat
```
net stop winnat
net start winnat
```

## Reference
[Error: listen EACCES: permission denied - CSDN](https://blog.csdn.net/qq_31909977/article/details/130719456)