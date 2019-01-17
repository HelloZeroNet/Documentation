# 如果您想与ZeroNet合作，则遵守编码标准
 - 遵循 [PEP8](https://www.python.org/dev/peps/pep-0008/)
 - 简单比复杂更好
 - 过早优化是万恶之源

### 命名
 - ClassNames: Capitalized, CamelCased
 - functionNames: starts with lowercase, camelCased
 - variable_names: lowercased, under_scored

### 变量
 - file_path: File path realtive to working dir (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - inner_path: File relative to site dir (css/all.css)
 - file_name: all.css
 - file: Python file object
 - privatekey: Private key for the site (without _)

### 源文件目录和命名
 - 每个文件一个类是首选
 - 源文件名和目录来自ClassName: WorkerManager class = Worker/WorkerManager.py
