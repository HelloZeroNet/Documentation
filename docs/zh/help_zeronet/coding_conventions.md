# 如果您想与ZeroNet合作，则遵守编码标准
 - 遵循 [PEP8](https://www.python.org/dev/peps/pep-0008/)
 - 简单比复杂好
 - 过早优化是万恶之源

### 命名规则
 - 类名(ClassNames): 大写, 骆驼命名法
 - 函数名(functionNames): 以小写字母开头, 骆驼命名法
 - 变量名(variable_names): 小写, 下划线

### 变量
 - 文件路径(file_path): 相对于工作文件夹的文件路径(data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - 内部路径(inner_path): 相对于站点文件夹的文件路径(css/all.css)
 - 文件名(file_name): all.css
 - 文件(file): Python文件对象
 - 私钥(privatekey): 站点私钥(没有下划线)

### 源文件文件夹和命名
 - 最好一个文件代表一个类
 - 源文件名和目录来自类名(ClassName): WorkerManager类 = Worker/WorkerManager.py
