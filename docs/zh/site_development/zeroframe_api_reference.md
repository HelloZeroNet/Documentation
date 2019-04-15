# ZeroFrame API参考

## ZeroFrame API

ZeroFrame是一个允许ZeroNet网站与ZeroNet守护进程交互的API。 它允许站点保存/检索文件，发布更改和许多其他内容。 每当创建新站点时，库的副本都包含在`js/ZeroFrame.js`中。

可以像任何其他JavaScript文件一样导入库，或者站点开发人员也可以选择[通过NPM导入](ZeroFrame API Page, ##Import?)。 有关API详细信息，请参阅[ZeroFrame API参考]()。

## 包装器

_这些命令由包装器帧处理，因此不使用websocket发送到UiServer._


### wrapperConfirm
使用确认按钮显示通知

参数                   | 描述
                  ---  | ---
**message**            | 你想展示的消息
**button_caption** (可选) | 确认按钮的标题 (默认值: OK)

**返回**: 如果点击按钮返回True

**示例:**
```coffeescript
# Delete site
siteDelete: (address) ->
	site = @sites[address]
	title = site.content.title
	if title.length > 40
		title = title.substring(0, 15)+"..."+title.substring(title.length-10)
	@cmd "wrapperConfirm", ["Are you sure you sure? <b>#{title}</b>", "Delete"], (confirmed) =>
		@log "Deleting #{site.address}...", confirmed
		if confirmed
			$(".site-#{site.address}").addClass("deleted")
			@cmd "siteDelete", {"address": address}
```


---


### wrapperInnerLoaded

将windows.location.hash应用于页面url。 页面完全加载后调用以跳转到所需的锚点。

---


### wrapperGetLocalStorage
**返回**: 浏览器对此站点的本地存储

**示例:**
```coffeescript
@cmd "wrapperGetLocalStorage", [], (res) =>
	res ?= {}
	@log "Local storage value:", res
```



---

### wrapperGetState
**返回**: 浏览器当前历史状态对象

---

### wrapperGetAjaxKey
**返回**: The key you need to initilize ajax requests

**示例:**
```javascript
ajax_key = await page.cmdp("wrapperGetAjaxKey")
req = new window.XMLHttpRequest()
req.open("GET", "content.json?ajax_key=" + ajax_key)
req.setRequestHeader("Range", "bytes=10-200")  // Optional: only if you want request partial file
req.send()
console.log(req.response)
```

---

### wrapperNotification
展示一个通知

参数                   | 描述
                  ---  | ---
**type**               | 可以的值: info, error, done
**message**            | 你想显示的消息
**timeout** (可选) | 超过此间隔后隐藏展示 (毫秒)

**返回**: None

**示例:**
```coffeescript
@cmd "wrapperNotification", ["done", "Your registration has been sent!", 10000]
```


---

### wrapperOpenWindow

导航或打开一个新的弹出窗口.

参数                   | 描述
                  ---  | ---
**url**                | 打开页面的地址
**target** (可选)  | 目标窗口的名字
**specs** (可选)   | 窗口的特殊属性 (见: [window.open specs](http://www.w3schools.com/jsref/met_win_open.asp))

**示例:**
```coffeescript
@cmd "wrapperOpenWindow", ["https://zeronet.io", "_blank", "width=550,height=600,location=no,menubar=no"]
```

---


### wrapperPermissionAdd

为站点请求新的允许


Parameter        | 描述
             --- | ---
**permission**   | 允许的名字 (例如. Merger:ZeroMe)


---

### wrapperPrompt

提示来自用户的文本输入

Parameter           | 描述
               ---  | ---
**message**         | 你想显示的消息
**type** (可选) | 输入的类型 (默认: text)

**返回**: 输入的文本

**示例:**
```coffeescript
# Prompt the private key
@cmd "wrapperPrompt", ["Enter your private key:", "password"], (privatekey) =>
    $(".publishbar .button").addClass("loading")
    # Send sign content.json and publish request to server
    @cmd "sitePublish", [privatekey], (res) =>
        $(".publishbar .button").removeClass("loading")
        @log "Publish result:", res
```


---

### wrapperPushState
改变地址同时为浏览器历史添加新的值. 见: [pushState JS method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)

Parameter           | 描述
               ---  | ---
**state**           | State javascript object
**title**           | 此页面的标题
**url**             | 此页面的地址

**返回**: None

**示例:**
```coffeescript
@cmd "wrapperPushState", [{"scrollY": 100}, "Profile page", "Profile"]
```


---

### wrapperReplaceState
Change the url without adding new entry to browser's history. See: [replaceState JS method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method)

Parameter           | 描述
               ---  | ---
**state**           | State javascript object
**title**           | Title of the page
**url**             | Url of the page

**返回**: None

```coffeescript
@cmd "wrapperReplaceState", [{"scrollY": 100}, "Profile page", "Profile"]
```

---

### wrapperRequestFullscreen
设置当前页面为全屏. (request permission for the site on first call)

> **注意:** 从ZeroNet Rev3136 开始，你可以不需要请求全屏直接使用javascript的全屏API

**示例:**
```javascript
page.cmd("wrapperRequestFullscreen")
```


---

### wrapperSetLocalStorage
为此站点设置浏览器的本地存储数据

参数                   | 描述
                  ---  | ---
**data**               | 你想为此站点存储的任何数据结构

**返回**: None

**示例:**
```coffeescript
Page.local_storage["topic.#{@topic_id}_#{@topic_user_id}.visited"] = Time.timestamp()
Page.cmd "wrapperSetLocalStorage", Page.local_storage
```


---

### wrapperSetTitle
Set browser's title

参数                   | 描述
                  ---  | ---
**title**              | 新的浏览器标签页标题

**返回**: None

**示例:**
```coffeescript
Page.cmd "wrapperSetTitle", "newtitle"
```

---


### wrapperSetViewport

设置网站的视区元标记内容（移动网站所需）


Parameter           | 描述
               ---  | ---
**viewport**        | 视区元标签内容

**返回**: None

**示例:**
```coffeescript
# Prompt the private key
@cmd "wrapperSetViewport", "width=device-width, initial-scale=1.0"
```


---



## UiServer

UiServer适用于ZeroNet，好比LAMP设置适用于普通网站。

UiServer将完成所有“后端”工作（例如：查询数据库，访问文件等）。 这是您使网站动态化所需的API调用。


### announcerInfo
当前站点的跟踪器统计信息

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
向当前用户添加新证书。

Parameter            | 描述
                 --- | ---
**domain**           | Certificate issuer domain
**auth_type**        | Auth type used on registration
**auth_user_name**   | User name used on registration
**cert**             | The cert itself: `auth_address#auth_type/auth_user_name` string signed by the cert site owner

**返回**: "ok", "Not changed" 或者 {"error": error_message}

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

Parameter            | 描述
                 --- | ---
**accepted_domains** | List of domains that accepted by site as authorization provider
**accept_any**       | Does not limits the accepted certificate providers
**accepted_pattern** | Regexp pattern for accepted certificate providers address

**返回**: None

**示例:**
```coffeescript
@cmd "certSelect", {"accepted_domains": ["zeroid.bit"], "accepted_pattern": "1ZeroiD[0-9]"}
```


---


### channelJoin

请求有关网站活动的通知。

Parameter   | 描述
        --- | ---
**channel** | Channel to join

**返回**: None

**Channels**:

 - **siteChanged** (joined by default)<br>Events: peers_added, file_started, file_done, file_failed

**Example**:
```coffeescript
# Wrapper websocket connection ready
onOpenWebsocket: (e) =>
	@cmd "channelJoinAllsite", {"channel": "siteChanged"}

# Route incoming requests and messages
route: (cmd, data) ->
	if cmd == "setSiteInfo"
		@log "Site changed", data
	else
		@log "Unknown command", cmd, data
```

**Example event data**
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
Run a query on the sql cache

Parameter            | 描述
                 --- | ---
**query**            | Sql查询命令
**params**           | 此sql查询的子参数

**返回**: <list> 查询的结果


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
List a content of a directory

Parameter        | 描述
             --- | ---
**inner_path**   | Directory you want to list

**返回**: 文件及目录名列表


---


### fileDelete
Delete a file

Parameter        | 描述
             --- | ---
**inner_path**   | The file you want to delete

**返回**: "ok" on success else the error message


---


### fileGet
Get file content

Parameter               | 描述
                    --- | ---
**inner_path**          | The file you want to get
**required** (optional) | Try and wait for the file if it's not exists. (default: True)
**format** (optional)   | Encoding of returned data. (text or base64) (default: text)
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**返回**: <string> The content of the file


**示例:**
```coffeescript
# Upvote a topic on ZeroTalk
submitTopicVote: (e) =>
	if not Users.my_name # Not registered
		Page.cmd "wrapperNotification", ["info", "Please, request access before posting."]
		return false

	elem = $(e.currentTarget)
	elem.toggleClass("active").addClass("loading")
	inner_path = "data/users/#{Users.my_address}/data.json"

	Page.cmd "fileGet", [inner_path], (data) =>
		data = JSON.parse(data)
		data.topic_votes ?= {} # Create if not exits
		topic_address = elem.parents(".topic").data("topic_address")

		if elem.hasClass("active") # Add upvote to topic
			data.topic_votes[topic_address] = 1
		else # Remove upvote from topic
			delete data.topic_votes[topic_address]

		# Write file and publish to other peers
		Page.writePublish inner_path, Page.jsonEncode(data), (res) =>
			elem.removeClass("loading")
			if res == true
				@log "File written"
			else # Failed
				elem.toggleClass("active") # Change back

	return false
```


---


### fileList
Recursively list of files in a directory

Parameter        | 描述
             --- | ---
**inner_path**   | Directory you want to list

**返回**: List of files in the directory (recursive)


---


### fileNeed
Initialize download of a (optional) file.

Parameter               | 描述
                    --- | ---
**inner_path**          | The file you want to get
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**返回**: "ok" on successfull download


---

### fileQuery
Simple json file query command

Parameter            | 描述
                 --- | ---
**dir_inner_path**   | Pattern of queried files
**query**            | Query command (optional)

**返回**: <list> Matched content

**Query examples:**

 - `["data/users/*/data.json", "topics"]`: Returns all topics node from all user files
 - `["data/users/*/data.json", "comments.1@2"]`: Returns `user_data["comments"]["1@2"]` value from all user files
 - `["data/users/*/data.json", ""]`: Returns all data from users files
 - `["data/users/*/data.json"]`: Returns all data from users files (same as above)

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
Return the rules for the file.

Parameter            | 描述
                 --- | ---
**inner_path**       | File inner path

**返回**: <list> Matched content

**Example result:**

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

写文件内容


Parameter          | 描述
               --- | ---
**inner_path**     | Inner path of the file you want to write
**content_base64** | Content you want to write to file (base64 encoded)

**返回**: "ok" on success else the error message

**示例:**
```coffeescript
writeData: (cb=null) ->
	# Encode to json, encode utf8
	json_raw = unescape(encodeURIComponent(JSON.stringify({"hello": "ZeroNet"}, undefined, '\t')))
	# Convert to to base64 and send
	@cmd "fileWrite", ["data.json", btoa(json_raw)], (res) =>
		if res == "ok"
			if cb then cb(true)
		else
			@cmd "wrapperNotification", ["error", "File write error: #{res}"]
			if cb then cb(false)
```

_Note:_ to write files that not in content.json yet, you must have `"own": true` in `data/sites.json` at the site you want to write


---


### ping
测试UiServer websocket连接

**Return:** pong


---


### serverInfo

**Return:** <dict> 有关服务器的所有信息

**示例:**
```coffeescript
@cmd "serverInfo", {}, (server_info) =>
	@log "Server info:", server_info
```

**Example return value:**
```json
{
	"debug": true, # Running in debug mode
	"fileserver_ip": "*", # Fileserver binded to
	"fileserver_port": 15441, # FileServer port
	"ip_external": true, # Active of passive mode
	"platform": "win32", # Operating system
	"ui_ip": "127.0.0.1", # UiServer binded to
	"ui_port": 43110, # UiServer port (Web)
	"version": "0.2.5" # Version
}
```




---


### siteInfo

**返回**: <dict> 有关该网站的所有信息

**示例:**
```coffeescript
@cmd "siteInfo", {}, (site_info) =>
	@log "Site info:", site_info
```

**Example return value:**
```json
{
	"tasks": 0, # Number of files currently under download
	"size_limit": 10, # Current site size limit in MB
	"address": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr", # Site address
	"next_size_limit": 10, # Size limit required by sum of site's files
	"auth_address": "2D6xXUmCVAXGrbVUGRRJdS4j1hif1EMfae", # Current user's bitcoin address
	"auth_key_sha512": "269a0f4c1e0c697b9d56ccffd9a9748098e51acc5d2807adc15a587779be13cf", # Deprecated, dont use
	"peers": 14, # Peers of site
	"auth_key": "pOBdl00EJ29Ad8OmVIc763k4", # Deprecated, dont use
	"settings":  {
		"peers": 13, # Saved peers num for sorting
		"serving": true, # Site enabled
		"modified": 1425344149.365, # Last modification time of all site's files
		"own": true, # Own site
		"permissions": ["ADMIN"], # Site's permission
		"size": 342165 # Site total size in bytes
	},
	"bad_files": 0, # Files that needs to be download
	"workers": 0, # Current concurent downloads
	"content": { # Root content.json
		"files": 12, # Number of file, detailed file info removed to reduce data transfer and parse time
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
	"cert_user_id": "zeronetuser@zeroid.bit", # Currently selected certificate for the site
	"started_task_num": 1, # Last number of files downloaded
	"content_updated": 1426008289.71 # Content.json update time
}
```


---


### sitePublish
发布站点的content.json

Parameter                 | 描述
                      --- | ---
**privatekey** (optional) | Private key used for signing (default: current user's privatekey)
**inner_path** (optional) | Inner path of the content json you want to publish (default: content.json)
**sign** (optional)       | If True then sign the content.json before publish (default: True)

**返回**: "ok" on success else the error message

**示例:**
```coffeescript
# Prompt the private key
@cmd "wrapperPrompt", ["Enter your private key:", "password"], (privatekey) =>
	$(".publishbar .button").addClass("loading")
	# Send sign content.json and publish request to server
	@cmd "sitePublish", [privatekey], (res) =>
		$(".publishbar .button").removeClass("loading")
		@log "Publish result:", res
```


---


### siteReload
重新加载content.json文件内容并扫描可选文件

**返回**: "ok" on success


---


### siteSign
签署该网站的content.json

Parameter                              | 描述
                                   --- | ---
**privatekey** (optional)              | Private key used for signing (default: current user's privatekey)
**inner_path** (optional)              | Inner path of the content json you want to sign (default: content.json)
**remove_missing_optional** (optional) | Remove the optional files from content.json that no longer present in the directory (default: False)

**返回**: "ok" on success else the error message

> __Note:__
> Use "stored" as privatekey if its definied in users.json (eg. cloned sites)

**示例:**
```coffeescript
if @site_info["privatekey"] # Private key stored in users.json
	@cmd "siteSign", ["stored", "content.json"], (res) =>
		@log "Sign result", res
```


---



### siteUpdate

强制检查并从其他节点下载更改的内容（仅当用户处于被动模式并使用旧版Zeronet时才需要）

Parameter     | 描述
          --- | ---
**address**   | Address of site want to update (only current site allowed without site ADMIN permission)

**Return:** None

**示例:**
```coffeescript
# Manual site update for passive connections
updateSite: =>
	$("#passive_error a").addClass("loading").removeClassLater("loading", 1000)
	@log "Updating site..."
	@cmd "siteUpdate", {"address": @site_info.address}
```


---


### userGetSettings

获取用户保存的设置。

**Return:** The user specific site's settings saved using userSetSettings.


---


### userSetSettings

设置用户的站点特定设置。

Parameter     | 描述
          --- | ---
**settings**  | The user's site specific settings you want to store.

**Return:** ok on success


---


## 插件: Bigfile


### BigfileUploadInit

初始化bigfile的新上载端点。

Parameter            | 描述
                 --- | ---
**inner_path**       | Upload location
**size**             | File size


**返回**: A dict with the information about the upload:

参数                   | 描述
                   --- | ---
**url**                | Http upload endpoint
**piece_size**         | Size of each separately hashed part of the file
**inner_path**         | File path within the site
**file_relative_path** | File path relative to content.json

> __Note:__ Not supported non-ascii characters will be automatically removed from `inner_path` and `file_relative_path` values

**Example**

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
            page.cmd("wrapperConfirm", ["Upload finished!", "Open file"],
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

在图表数据库上运行数据库查询。

Arguments and return value: Same as [dbQuery](#dbquery-query-param)


### chartGetPeerLocations

Get list of unique peers in client

**返回**: List of unique peers

**Example**:
```javascript
Page.cmd("chartGetPeerLocations")
> [
>  {lat: 43.6655, city: "Toronto", ping: null, lon: -79.4204, country: "Canada"},
> ...
> ]
```

---

## 插件: Cors

Allow cross-site file access under virtual directory **/cors-siteaddress/** and grant cross-site database query using the [as](#as-address-cmd-arguments) API command.

### corsPermission

Request Cross origin resource sharing permission with the given site.

Parameter            | 描述
                 --- | ---
**address**          | The site address you want get cors access

**返回**: ok on success

After the permission is granted the other site's files will be available under **/cors-siteaddress/** virtual directory via http request or by the fileGet API command.

The site will be added to user's client if it's required.


---


## 插件: CryptMessage


### userPublickey

Get user's site specific publickey

Parameter            | 描述
                 --- | ---
**index** (optional) | Sub-publickey within site (default: 0)


**返回**: base64 encoded publickey

---

### eciesEncrypt

Encrypt a text using a publickey

Parameter                      | 描述
                           --- | ---
**text**                       | Text to encrypt
**publickey** (optional)       | User's publickey index (int) or base64 encoded publickey (default: 0)
**return_aes_key** (optional)  | Get the AES key used in encryption (default: False)


**返回**: Encrypted text in base64 format or [Encrypted text in base64 format, AES key in base64 format]

---

### eciesDecrypt

Try to decrypt list of texts

Parameter                      | 描述
                           --- | ---
**params**                     | A text or list of encrypted texts
**privatekey** (optional)      | User's privatekey index (int) or base64 encoded privatekey (default: 0)


**返回**: Decrypted text or list of decrypted texts (null for failed decodings)

---

### aesEncrypt

Encrypt a text using the key and the iv

Parameter                      | 描述
                           --- | ---
**text**                       | A text encrypt using AES
**key** (optional)             | Base64 encoded password (default: generate new)
**iv** (optional)              | Base64 encoded iv (default: generate new)


**返回**: [base64 encoded key, base64 encoded iv, base64 encoded encrypted text]


---

### aesDecrypt

Decrypt text using the IV and AES key

Parameter                      | 描述
                           --- | ---
**iv**                         | IV in Base64 format
**encrypted_text**             | Encrypted text in Base64 format
**encrypted_texts**            | List of [base64 encoded iv, base64 encoded encrypted text] pairs
**key**                        | Base64 encoded password for the text
**keys**                       | Keys for decoding (tries every one for every pairs)


**返回**: Decoded text or list of decoded texts


---


## 插件: Newsfeed


### feedFollow

Set followed sql queries.

The SQL query should result in rows with cols:

Field          | 描述
           --- | ---
**type**       | Type: post, article, comment, mention
**date_added** | Event time
**title**      | Event's first line to be displayed
**body**       | Event's second and third line
**url**        | Link to event's page

Parameter      | 描述
           --- | ---
**feeds**      | Format: {"query name": [SQL query, [param1, param2, ...], ...}, parameters will be escaped, joined by `,` inserted in place of `:params` in the Sql query.

**返回**: ok

**示例:**
```coffeescript
# Follow ZeroBlog posts
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

Return of current followed feeds


**返回**: The currently followed feeds in the same format as in the feedFollow commands


---

### feedQuery

Execute all followed sql query


**返回**: The result of the followed Sql queries

Parameter            | 描述
                 --- | ---
**limit**            | Limit of results per followed site (default: 10)
**day_limit**        | Return no older than number of this days (default: 3)

---

## 插件: MergerSite


### mergerSiteAdd

Start downloading new merger site(s)

Parameter            | 描述
                 --- | ---
**addresses**        | Site address or list of site addresses


---

### mergerSiteDelete

Stop seeding and delete a merged site

Parameter            | 描述
                 --- | ---
**address**           | Site address


---

### mergerSiteList

Return merged sites.

Parameter            | 描述
                 --- | ---
**query_site_info**  | If True, then gives back detailed site info for merged sites


---


## 插件: Mute


### muteAdd

Add new user to mute list. (Requires confirmation for non-ADMIN sites)

Parameter            | 描述
                 --- | ---
**auth_address**     | Directory name of the user's data.
**cert_user_id**     | Cert user name of the user
**reason**           | Reason of the muting

**返回**: ok if confirmed

**示例:**
```coffeescript
Page.cmd("muteAdd", ['1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz','helloworld@kaffie.bit','Spammer'])
```

---

### muteRemove

Remove a user from mute list. (Requires confirmation for non-ADMIN sites)

Parameter            | 描述
                 --- | ---
**auth_address**     | Directory name of the user's data.

**返回**: ok if confirmed

**示例:**
```coffeescript
Page.cmd("muteRemove", '1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz')
```

---

### muteList

List muted users. (Requires ADMIN permission on site)

**返回**: List of muted users


---


## 插件: OptionalManager


### optionalFileList

Return list of optional files

Parameter            | 描述
                 --- | ---
**address**          | The site address you want to list optional files (default: current site)
**orderby**          | Order of returned optional files (default: time_downloaded DESC)
**limit**            | Max number of returned optional files (default: 10)

**返回**: Database row of optional files: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

### optionalFileInfo

Query optional file info from database

Parameter            | 描述
                 --- | ---
**inner_path**       | The path of the file

**返回**: Database row of optional file: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

### optionalFilePin

Pin (exclude from automatized optional file cleanup) downloaded optional file

Parameter            | 描述
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileUnpin

Remove pinning (include from automatized optional file cleanup) of downloaded optional file

Parameter            | 描述
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileDelete

Query a downloaded optional file

Parameter            | 描述
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalLimitStats

Return currently used disk space by optional files

**返回**: limit, used and free space statistics

---


### optionalLimitSet

Set the optional file limit

Parameter            | 描述
                 --- | ---
**limit**            | Max space used by the optional files in gb or percent of used space

---

### optionalHelpList

List the auto-downloaded directories of optional files

Parameter            | 描述
                 --- | ---
**address**          | Address of site you want to list helped directories (default: current site)

**返回**: Dict of auto-downloaded directories and descriptions

---


### optionalHelp

Add directory to auto-download list

Parameter            | 描述
                 --- | ---
**directory**        | Directory you want to add to auto-download list
**title**            | Title for the entry (displayed on ZeroHello)
**address**          | Address of site you want to add the auto-download directory (default: current site)

---

### optionalHelpRemove

Remove an auto-download entry

Parameter            | 描述
                 --- | ---
**directory**        | Directory you want to remove from auto-download list
**address**          | Address of affected site (default: current site)

---

### optionalHelpAll

Help download every new uploaded optional file to the site

Parameter            | 描述
                 --- | ---
**value**            | Enable or Disable the auto-download
**address**          | Address of affected site (default: current site)


---


## 管理员命令
_(requires ADMIN permission in data/sites.json)_


### as

Execute command in other site's context


Parameter            | 描述
                 --- | ---
**address**          | The context site's address
**cmd**              | API command name
**arguments**        | API command arguments

**返回**: Command's return value


**Example**

```javascript
Page.cmd("as", ["138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP", "siteSetLimit", 20], console.log )
```

```javascript
address = "138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP"
query = "SELECT * FROM json WHERE file_name = :file_name"
params = {"file_name": "data.json"}
Page.cmd("as", [address, "dbQuery", [query, params]], function(res) { console.log(res.length) } )
```

---


**返回**: ok

### configSet

Create or update an entry in ZeroNet config file. (zeronet.conf by default)


Parameter            | 描述
                 --- | ---
**key**              | Configuration entry name
**value**            | Configuration entry new value


**返回**: ok


---



### certSet

Set the used certificate for current site.

Parameter            | 描述
                 --- | ---
**domain**           | Domain of the certificate issuer

**返回**: None


---


### channelJoinAllsite

Request notifications about every site's events.

Parameter           | 描述
               ---  | ---
**channel**         | Channel to join (see channelJoin)

**返回**: None




---


### serverPortcheck

Start checking if port is opened

**返回**: True (port opened) or False (port closed)


---


### serverShutdown

Stop running ZeroNet client.

**返回**: None



---


### serverUpdate

Re-download ZeroNet from github.

**返回**: None


---


### siteClone
Copy site files into a new one.

Every file and directory will be skipped if it has a `-default` subfixed version and the subfixed version will be copied instead of it.


Eg. If you have a `data` and a `data-default` directory: The `data` directory will not be copied and the `data-default` directory will be renamed to data.

Parameter           | 描述
               ---  | ---
**address**         | Address of site want to clone
**root_inner_path** | The source directory of the new site

**返回**: None, automatically redirects to new site on completion


---


### siteList

**返回**: <list> SiteInfo list of all downloaded sites


---


### sitePause
Pause site serving

Parameter           | 描述
               ---  | ---
**address**         | Address of site want to pause

**返回**: None


---


### siteResume
Resume site serving

Parameter           | 描述
               ---  | ---
**address**         | Address of site want to resume

**返回**: None 
