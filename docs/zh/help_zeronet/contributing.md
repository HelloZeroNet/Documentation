# 为ZeroNet做贡献

感谢您使用ZeroNet。 ZeroNet是67个权力下放爱好者的合作项目，与您一样。 我们感谢所有用户捕获错误，改进文档以及设计新协议的好主意。 以下是我们要求您开始做出贡献的一些指导原则。

### 您不必提供源代码

事实上，大多数贡献者不提交源代码。 即使您喜欢编写程序，也欢迎其他类型的贡献。

### 你喜欢写作吗？

 - 写关于ZeroNet的文章。
 - 编写教程以帮助人们进行设置。
 - 帮助翻译ZeroNet。
 - 改进此文档。 本文档由世界各地的许多社区成员撰写。
 
### 你喜欢帮助别人吗？

 - 订阅我们的[GitHub上的问题跟踪器](https://github.com/HelloZeroNet/ZeroNet/issues) 并帮助人们解决问题。
 - 加入我们的[Gitter](https://gitter.im/HelloZeroNet/ZeroNet) 和IRC频道[#zeronet @ freenode](https://kiwiirc.com/client/irc.freenode.net/zeronet) 并提供帮助 回答提问。
 - 设置种子盒并帮助提高网络速度。

### 你喜欢制作网站吗？

 - 创建新的ZeroNet站点。 继续在ZeroNet上创建自己的博客。 [这很容易，而且成本很低。](../using_zeronet/create_new_site.md)
 -  NoFish提出的“内容为王！” 没有内容，网络是没有价值的，所以我们需要你让它成功。
 
### 你喜欢做研究吗？

 - 帮助我们调查[硬问题](https://github.com/HelloZeroNet/ZeroNet/labels/help%20wanted)。
 - 加入我们关于设计新功能和协议的讨论，例如[I2P支持](https://github.com/HelloZeroNet/ZeroNet/issues/45) 和[DHT支持](https://github.com/HelloZeroNet/ZeroNet/issues/57)。
 - 你有[Raspberry Pi](https://github.com/HelloZeroNet/ZeroNet#linux-terminal)，[C.H.I.P.](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:94:Running+ZeroNet+on+a+$9%C2%A0computer) 或[open router](https://github.com/HelloZeroNet/ZeroNet/issues/783)？ 尝试在其上运行ZeroNet，并告诉我们ZeroNet在您的设备上的工作情况。

### 你喜欢写代码吗？

 - 如果您了解Python，可以从我们的[GitHub上的问题跟踪器](https://github.com/HelloZeroNet/ZeroNet/issues)中选择一项任务。
 - 您也欢迎发展自己的想法。 在您开始之前，请[打开一个新的讨论](https://github.com/HelloZeroNet/ZeroNet/issues/new)让社区了解，这样您就可以确保我们可以分享我们的想法以充分利用它。
 - 保持编码风格一致。 我们要求您遵循以下编码惯例。

### 你想提供经济支持吗？

 - 您可以[捐赠比特币](donate.md)来支持ZeroNet。


## 编码约定

 - 关注[PEP8](https://www.python.org/dev/peps/pep-0008/)
 - 简单比复杂更好
 - 过早优化是万恶之源
 
### 命名
 -  ClassNames：大写，CamelCased
 -  functionNames：以小写，camelCased开头
 -  variable_names：lowercased，under_scored

### 变量
 -  file_path：相对于工作目录的文件路径(data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 -  inner_path：相对于站点dir的文件 (css/all.css)
 -  file_name：all.css
 -  file：Python文件对象
 -  privatekey：网站的私钥（没有`_`）

### 源文件目录和命名
 - 每个文件一个类是首选
 - 源文件名和目录来自ClassName：WorkerManager类 = Worker/WorkerManager.py

