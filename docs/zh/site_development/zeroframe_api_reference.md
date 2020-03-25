# ZeroFrame API参考

## ZeroFrame的API

ZeroFrame是一个允许零网网站与零网守护进程交互的API。 它允许站点保存/检索文件，发布更新和许多其他内容。 每当创建新站点时，库的拷贝放在了`js/ZeroFrame.js`中。

和JavaScript文件一样，这个库也可以从外部导入。或者站点开发者也可以选择[通过NPM导入](ZeroFrame API Page, ##Import?)。 有关API详细信息，请参阅[ZeroFrame API参考]()。

## 封装器

与iframe外部代码交互的命令。


### wrapperConfirm
显示带有确认的通知。

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    message = '你确定要删除这个吗？'
    buttonTitle = '删除'

    zeroframe.cmd 'wrapperConfirm', [message, buttonTitle], (confirmed) =>
      if confirmed
        console.log '正在删除帖子...'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    let message = '你确定要删除这个吗？';
    let buttonTitle = '删除';

    zeroframe.cmd('wrapperConfirm', [message, buttonTitle], (confirmed) => {
      if (confirmed) {
        console.log('正在删除帖子...');
      }
    };
    ```

    **输出:**

    用户点击确认:

    ```javascript
    "正在删除帖子..."
    ```

    !!! info "注释"

        如果用户拒绝通知，则不运行回调函数。
---


### wrapperInnerLoaded
由于URL中的`#anchors` 只适用于外部网页，而不适用于ZeroNet站点所在的内部iframe，因此必须使用此命令。当站点完全加载时，调用此方法将当前锚应用于内部iframe的`src`URL中。

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperInnerLoaded', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperInnerLoaded', []);
    ```

    **输出:**

    如果用户点击 `http://127.0.0.1:43110/mysite.bit#my-title`:

    ```
    [Wrapper] 添加哈希到目标处 http://127.0.0.1:43110/mysite.bit/?wrapper_nonce=some_nonce#my-title
    ```

	
---

### innerLoaded
[wrapperInnerLoaded](#wrapperinnerloaded)的别名。

---


### wrapperGetLocalStorage
检索ZeroNet站点本地存储的内容。

!!! info "注释"

    由于ZeroNet站点都在同一个域上运行，因此本地存储技术上是由所有站点共享的，这具有安全风险。 因此UiWrapper将每个站点划分为只能访问它们自己站点的那部分。

**返回**: JSON格式的此站点本地存储。

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd "wrapperGetLocalStorage", [], (res) =>
      res ?= {}
      console.log "本地存储值:", res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd("wrapperGetLocalStorage", [], (res) => {
      res = res || {};
      console.log("本地存储值:", res);
    });
    ```

    **输出:**

    如果本地存储是空:

    ```javascript
    本地存储内容: {}
    ```

    如本地存储已通过[wrapperSetLocalStorage](#wrappersetlocalstorage)修改:

    ```javascript
    本地存储内容: {"score": 500}
    ```

---

### wrapperGetState
从浏览器返回当前选项卡的历史状态。

**返回**: 浏览器的当前历史状态对象。

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperGetState', {}, (state) ->
      console.log state
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperGetState', {}, (state) => {
      console.log(state);
    });
    ```

    **输出:**

    ```
    null
    ```
	
---

### wrapperGetAjaxKey
**返回**: 检索可用于发出ajax（XMLHTTPRequest，fetch）请求的密钥。

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperGetAjaxKey', {}, (ajax_key) ->
      req = new window.XMLHttpRequest()
      req.open 'GET', "content.json?ajax_key=#{ajax_key}"
      # Optional: only if you want to request a partial file
      # req.setRequestHeader 'Range', 'bytes=10-200'
      req.onload = ->
        console.log req.response
      req.send()
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperGetAjaxKey', {}, (ajax_key) => {
      const req = new window.XMLHttpRequest();
      req.open('GET', `content.json?ajax_key=${ajax_key}`);
      // Optional: only if you want request partial file
      // req.setRequestHeader('Range', 'bytes=10-200');
      req.onload = () => {
        console.log(req.response);
      };
      req.send();
    });
    ```

    **输出:**

    我们需要的文件。 在本例中，是当前站点的`content.json`:

    ```javascript
    {
      "address": "1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D",
      "address_index": 66669697,
      "background-color": "#FFF",
      "description": "",
      "files": {
        "index.html": {
        "sha512": "542f7724432a22ceb8821b4241af4d36cfd81e101b72d425c6c59e148856537e",
        "size": 1114
        },
        "js/ZeroFrame.js": {
        "sha512": "42125c7aa72496455e044e3fd940e0f05db86824c781381edb7a70f71a5f0882",
        "size": 3370
        }
      },
      "ignore": "",
      "inner_path": "content.json",
      "modified": 1541199581,
      "postmessage_nonce_security": true,
      "signers_sign": "G6Aq7MXMzCjvEdqCToGTDZ7mrsCfaQzZdoBqHg4Cle2NHGno1Pgx2dvgeTFpsWkFP/oAA4CHKt2Zu+KueJM+7Mg=",
      "signs": {
        "1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D": "COr0M7+egjY29ZhW7mQp4MPHYuwrgOKVk6kl1CnRPef2QPbUQARYigo0cId8nIs7Y6Fnaj+uHR2HPvh09XVGb1Q="
      },
      "signs_required": 1,
      "title": "my site",
      "translate": ["js/all.js"],
      "zeronet_version": "0.6.4"
    }
    ```

    !!! info "注释"
        
		建议使用这种情况与非零网源通信。 这不是为站点检索文件内容的推荐方法。 对这种情况，使用[fileGet](#fileget)命令代替。

		从其他ZeroNet站点检索文件可以通过[CORS plugin](#plugin-cors)完成。

        你也可以使用来自`ZeroFrame.js`的`monkeyPatchAjax`函数来补充默认的XMLHTTPRequest和fetch实现。

---

### wrapperNotification
展示一个通知。

参数                   | 描述
                  ---  | ---
**type**               | 可以的值: info, error, done
**message**            | 你想显示的消息
**timeout** (可选)     | 超过此间隔后隐藏展示 (毫秒)

**返回**: None

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperNotification', ['done', '您的注册信息已发送!', 10000]
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperNotification', ['done', '您的注册信息已发送!', 10000]);
    ```


---

### wrapperOpenWindow
导航或打开一个新的弹出窗口。

参数                   | 描述
                  ---  | ---
**url**                | 打开页面的地址
**target** (可选)      | 目标窗口的名字
**specs** (可选)       | 窗口的特殊属性 (见: [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open))

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperOpenWindow', ['https://zeronet.io', '_blank', 'width=550,height=600,location=no,menubar=no']
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperOpenWindow', ['https://zeronet.io', '_blank', 'width=550,height=600,location=no,menubar=no']);
    ```

---


### wrapperPermissionAdd
为站点请求新的允许权限。

参数             | 描述
             --- | ---
**permission**   | 允许的名字 (例如 Merger:ZeroMe)

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperPermissionAdd', ['Merger:ZeroMe'], (res) ->
      if res == 'ok'
        console.log '权限已授予。'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperPermissionAdd', ['Merger:ZeroMe'], (res) => {
      if (res === 'ok') {
        console.log('权限已授予。');
      }
    });
    ```

    **输出:**

    如果用户接受了请求的权限:

    ```
    权限已授予。
    ```

    如果用户拒绝了或没有回答请求，该方法将不会运行。

	
---

### wrapperPrompt
提示用户输入文本。

参数                | 描述
               ---  | ---
**message**         | 你想显示的消息
**type** (可选)     | 输入的类型 (例如 `text`, `password`)

**返回**: 输入的文本。

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    # 提示输入站点的私钥
    zeroframe.cmd 'wrapperPrompt', ['Enter your private key:', 'password'], (privatekey) ->
      # 签名并发布 content.json
      zeroframe.cmd 'sitePublish', [privatekey], (res) ->
        console.log '发布结果:', res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe = new ZeroFrame();

    // 提示输入站点的私钥
    zeroframe.cmd('wrapperPrompt', ['Enter your private key:', 'password'], function(privatekey) {
      // 签名并发布 content.json
      zeroframe.cmd('sitePublish', [privatekey], function(res) {
        console.log('发布结果:', res);
      });
    });
    ```

    **输出:**

    ```
    发布结果: ok
    ```


---

### wrapperPushState
改变地址同时为浏览器历史添加新的条目。 见[JavaScript pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method). 还可以参见 [wrapperReplaceState](#wrapperreplacestate)。

参数                | 描述
               ---  | ---
**state**           | 状态javascript对象
**title**           | 此页面的标题
**url**             | 此页面的地址

**返回**: None

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperPushState', [{'scrollY': 100}, 'Profile page', 'Profile']
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperPushState', [{'scrollY': 100}, 'Profile page', 'Profile']);
    ```


---

### wrapperReplaceState
更改网址且不向浏览器的历史记录添加新条目。 参见[JavaScript replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method)。

参数                | 描述
               ---  | ---
**state**           | 状态javascript对象
**title**           | 页面标题
**url**             | 页面的网址

**返回**: None

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperReplaceState', [{'scrollY': 100}, 'Profile page', 'Profile']
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperReplaceState', [{'scrollY': 100}, 'Profile page', 'Profile']);
    ```

	
---

### wrapperRequestFullscreen
设置当前页面为全屏. (在第一次通话时请求网站的许可)

!!! warning "弃用"

    从ZeronetRev3136开始，您可以直接使用全屏JavaScript的API，而无需首先询问封装器.

将当前页面设置为全屏。

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd('wrapperRequestFullscreen')
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperRequestFullscreen')
    ```


---

### wrapperSetLocalStorage
设置为站点存储的浏览器本地存储数据

参数                   | 描述
                  ---  | ---
**data**               | 你想为此站点存储的任何数据结构

**返回**: None

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    setTimeout(->
      zeroframe.cmd 'wrapperSetLocalStorage', {'score': 500}, (res) =>
        console.log '分数已保存。'
    , 100)
    ```

    ```javascript tab="JavaScript"
    import 'js/ZeroFrame.js'

    setTimeout(() => {
      zeroframe.cmd('wrapperSetLocalStorage', {'score': 500}, (res) => {
        console.log('分数已保存。');
      });
    }, 100);

    const zeroframe = new ZeroFrame();
    ```

    !!! info "注释"

        `wrapperSetLocalStorage`依赖于`site_info`, 这是一个包含站点信息的对象，该站点在ZeroFrame加载时从ZeroNet后台程序检索。 为了允许这种情况发生，我们将“wrapperSetLocalStorage”的执行延迟了100毫秒。

    **输出:**

    如果本地存储为空:

    ```javascript
    分数已保存。
    ```


---

### wrapperSetTitle
设置该站点的标题。

参数                   | 描述
                  ---  | ---
**title**              | 新的浏览器标签页标题

**返回**: None

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperSetTitle', '我的新标题'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperSetTitle', '我的新标题');
    ```

    站点标题现在将会是`我的新标题`。


---


### wrapperSetViewport
设置网站的视区元标签内容（移动手机网站所需）。


参数                | 描述
               ---  | ---
**viewport**        | 视区元标签内容

**返回**: None

??? "示例"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperSetViewport', 'width=device-width, initial-scale=1.0'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperSetViewport', 'width=device-width, initial-scale=1.0');
    ```


---


## UiServer

UiServer将完成所有'后端'工作（例如：查询数据库，访问文件等）。 这些是让网站动态化所需的API调用。

### announcerInfo
当前站点的跟踪程序统计信息

**返回**:
```json
{
	"stats": {
		"zero://45.77.23.92:15555": {
			"status": "announced",
			"num_success": 1,
			"time_last_error": 0,
			"time_status": 1541776998.782,
			"num_request": 1,
			"time_request": 1541776996.884,
			"num_error": 0
		},
		...
	}
}
```


### certAdd
向当前用户添加新的证书。

参数                 | 描述
                 --- | ---
**domain**           | 证书颁发者域名
**auth_type**        | 注册时使用的Auth类型
**auth_user_name**   | 注册时使用的用户名
**cert**             | 证书本身: 由证书站点所有者签名的字符串 `auth_address#auth_type/auth_user_name` 

**返回**: `"ok"`, `"Not changed"` 或者 `{"error": error_message}`。

**示例:**
```coffeescript
@cmd "certAdd", ["zeroid.bit", auth_type, user_name, cert_sign], (res) =>
	$(".ui").removeClass("flipped")
	if res.error
		@cmd "wrapperNotification", ["error", "#{res.error}"]
```


---


### certSelect
显示证书选择器。

参数                         | 描述
				         --- | ---
**accepted_domains** （可选）| 站点接受为授权提供者的域列表
**accept_any** （可选）      | 不限制接受的证书提供者
**accepted_pattern**（可选） | 接受的证书提供者地址的正则表达式模式

**返回**: None

**示例:**
```coffeescript
@cmd "certSelect", {"accepted_domains": ["zeroid.bit"], "accepted_pattern": "1ZeroiD[0-9]"}
```


---


### channelJoin

请求有关网站活动的通知。

参数        | 描述
        --- | ---
**channel** | 将加入的频道

**返回**: None

**Channels**:

 - **siteChanged** (默认加入的)<br>事件: peers_added, file_started, file_done, file_failed

**示例**:
```coffeescript
# 封装器websocket连接就绪
onOpenWebsocket: (e) =>
	@cmd "channelJoinAllsite", {"channel": "siteChanged"}

# 路由传入的请求和消息
route: (cmd, data) ->
	if cmd == "setSiteInfo"
		@log "站点已改变", data
	else
		@log "未知命令", cmd, data
```

**示例事件数据**
```json
{
	"tasks":0,
	"size_limit":10,
	"address":"1RivERqttrjFqwp9YH1FviduBosQPtdBN",
	"next_size_limit":10,
	"event":[ "file_done", "index.html" ],
	[...] # Same as siteInfo return dict
}

```


---


### dbQuery
在sql缓存上执行查询

参数                 | 描述
                 --- | ---
**query**            | Sql查询命令
**params**           | 此sql查询的子参数

**返回**: 数组格式的查询结果。


**示例:**
```javascript
Page.cmd("dbQuery", [
   "SELECT * FROM json WHERE file_name = :file_name",
   {file_name: "data.json"}
], (res) => { console.log(res.length) })
```

```javascript
Page.cmd("dbQuery", [
    "SELECT * FROM json WHERE file_name IN :file_names",
    {file_names: ["data.json", "content.json"]}
], (res) => { console.log(res.length) })
```

```javascript
Page.cmd("dbQuery", [
    "SELECT * FROM json ?",
    {file_name: ["data.json", "content.json"]}
], (res) => { console.log(res.length) })
```


```coffeescript
@log "Updating user info...", @my_address
Page.cmd "dbQuery", ["SELECT user.*, json.json_id AS data_json_id FROM user LEFT JOIN json USING(path) WHERE path='#{@my_address}/data.json'"], (res) =>
	if res.error or res.length == 0 # Db not ready yet or No user found
		$(".head-user.visitor").css("display", "")
		$(".user_name-my").text("Visitor")
		if cb then cb()
		return

	@my_row = res[0]
	@my_id = @my_row["user_id"]
	@my_name = @my_row["user_name"]
	@my_max_size = @my_row["max_size"]
```


---


### dirList
列出目录的内容

参数             | 描述
             --- | ---
**inner_path**   | 要列出的目录

**返回**: 文件及目录名的列表


---


### fileDelete
删除一个文件。

参数             | 描述
             --- | ---
**inner_path**   | 要想删除的文件

**返回**: 成功时返回"ok"，否则返回错误消息。


---


### fileGet
获取一个文件的内容。

参数                    | 描述
                    --- | ---
**inner_path**          | 想要得到的文件
**required** (可选) | 如果文件不存在，尝试并等待该文件。 (默认值: True)
**format** (可选)   | 返回数据的编码格式。 (text or base64) (默认值: text)
**timeout** (可选)  | 数据到达的最长等待时间 (默认值: 300)

**返回**: <string> 文件的内容。


**示例:**
```coffeescript
# 对ZeroTalk主题进行投票
submitTopicVote: (e) =>
	if not Users.my_name # 未注册
		Page.cmd "wrapperNotification", ["info", "Please, request access before posting."]
		return false

	elem = $(e.currentTarget)
	elem.toggleClass("active").addClass("loading")
	inner_path = "data/users/#{Users.my_address}/data.json"

	Page.cmd "fileGet", [inner_path], (data) =>
		data = JSON.parse(data)
		data.topic_votes ?= {} # 如果不存在则创建
		topic_address = elem.parents(".topic").data("topic_address")

		if elem.hasClass("active") # 向主题添加投票
			data.topic_votes[topic_address] = 1
		else # 从主题中删除投票
			delete data.topic_votes[topic_address]

		# 写入文件并发布到其他节点
		Page.writePublish inner_path, Page.jsonEncode(data), (res) =>
			elem.removeClass("loading")
			if res == true
				@log "File written"
			else # 失败
				elem.toggleClass("active") # Change back

	return false
```


---


### fileList
文件夹中的文件列表

参数             | 描述
             --- | ---
**inner_path**   | 需要显示的文件夹

**返回**: 文件夹中的文件列表（递归）


---


### fileNeed
（可选）文件下载的初始化。

参数                    | 描述
                    --- | ---
**inner_path**          | 你想要得到的文件
**timeout** (可选)      | 数据到达的最长等待时间 (默认值: 300)

**返回**: 成功下载后返回 `"ok"`


---

### fileQuery
简单的json文件查询命令

参数                 | 描述
                 --- | ---
**dir_inner_path**   | 查询文件的模式
**query**            | 查询命令（可选）

**返回**: 以数组形式匹配内容。

**查询示例:**

 - `["data/users/*/data.json", "topics"]`: 从全部用户文件中返回话题项
 - `["data/users/*/data.json", "comments.1@2"]`: 从全部用户文件中返回`user_data["comments"]["1@2"]`值
 - `["data/users/*/data.json", ""]`: 从全部用户文件中返回全部数据
 - `["data/users/*/data.json"]`: 从全部用户文件中返回全部数据 (和上面一样)

**示例:**
```coffeescript
@cmd "fileQuery", ["data/users/*/data.json", "topics"], (topics) =>
	topics.sort (a, b) -> # Sort by date
		return a.added - b.added
	for topic in topics
		@log topic.topic_id, topic.inner_path, topic.title
```


---


### fileRules
返回文件的规则。

参数                 | 描述
                 --- | ---
**inner_path**       | 文件内部路径

**返回**: 数组格式的匹配内容。

**示例结果:**

```json
{
	"current_size": 2485,
	"cert_signers": {"zeroid.bit": ["1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz"]},
	"files_allowed": "data.json",
	"signers": ["1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj"],
	"user_address": "1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj",
	"max_size": 100000
}
```

**示例:**
```coffeescript
@cmd "fileRules", "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json", (rules) =>
	@log rules
```


---


### fileWrite

在文件中写内容


参数               | 描述
               --- | ---
**inner_path**     | 要写入文件的内部路径
**content_base64** | 要写入文件的内容（base64格式编码）

**返回**: 成功返回`"ok"`，否则返回错误消息。

**示例:**
```coffeescript
writeData: (cb=null) ->
	# 编码为json，编码为utf8
	json_raw = unescape(encodeURIComponent(JSON.stringify({"hello": "ZeroNet"}, undefined, '\t')))
	# 转换为base64格式并发送
	@cmd "fileWrite", ["data.json", btoa(json_raw)], (res) =>
		if res == "ok"
			if cb then cb(true)
		else
			@cmd "wrapperNotification", ["error", "File write error: #{res}"]
			if cb then cb(false)
```

_注释:_ 要写content.json中没列出的文件，你必须在你想写的站点的data/sites.json`文件中具有`"own": true`项


---


### ping
测试UiServer的websocket连接

**返回:** pong


---


### serverInfo

**返回:** JavaScript对象格式的服务器全部信息。

**示例:**
```coffeescript
@cmd "serverInfo", {}, (server_info) =>
	@log "Server info:", server_info
```

**返回值的示例:**
```json
{
	"debug": true, # 运行在调试模式
	"fileserver_ip": "*", # 绑定的文件服务器
	"fileserver_port": 15441, # 文件服务器端口
	"ip_external": true, # 主动或被动模式
	"platform": "win32", # 操作系统
	"ui_ip": "127.0.0.1", # 绑定的网页服务器
	"ui_port": 43110, # 网页服务器端口
	"version": "0.2.5" # 版本
}
```




---


### siteInfo

**返回**: JavaScript对象格式的站点全部信息

**示例:**
```coffeescript
@cmd "siteInfo", {}, (site_info) =>
	@log "Site info:", site_info
```

**返回值示例:**
```json
{
	"tasks": 0, # 目前需下载的文件数
	"size_limit": 10, # 当前站点大小限制(MB)
	"address": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr", # 站点地址
	"next_size_limit": 10, # 全部站点文件容量限制
	"auth_address": "2D6xXUmCVAXGrbVUGRRJdS4j1hif1EMfae", # 当前用户的比特币地址
	"auth_key_sha512": "269a0f4c1e0c697b9d56ccffd9a9748098e51acc5d2807adc15a587779be13cf", # 弃用，不再使用
	"peers": 14, # 站点的节点
	"auth_key": "pOBdl00EJ29Ad8OmVIc763k4", # 弃用，不再使用
	"settings":  {
		"peers": 13, # 排序需要的节点数
		"serving": true, # 托管站点
		"modified": 1425344149.365, # 全部站点文件的最新修改时间
		"own": true, # 自己的站点
		"permissions": ["ADMIN"], # 站点权限
		"size": 342165 # 站点总大小（字节）
	},
	"bad_files": 0, # 需要下载的文件
	"workers": 0, # 当前正在的下载
	"content": { # 根content.json
		"files": 12, # 文件数，详细的文件信息被移除以减小数据传输和解析的时间
		"description": "This site",
		"title": "ZeroHello",
		"signs_required": 1,
		"modified": 1425344149.365,
		"ignore": "(js|css)/(?!all.(js|css))",
		"signers_sign": null,
		"address": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr",
		"zeronet_version": "0.2.5",
		"includes": 0
	},
	"cert_user_id": "zeronetuser@zeroid.bit", # 为该站点当前选择的账号
	"started_task_num": 1, # 最新的已下载文件数
	"content_updated": 1426008289.71 # Content.json更新时间
}
```


---


### sitePublish
发布站点的content.json

参数                      | 描述
                      --- | ---
**privatekey** (可选) | 用于签名的私钥（默认值：当前用户的私钥）
**inner_path** (可选) | 要发布的内容json的内部路径（默认值：content.json）
**sign** (可选)       | 如果为True则在发布之前签名content.json（默认值：True）

**返回**: 成功返回`"ok"`，否则返回错误消息。

**示例:**
```coffeescript
# 提示私钥
@cmd "wrapperPrompt", ["输入你的私钥:", "密码"], (privatekey) =>
	$(".publishbar .button").addClass("loading")
	# 发送签名的content.json并发布请求到服务器
	@cmd "sitePublish", [privatekey], (res) =>
		$(".publishbar .button").removeClass("loading")
		@log "Publish result:", res
```


---


### siteReload
重新加载content.json文件内容并扫描可选文件

**返回**: 成功返回"ok"


---


### siteSign
给站点的content.json签名

参数                               | 描述
                               --- | ---
**privatekey** (可选)              | 用于签名的私钥（默认值：当前用户的私钥）
**inner_path** (可选)              | 要签名的内容json的内部路径（默认值：content.json）
**remove_missing_optional** (可选) | 从content.json中删除文件夹下不存在的可选文件（默认值：False）

**返回**: 成功返回`"ok"`，否则返回错误消息。

> __注释:__
> 使用定义在users.json中的"stored"项作为私钥 (例如 克隆的站点)

**示例:**
```coffeescript
if @site_info["privatekey"] # 存储在users.json中的私钥
	@cmd "siteSign", ["stored", "content.json"], (res) =>
		@log "签名结果", res
```


---



### siteUpdate

强制检查并从其他节点下载更新的内容（仅当用户处于被动模式并使用老旧零网时，才需要）

参数          | 描述
          --- | ---
**address**   | 想要更新的站点地址（只允许当前站点，不需要站点ADMIN权限）

**返回:** None

**示例:**
```coffeescript
# 对被动连接的手动站点更新
updateSite: =>
	$("#passive_error a").addClass("loading").removeClassLater("loading", 1000)
	@log "Updating site..."
	@cmd "siteUpdate", {"address": @site_info.address}
```


---


### userGetSettings

获取用户保存的设置。

**返回:** 用户使用userSetSettings保存的具体站点设置。


---


### userSetSettings

设置用户的具体站点的设置。

参数          | 描述
          --- | ---
**settings**  | 针对具体站点，想要存储的用户设置

**返回:** 成功时返回`"ok"`。


---


## 插件: Bigfile


### BigfileUploadInit

初始化大文件上传。

参数                 | 描述
                 --- | ---
**inner_path**       | 上传的位置
**size**             | 文件大小


**返回**: 词典格式的此次上传信息:

参数                   | 描述
                   --- | ---
**url**                | 上传端的Http地址
**piece_size**         | 文件每个单独哈希部分的大小
**inner_path**         | 文件的站点内部路径
**file_relative_path** | 相对content.json的文件路径

> __注释:__ 不支持的非ascii字符将自动从`inner_path`和`file_relative_path`项值中被移除

**示例**

```javascript
var input = document.createElement('input')
document.body.appendChild(input)
input.type = "file"
input.style.visibility = "hidden"

input.onchange = () => {
    var file = input.files[0]
    page.cmd("bigfileUploadInit", ["optional/"+file.name, file.size], (init_res) => {
        var formdata = new FormData()
        formdata.append(file.name, file)

        var req = new XMLHttpRequest()
        req.upload.addEventListener("progress", console.log)
        req.upload.addEventListener("loadend", () =>
            page.cmd("wrapperConfirm", ["上传完成!", "打开文件"],
                () => { window.top.location = init_res.inner_path }
            )
        )
        req.withCredentials = true
        req.open("POST", init_res.url)
        req.send(formdata)
    })
}
input.click()
```


---

## 插件: Chart

### chartDbQuery

在图表数据库上执行数据库查询。

实参和返回值: 和[dbQuery](#dbquery-query-param)一样


### chartGetPeerLocations

在客户端中获取节点列表

**返回**: 节点列表

**示例**:
```javascript
Page.cmd("chartGetPeerLocations")
> [
>  {lat: 43.6655, city: "Toronto", ping: null, lon: -79.4204, country: "Canada"},
> ...
> ]
```

---

## 插件: Cors

在虚拟目录**/cors-siteaddress/**下允许跨站点文件访问，并使用[as](#as-address-cmd-arguments)API命令授予跨站点数据库查询。

### corsPermission

请求与给定站点的跨源资源共享权限。

参数                 | 描述
                 --- | ---
**address**          | 你想获取cors权限的站点地址

**返回**: 成功时返回`"ok"`。

授予权限后，其他站点的文件将通过http请求或fileGet API命令在**/cors-siteaddress/**虚拟目录下变得可用。

如果需要，站点将添加到用户的客户端中。


---

## 插件: Multiuser

!!! info "注释"
    以下命令只能由具有"ADMIN"[权限](#wrapperpermissionadd)的站点执行。


### userLoginForm

请求使用私钥登录。

!!! info "信息"
    多用户插件将获取此私钥，将其转换为主种子。通过在浏览器中设置缓存(例如 `master_address=1bc83cc...`)，您可以指定在所有后续请求中充当哪个用户。

    这个缓存是由UiWrapper作为其WebSocket连接握手的一部分发送的。 选择此方法是因为它不需要修改现有的请求，而且它还可以与托管在单独计算机上的ZeroNet客户端通信(比如 ZeroNet 代理)。

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userLoginForm', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **输出:**

    None，登录提示将出现在iframe无法访问的窗口中。


### userShowMasterSeed

请求显示用户的私钥。

??? "示例"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userShowMasterSeed', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **输出:**

    None，私钥将出现在iframe无法访问的窗口中。


---


## 插件: CryptMessage


### userPublickey

获取用户站点的特定公钥。

参数                 | 描述
                 --- | ---
**index** (可选)     | 站点内的子公钥。(默认值: 0)


**返回**: base64编码的公钥

---

### eciesEncrypt

使用公钥加密文本。

参数                           | 描述
                           --- | ---
**text**                       | 需要加密的文本
**publickey** (可选)           | 用户的公钥索引(int) 或者 base64编码的公钥(默认值: 0)
**return_aes_key** (可选)      | 获取用到加密的AES关键字 (默认值: False)


**返回**: base64格式的加密文本 或者 [base64格式的加密文本，base64格式的AES关键字]

---

### eciesDecrypt

尝试解密文本列表

参数                           | 描述
                           --- | ---
**params**                     | 加密文本的列表或文本
**privatekey** (可选)          | 用户的私钥索引(int) 或者base64编码的私钥(默认值: 0)


**返回**: 加密文本解密后的文本或列表 (失败的解码返回空值)

---

### aesEncrypt

使用密钥和iv加密文本

参数                           | 描述
                           --- | ---
**text**                       | 需使用AES加密的文本
**key** (optional)             | Base64编码的密码 (默认值: generate new)
**iv** (optional)              | Base64编码的iv (默认值: generate new)


**返回**: [base64编码的关键字, base64编码的iv, base64编码的加密文本]


---

### aesDecrypt

使用IV和AES密钥解密文本

参数                           | 描述
                           --- | ---
**iv**                         | Base64格式的IV
**encrypted_text**             | Base64格式的加密文本
**encrypted_texts**            | [base64格式的iv, base64格式的加密文本]对列表
**key**                        | 这段文本的Base64格式密码
**keys**                       | 解码关键词(对每一对都尝试)


**返回**:解码的文本或解码后的文本列表


---


## 插件: Newsfeed


### feedFollow

设置关注的sql查询。

SQL查询应生成具有列的行:

域             | 描述
           --- | ---
**type**       | 类型: post, article, comment, mention
**date_added** | 事件时间
**title**      | 事件要显示的第一行
**body**       | 事件的第二和第三行
**url**        | 链接到事件页

参数           | 描述
           --- | ---
**feeds**      | 格式: {"查询名": [SQL查询, [参数1, 参数2, ...], ...}, 参数将被转义, 由插入Sql查询的`:params`间的`,`连接。

**返回**: `"ok"`。

**示例:**
```coffeescript
# 关注ZeroBlog帖子
query = "
	SELECT
	 post_id AS event_uri,
	 'post' AS type,
	 date_published AS date_added,
	 title AS title,
	 body AS body,
	 '?Post:' || post_id AS url
	FROM post
"
params = [""]
Page.cmd feedFollow [{"Posts": [query, params]}]
```

---

### feedListFollow

当前关注的投喂返回

**返回**: 与feedFollow命令相同格式的当前关注投喂


---

### feedQuery

在用户的通知源中执行对关注站点/页面的全部查询。

**返回**: 关注的Sql查询结果

参数                 | 描述
                 --- | ---
**limit**            | 每个关注站点的结果数限制 (默认值: 10)
**day_limit**        | 返回时间不早于此天数 (默认值: 3)


---

## 插件: MergerSite


### mergerSiteAdd

开始下载新的合并站点。

参数                 | 描述
                 --- | ---
**addresses**        | 站点地址或站点地址列表


---

### mergerSiteDelete

停止托管并删除一个合并站点。

参数                 | 描述
                 --- | ---
**address**          | 站点地址


---

### mergerSiteList

返回合并的站点。

参数                 | 描述
                 --- | ---
**query_site_info**  | 如果为True，则返回合并站点的详细站点信息


---


## 插件: Mute


### muteAdd

添加新用户到屏蔽列表。 (对非ADMIN权限站点需要确认)

参数                 | 描述
                 --- | ---
**auth_address**     | 用户数据的文件夹名
**cert_user_id**     | 用户的证书用户名
**reason**           | 屏蔽理由

**返回**: 如果确认返回`"ok"`

**示例:**
```coffeescript
Page.cmd("muteAdd", ['1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz','helloworld@kaffie.bit','垃圾邮件发送者'])
```

---

### muteRemove

从屏蔽列表中移除用户。 (对非ADMIN站点要求确认)

参数                 | 描述
                 --- | ---
**auth_address**     | 用户数据的文件夹名

**返回**: 如果确认返回`"ok"`

**示例:**
```coffeescript
Page.cmd("muteRemove", '1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz')
```

---

### muteList

屏蔽用户列表。 (所在站点要求ADMIN权限)

**返回**: 数组格式的屏蔽用户


---


## 插件: OptionalManager


### optionalFileList

返回可选文件列表

参数                 | 描述
                 --- | ---
**address**          | 要列出可选文件的站点地址 (默认值: current site)
**orderby**          | 返回的可选文件的顺序 (默认值: time_downloaded DESC)
**limit**            | 返回的可选文件的最大数目 (默认值: 10)

**返回**: 返回的每个可选文件是包含下面列的数据库行:

列名                | 描述
                --- | ---
**file_id**         | 文件的ID
**site_id**         | 文件来自的站点ID
**inner_path**      | 从站点根目录开始的文件路径
**hash_id**         | 文件的哈希
**size**            | 文件的大小（字节）
**peer**            | 此文件有多少节点
**uploaded**        | 此文件中有多少字节已上传到其他节点
**is_downloaded**   | 此文件是否已完全下载
**is_pinned**       | 是否已锁定此文件
**time_added**      | 添加此文件的时间
**time_downloaded** | 此文件下载完成的时间
**time_accessed**   | 上次访问此文件的时间

---

### optionalFileInfo

查询有关给定路径的单个可选文件的信息。

参数                 | 描述
                 --- | ---
**inner_path**       | 从站点根目录开始的文件路径

**返回**: 具有下面列数据的数据行:

列名                | 描述
                --- | ---
**file_id**         | 文件的ID
**site_id**         | 文件来自的站点ID
**inner_path**      | 从站点根目录开始的文件路径
**hash_id**         | 文件的哈希
**size**            | 文件的大小（字节）
**peer**            | 此文件有多少节点
**uploaded**        | 此文件中有多少字节已上传到其他节点
**is_downloaded**   | 此文件是否已完全下载
**is_pinned**       | 是否已锁定此文件
**time_added**      | 添加此文件的时间
**time_downloaded** | 此文件下载完成的时间
**time_accessed**   | 上次访问此文件的时间

---

### optionalFilePin

锁定下载的可选文件。该文件现在从自动可选文件清理中排除。

参数                 | 描述
                 --- | ---
**inner_path**       | 此文件的路径
**address**          | 此文件的地址 (默认值: current site)

---

### optionalFileUnpin

移除下载的可选文件固定。该文件现在包含在自动可选文件清理中。

参数                 | 描述
                 --- | ---
**inner_path**       | 此文件的路径
**address**          | 此文件的地址 (默认值: current site)

---

### optionalFileDelete

删除下载的可选文件

参数                 | 描述
                 --- | ---
**inner_path**       | 此文件的路径
**address**          | 此文件的地址 (默认值: current site)

---

### optionalLimitStats

返回当前被可选文件占用的磁盘空间

**返回**: limit, used and free space statistics

---


### optionalLimitSet

设置可选文件限制

参数                 | 描述
                 --- | ---
**limit**            | 以gb或已用空间的百分比表示的可选文件可用最大空间

---

### optionalHelpList

列出可选文件的自动下载目录

参数                 | 描述
                 --- | ---
**address**          | 要列出帮助目录的站点地址 (默认值: current site)

**返回**: JavaScript对象格式的自动下载目录和描述。

---


### optionalHelp

将目录添加到自动下载列表。

参数                 | 描述
                 --- | ---
**directory**        | 想要添加到自动下载列表的目录
**title**            | 条目标题（显示在ZeroHello上）
**address**          | 要添加自动下载目录的站点地址（默认值：current site）

---

### optionalHelpRemove

禁止在目录中自动下载可选文件。 仅当网站上启用了[optionalHelp](#optionalhelp)时有效。

参数                 | 描述
                 --- | ---
**directory**        | 要从自动下载列表中删除的目录
**address**          | 站点的地址（默认值：current site）

---

### optionalHelpAll

帮助将每个新上传的可选文件下载到站点

参数                 | 描述
                 --- | ---
**value**            | 启用或禁用自动下载
**address**          | 受影响站点的地址（默认值：current site）


---


## 管理员命令
_(在data/sites.json中需要ADMIN权限)_


### as

在其他站点的上下文中执行命令


参数                 | 描述
                 --- | ---
**address**          | 上下文网站的地址
**cmd**              | API命令名称
**arguments**        | API命令参数

**返回**: 命令的返回值


**示例**

```javascript
Page.cmd("as", ["138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP", "siteSetLimit", 20], console.log )
```

```javascript
address = "138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP"
query = "SELECT * FROM json WHERE file_name = :file_name"
params = {"file_name": "data.json"}
Page.cmd("as", [address, "dbQuery", [query, params]], function(res) { console.log(res.length) } )
```


### certList

返回有关当前已知身份提供程序证书的信息。

**返回**: 一个对象列表，每个对象表示来自身份提供程序的证书。

**示例**

```javascript
Page.cmd("certSelect")
```

```javascript
[
  ...
  {
    "auth_type": "web",
    "domain": "zeroid.bit",
    "selected": false,
    "auth_user_name": "username",
    "auth_address": "1GUDV..."
  },
  ...
]
```


### certSet

为当前站点设置使用的证书。

参数                 | 描述
                 --- | ---
**domain**           | 证书颁发者的域名

**返回**: None


---


### channelJoinAllsite

请求有关每个站点事件的通知。

参数                | 描述
               ---  | ---
**channel**         | 要加入的频道（请参阅channelJoin）

**返回**: None


---

**返回**: ok

### configSet

创建或更新ZeroNet的配置文件中的一个条目。(默认是zeronet.conf)


参数                 | 描述
                 --- | ---
**key**              | 配置条目名称
**value**            | 配置条目新值


**返回**: ok

---

### serverPortcheck

开始检查端口是否打开

**返回**: True (端口已打开) 或者 False (端口已关闭)


---


### serverShutdown

停止运行ZeroNet客户端。

**返回**: None



---


### serverUpdate

从github重新下载ZeroNet。

**返回**: None


---


### siteClone
将站点文件复制到新站点中。

如果文件或文件夹有`-default`后缀的文件或文件夹版本，他们将会被自动跳过，同时带后缀的版本将会被复制而不是原来的文件或文件夹。


例如 如果你有一个`data`和`data-default`文件夹: 这个`data`文件夹将不会被拷贝同时这个`data-default`文件夹会被重新命名为data。

参数                | 描述
               ---  | ---
**address**         | 想克隆的网站地址
**root_inner_path** | 新站点的源文件夹

**返回**: None, 当完成时自动重新导向到新站点


---


### siteList

**返回**: <list> 所有下载网站的站点信息列表


---


### sitePause
暂停网站托管

参数                | 描述
               ---  | ---
**address**         | 想要暂停的网站地址

**返回**: None


---


### siteResume
恢复网站托管

参数                | 描述
               ---  | ---
**address**         | 想要恢复的网站地址

**返回**: None 
