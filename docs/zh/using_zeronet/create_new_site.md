# 创建新的ZeroNet站点

## 简单方法：使用Web界面

 * 点击位于[ZeroHello](http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D)网站上的 **⋮** > **"创建新的空站点"** 菜单项 .
 * 您将被 **重定向** 到一个只能由您修改的全新网站！
 * 您可以在 **data/[yoursiteaddress]** 目录中找到并修改您网站的内容
 * 修改后打开您的站点，将顶部的“0”按钮向左拖动，然后按在底部的 **签名** 和 **发布** 按钮

## 手动方式：使用命令行

### 1. 创建网站结构

* Shut down ZeroNet if it is running
* Browse to the folder where ZeroNet is installed and run:

```bash
$ zeronet.py siteCreate
...
- Site private key: 23DKQpzxhbVBrAtvLEc2uvk7DZweh4qL3fn3jpM3LgHDczMK2TtYUq
- Site address: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
- Site created!
$ zeronet.py
...
```

- This will create the initial files for your site inside ```data/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```.

> __Note:__
> Windows users using the bundle version must browse into the ZeroBundle/ZeroNet folder and run `"../Python/python.exe" zeronet.py siteCreate`

### 2. 构建/修改 站点

* Update the site files located in ```data/[your site address key]``` (eg: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2).
* When your site is ready run:

```bash
$ zeronet.py siteSign 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
- Signing site: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2...
Private key (input hidden):
```

* Enter the private key you got when you created the site. This will sign all files so peers can verify that the site owner is who made the changes.

### 3. 发布网站更改

* 为了告知节点您需要运行的更改:

```bash
$ zeronet.py sitePublish 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
Site:13DNDk..bhC2 Publishing to 3/10 peers...
Site:13DNDk..bhC2 Successfuly published to 3 peers
- Serving files....
```

* 就是这样！ 您已成功签署并发布了修改。
* 您的网站可以从中访问: ```http://localhost:43110/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```


**下一步:** [ZeroNet Developer Documentation](../../site_development/getting_started/)
