---
title: Arch Linux + Hyprland 安裝
category: Notes
description: 一直重裝一直爽。
image: ./hyprland_cover.jpg
draft: false
published: 2024-11-07
tags: ["Installation", "Arch Linux", "Hyprland", "Tutorial"]
---

# 前言
:::info
正確標題：Arch Linux + Hyprland with ML4W Dotfiles 安裝過程
:::

不知道為什麼我用archinstall script都會報錯，所以改成自己手動裝，裝了好幾次才成功把要的東東弄好，所以記錄一下方便下一次重裝

第1次：用archinstall script安裝，無視報錯，結果切換user的頁面會卡死 <br>
... <br>
第n次：沒裝iwd，查了很多資料還是連不到wifi <br>
第n+1次：不小心改到權限，2ㄏ2ㄏ <br>


# 下載iso & 製作開機碟

iso下載：
https://archlinux.org/download/

利用Rufus製作開機碟：
https://rufus.ie/zh_TW/

# 安裝Arch Linux

## 設定網路
```bash=
iwctl

# 進入 [iwd] 之後
device list

station [device_name] scan
station [device_name] connect [Network_name]
exit # 連完退出[iwd]
```

## 分割硬碟
```bash=
lsblk #顯示目前硬碟的分割狀態

cfdisk /dev/nvme0n1 #用圖形化介面分割硬碟
```
我的分區
* `/dev/nvme0n1p1`：EFI system
* `/dev/nvme0n1p2`：swap
* `/dev/nvme0n1p3`：root
* `/dev/nvme0n1p4`：home

官方推薦分區
![image](https://hackmd.io/_uploads/BkeoamIWkl.png=200x)
我會再多分一個`/home`
[官方文件解釋](https://wiki.archlinuxcn.org/zh-hant/%E5%88%86%E5%8C%BA#/home)

## 格式化分區

```bash=
# UFI system
mkfs.fat /dev/[partition_name]
mkfs.fat /dev/nvme0n1p1

# swap
mkswap /dev/[partition_name]
mkswap /dev/nvme0n1p2

# root和home
mkfs.ext4 /dev/[partition_name]
mkfs.ext4 /dev/nvme0n1p3
mkfs.ext4 /dev/nvme0n1p4

```

## 掛載分區
```bash=
# root
mount /dev/nvme0n1p3 /mnt

# EFI
mkdir /mnt/efi
mount /dev/nvme0n1p1 /mnt/efi

# home
mkdir /mnt/home
mount /dev/nvme0n1p4 /mnt/home

# swap
swapon /dev/nvme0n1p2
```

## 安裝系統
```bash=
vim /etc/pacman.conf
```
新增鏡像
[隨便選一個Address](https://archlinux.org/mirrorlist/?country=TW&protocol=http&protocol=https&ip_version=4)
```bash=
[core]
Server = http://mirror.archlinux.tw/ArchLinux/$repo/os/$arch
```

## 安裝套件
```bash=
pacstrap /mnt base base-devel linux linux-firmware
```
然後可以更新一下
```bash=
pacman -Syu
```
## 配置系統

### Fstab
```bash=
genfstab -U /mnt >> /mnt/etc/fstab
```

### chroot到新系統
```bash=
arch-chroot /mnt
```

### 設定時區
```bash=
ln -sf /usr/share/zoneinfo/Asia/Taipei  /etc/localtime
hwclock --systohc
```

### 設定語言
```bash=
echo "en_US.UTF-8 UTF-8" > /etc/locale.gen;
echo "zh_TW.UTF-8 UTF-8" >> /etc/locale.gen;
echo "LANG=en_US.UTF-8" > /etc/locale.conf;
```
[`>` 和 `>>` 的差別](https://blog.csdn.net/wenxuechaozhe/article/details/52564394) (對，我不知道)

接著執行 locale-gen 以生成 locale 資訊：
```bash=
locale-gen  
```

### 設定電腦名稱
```bash=
echo "your-pc-name" > /etc/hostname
```

安裝vim
```bash=
pacman -Sy vim
vim /etc/hosts
```
然後寫入
```bash=
127.0.0.1        localhost.localdomain         localhost
::1              localhost.localdomain         localhost
127.0.1.1        myhostname.localdomain        myhostname
```

### Initramfs
```bash=
mkinitcpio -p linux
```

### 設定 Root 密碼
```bash=
passwd
```

### 設定 Bootloader
```bash=
pacman -Sy grub os-prober efibootmgr
os-prober

# for BIOS
grub-install /dev/sda

# for UEFI
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=grub
grub-mkconfig -o /boot/grub/grub.cfg
```

### 安裝網路工具
```bash=
pacman -S net-tools dhclient dhcp
        wpa_supplicant wireless_tools 
        dhcpcd

pacman -S iwd # 連無線網路好用
```

### 常用 package
:::spoiler
```bash=
vim # text editor 
pkgfile # 檢查官方軟件倉庫中軟體包文件的工具
bash-completion # 按tab會幫你打字的東東
sudo # substitute user do 你懂的
git # 讓你可以git別人的東東
```
:::
### pacman 筆記
:::spoiler
```bash=
# 安裝
pacman -S [package_name]
pacman -S [package_name1] [package_name2] [package_name3]


# 同步
pacman -Sy
# 更新
pacman -Su
# 同步 + 更新全部 package
pacman -Syu

# 移除沒安裝的 cached package
pacman -Sc
# 移除所有在cache資料夾的檔案
pacman -Scc

# 移除 package
pacman -R [package_name]
# 把 dependencies 一起移除
pacman -Rs [package_name]
```
:::danger
如果只做 `pacman -Sy`，可能會造成dependency issue
:::


### 重新啟動
```bash=
systemctl enable dhcpcd.service
exit
umount -R /mnt
reboot
```

# 好耶開機
## 設定網路
```bash=
# 啟動 iwd 服務
sudo systemctl start iwd

iwctl
# 後面就跟安裝的時候一樣步驟設定網路
```

## 設定新 user
```bash=
# 新增使用者
sudo useradd -m -G wheel -s /bin/bash username
# 設定使用者密碼
sudo passwd username
```

## 新增權限
```bash=
usermod -aG wheel username
visudo
```
進去檔案編輯之後
把這行的註解刪掉
```bash=
# %wheel ALL=(ALL) ALL
```
變成這樣
```bash=
%wheel ALL=(ALL) ALL
```
檢查權限
```bash=
sudo -lU ostechnix
```

:::warning
如果碰到錯誤
`visudo: no editor found (editor path = /usr/bin/vi)`
可以利用下面指令將預設editor從`vi`改成`vim`
(如果你有vim的話)
```bash=
ln -s /usr/bin/vim /usr/bin/vi
```
或是安裝`vi`
```bash=
pacman -S vi
```
:::

# 安裝 Hyprland
> 記得不要用root裝

## 安裝 git
```bash=
sudo pacman -S git
```

## 安裝~~帕魯~~paru
有兩種方法安裝

### 用AUR裝
:::spoiler
```bash=
sudo git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

:::warning
如果makepkg時碰到
```bash=
==> Missing dependcies:
  ->cargo
==> ERROR: Could not resolve all dependcies.
```
安裝rustup
```bash=
sudo pacman -S rustup
```
然後你可能又會碰到
```bash=
error: rustup could not choose a version of rustc to run, because one wasn't specified explicitly, and no default is configured.
help: run 'rustup default stable' to download the latest stable release of Rust and set it as your default toolchain.
```
就按照他說的跑
```bash=
rustup default stable
```
:::
### 用yay裝
:::spoiler

我不是用這方法，但大概邏輯是這樣
```bash=
sudo git clone https://aur.archlinux.org/yay-git.git
cd yay-git/
sudo chown -R username:username ~/yay-git
makepkg -si

# 裝好之後
yay -S paru
```
:::

## 安裝 ml4w
```bash=
paru -S ml4w-hyprland
```
## 讓他慢慢跑
```bash=
ml4w-hyprland-setup
```
基本上介面淺顯易懂
選擇你要的設定就好了

## 好了
![20241105_150743](https://hackmd.io/_uploads/S1XyBHPWJl.jpg)

# 一些我碰到的問題
## WARNING: Possibly missing firmware for module: 'XXXXX'
自己對照一下去下載對應的檔案
https://wiki.archlinux.org/title/Mkinitcpio#Possibly_missing_firmware_for_module_XXXX

## Discord 不能打中文
如果你已經裝了fcitx5注音但還是不能打中文
可以試試看這個方法
### 找到啟動設定檔
```bash=
find /usr/share/applications ~/.local/share/applications -name "*discord*.desktop"
```
### 編輯
```bash=
vim /usr/share/applications/discord.desktop
```
### 在 `Exec=/usr/bin/discord` 後面加上 `--enable-features=UseOzonePlatform --ozone-platform=wayland --enable-wayland-ime`
```bash=
Exec=/usr/bin/discord --enable-features=UseOzonePlatform --ozone-platform=wayland --enable-wayland-ime
```

### 如果你用的是 X11 ，不是Wayland
### 在 `Exec=/usr/bin/discord` 後面加上 `--enable-features=UseOzonePlatform --ozone-platform=x11`
```bash=
Exec=/usr/bin/discord --enable-features=UseOzonePlatform --ozone-platform=x11
```

## 設定連結開啟預設瀏覽器 
```bash=
xdg-settings set default-web-browser microsoft-edge.desktop
```
## 強制用 Xwayland 開啟程式
如果有些程式無法複製貼上的話可以試試看 <br>
Electron apps 很可能會遇到 <br>
我遇到過 Discord 和 VS code 無法貼上 Edge 複製過去的東西 <br>
  
https://www.reddit.com/r/hyprland/comments/1gmpxa2/i_cant_paste_text_from_microsoft_edge_to_vs_code/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button

# Reference
大部分內容節錄自：
* [Arch Linux官方文件](https://wiki.archlinux.org/title/Installation_guide_(%E6%AD%A3%E9%AB%94%E4%B8%AD%E6%96%87))
* [Arch linux 安裝 (By Eric Lin)](https://hackmd.io/@PIFOPlfSS3W_CehLxS3hBQ/r1xrYth9V)
* [ML4W Dotfiles 2.9.6 as AUR. Easy installation of HYPRLAND for Arch Linux, Garuda, Manjaro and more (By My Linux For Work)](https://youtu.be/6B4Kf30CWLg?si=0OZR_RfVwf5FbHJG)