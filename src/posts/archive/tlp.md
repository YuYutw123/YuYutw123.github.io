---
title: "Arch Linux TLP 省電"
category: "日記"
date: "2025-03-16"
tags: 
    - Linux
    - Arch Linux
---

# 安裝
```
sudo pacman -S tlp

sudo systemctl enable tlp.service
sudo tlp start
```

# Config
預設就有不錯的省電功能，這邊可以自己調整更多設定
```
/etc/tlp.conf
```

# Reference
[Arch Linux Wiki - TLP](https://wiki.archlinux.org/title/TLP)