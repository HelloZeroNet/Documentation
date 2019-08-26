# ZeroFrame API Reference

## The ZeroFrame API

ZeroFrame is an API that allows ZeroNet websites to interact with the ZeroNet daemon. It allows sites to save/retrieve files, publish changes and many other things. A copy of the library is included at `js/ZeroFrame.js` whenever a new site is created.

The library can be imported like any other JavaScript file, or site developers also have the option of [importing through NPM](ZeroFrame API Page, ##Import?). Please see the [ZeroFrame API Reference]() for API details.

## Wrapper

_These commands are handled by the wrapper frame and are thus not sent to the UiServer using websocket._


### wrapperConfirm
Display a notification with confirm button

Parameter              | Description
                  ---  | ---
**message**            | The message you want to display
**button_caption** (optional) | Caption of the confirmation button (default: OK)

**Return**: True if clicked on button

**Example:**
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

Applies the windows.location.hash to page url. Call when you page is fully loaded to jump to the desired anchor point.


---


### wrapperGetLocalStorage
**Return**: Browser's local store for the site

**Example:**
```coffeescript
@cmd "wrapperGetLocalStorage", [], (res) =>
	res ?= {}
	@log "Local storage value:", res
```



---

### wrapperGetState
**Return**: Browser's current history state object

---

### wrapperGetAjaxKey
**Return**: The key you need to initilize ajax (XMLHTTPRequest, fetch) requests

**Example:**
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
Display a notification

Parameter              | Description
                  ---  | ---
**type**               | Possible values: info, error, done
**message**            | The message you want to display
**timeout** (optional) | Hide display after this interval (milliseconds)

**Return**: None

**Example:**
```coffeescript
@cmd "wrapperNotification", ["done", "Your registration has been sent!", 10000]
```


---

### wrapperOpenWindow

Navigates or opens a new popup window.

Parameter              | Description
                  ---  | ---
**url**                | Url of the opened page
**target** (optional)  | Target window name
**specs** (optional)   | Special properties of the window (see: [window.open specs](http://www.w3schools.com/jsref/met_win_open.asp))

**Example:**
```coffeescript
@cmd "wrapperOpenWindow", ["https://zeronet.io", "_blank", "width=550,height=600,location=no,menubar=no"]
```

---


### wrapperPermissionAdd

Request new permission for site


Parameter        | Description
             --- | ---
**permission**   | Name of permission (eg. Merger:ZeroMe)


---

### wrapperPrompt

Prompt text input from user

Parameter           | Description
               ---  | ---
**message**         | The message you want to display
**type** (optional) | Type of the input (default: text)

**Return**: Text entered to input

**Example:**
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
Change the url and adds new entry to browser's history. See: [pushState JS method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)

Parameter           | Description
               ---  | ---
**state**           | State javascript object
**title**           | Title of the page
**url**             | Url of the page

**Return**: None

**Example:**
```coffeescript
@cmd "wrapperPushState", [{"scrollY": 100}, "Profile page", "Profile"]
```


---

### wrapperReplaceState
Change the url without adding new entry to browser's history. See: [replaceState JS method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method)

Parameter           | Description
               ---  | ---
**state**           | State javascript object
**title**           | Title of the page
**url**             | Url of the page

**Return**: None

```coffeescript
@cmd "wrapperReplaceState", [{"scrollY": 100}, "Profile page", "Profile"]
```

---

### wrapperRequestFullscreen
Set the current page to fullscreen. (request permission for the site on first call)

> **Note:** Starting from ZeroNet Rev3136 you can use the fullscreen javascript API directly, without fullscreen request

**Example:**
```javascript
page.cmd("wrapperRequestFullscreen")
```


---

### wrapperSetLocalStorage
Set browser's local store data stored for the site

Parameter              | Description
                  ---  | ---
**data**               | Any data structure you want to store for the site

**Return**: None

**Example:**
```coffeescript
Page.local_storage["topic.#{@topic_id}_#{@topic_user_id}.visited"] = Time.timestamp()
Page.cmd "wrapperSetLocalStorage", Page.local_storage
```


---

### wrapperSetTitle
Set browser's title

Parameter              | Description
                  ---  | ---
**title**              | New browser tab title

**Return**: None

**Example:**
```coffeescript
Page.cmd "wrapperSetTitle", "newtitle"
```

---


### wrapperSetViewport

Set sites's viewport meta tag content (required for mobile sites)


Parameter           | Description
               ---  | ---
**viewport**        | The viewport meta tag content

**Return**: None

**Example:**
```coffeescript
# Prompt the private key
@cmd "wrapperSetViewport", "width=device-width, initial-scale=1.0"
```


---



## UiServer

The UiServer is for ZeroNet what the LAMP setup is for normal websites.

The UiServer will do all the 'backend' work (eg: querying the DB, accessing files, etc). This are the API calls you will need to make your site dynamic.


### announcerInfo
Tracker statistics for current site

**Return**:
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
Add a new certificate to current user.

Parameter            | Description
                 --- | ---
**domain**           | Certificate issuer domain
**auth_type**        | Auth type used on registration
**auth_user_name**   | User name used on registration
**cert**             | The cert itself: `auth_address#auth_type/auth_user_name` string signed by the cert site owner

**Return**: "ok", "Not changed" or {"error": error_message}

**Example:**
```coffeescript
@cmd "certAdd", ["zeroid.bit", auth_type, user_name, cert_sign], (res) =>
	$(".ui").removeClass("flipped")
	if res.error
		@cmd "wrapperNotification", ["error", "#{res.error}"]
```


---


### certSelect
Display certificate selector.

Parameter            | Description
                 --- | ---
**accepted_domains** | List of domains that accepted by site as authorization provider
**accept_any**       | Does not limits the accepted certificate providers
**accepted_pattern** | Regexp pattern for accepted certificate providers address

**Return**: None

**Example:**
```coffeescript
@cmd "certSelect", {"accepted_domains": ["zeroid.bit"], "accepted_pattern": "1ZeroiD[0-9]"}
```


---


### channelJoin

Request notifications about sites's events.

Parameter   | Description
        --- | ---
**channel** | Channel to join

**Return**: None

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

Parameter            | Description
                 --- | ---
**query**            | Sql query command
**params**           | Parameter substitution to the sql query

**Return**: <list> Result of the query


**Example:**
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

Parameter        | Description
             --- | ---
**inner_path**   | Directory you want to list

**Return**: List of file and directory names


---


### fileDelete
Delete a file

Parameter        | Description
             --- | ---
**inner_path**   | The file you want to delete

**Return**: "ok" on success else the error message


---


### fileGet
Get file content

Parameter               | Description
                    --- | ---
**inner_path**          | The file you want to get
**required** (optional) | Try and wait for the file if it's not exists. (default: True)
**format** (optional)   | Encoding of returned data. (text or base64) (default: text)
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**Return**: <string> The content of the file


**Example:**
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

Parameter        | Description
             --- | ---
**inner_path**   | Directory you want to list

**Return**: List of files in the directory (recursive)


---


### fileNeed
Initialize download of a (optional) file.

Parameter               | Description
                    --- | ---
**inner_path**          | The file you want to get
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**Return**: "ok" on successfull download


---

### fileQuery
Simple json file query command

Parameter            | Description
                 --- | ---
**dir_inner_path**   | Pattern of queried files
**query**            | Query command (optional)

**Return**: <list> Matched content

**Query examples:**

 - `["data/users/*/data.json", "topics"]`: Returns all topics node from all user files
 - `["data/users/*/data.json", "comments.1@2"]`: Returns `user_data["comments"]["1@2"]` value from all user files
 - `["data/users/*/data.json", ""]`: Returns all data from users files
 - `["data/users/*/data.json"]`: Returns all data from users files (same as above)

**Example:**
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

Parameter            | Description
                 --- | ---
**inner_path**       | File inner path

**Return**: <list> Matched content

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

**Example:**
```coffeescript
@cmd "fileRules", "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json", (rules) =>
	@log rules
```


---


### fileWrite

Write file content


Parameter          | Description
               --- | ---
**inner_path**     | Inner path of the file you want to write
**content_base64** | Content you want to write to file (base64 encoded)

**Return**: "ok" on success else the error message

**Example:**
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
Test UiServer websocket connection

**Return:** pong


---


### serverInfo

**Return:** <dict> All information about the server

**Example:**
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

**Return**: <dict> All information about the site

**Example:**
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
Publish a content.json of the site

Parameter                 | Description
                      --- | ---
**privatekey** (optional) | Private key used for signing (default: current user's privatekey)
**inner_path** (optional) | Inner path of the content json you want to publish (default: content.json)
**sign** (optional)       | If True then sign the content.json before publish (default: True)

**Return**: "ok" on success else the error message

**Example:**
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
Reload content.json file content and scans for optional files

**Return**: "ok" on success


---


### siteSign
Sign a content.json of the site

Parameter                              | Description
                                   --- | ---
**privatekey** (optional)              | Private key used for signing (default: current user's privatekey)
**inner_path** (optional)              | Inner path of the content json you want to sign (default: content.json)
**remove_missing_optional** (optional) | Remove the optional files from content.json that no longer present in the directory (default: False)

**Return**: "ok" on success else the error message

> __Note:__
> Use "stored" as privatekey if its definied in users.json (eg. cloned sites)

**Example:**
```coffeescript
if @site_info["privatekey"] # Private key stored in users.json
	@cmd "siteSign", ["stored", "content.json"], (res) =>
		@log "Sign result", res
```


---



### siteUpdate

Force check and download changed content from other peers (only necessary if user is in passive mode and using old version of Zeronet)

Parameter     | Description
          --- | ---
**address**   | Address of site want to update (only current site allowed without site ADMIN permission)

**Return:** None

**Example:**
```coffeescript
# Manual site update for passive connections
updateSite: =>
	$("#passive_error a").addClass("loading").removeClassLater("loading", 1000)
	@log "Updating site..."
	@cmd "siteUpdate", {"address": @site_info.address}
```


---


### userGetSettings

Get user's saved settings.

**Return:** The user specific site's settings saved using userSetSettings.


---


### userSetSettings

Set user's site specific settings.

Parameter     | Description
          --- | ---
**settings**  | The user's site specific settings you want to store.

**Return:** ok on success


---


## Plugin: Bigfile


### BigfileUploadInit

Initialize a new upload endpoint for a bigfile.

Parameter            | Description
                 --- | ---
**inner_path**       | Upload location
**size**             | File size


**Return**: A dict with the information about the upload:

Parameter              | Description
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

## Plugin: Chart

### chartDbQuery

Run database query on chart database.

Arguments and return value: Same as [dbQuery](#dbquery-query-param)


### chartGetPeerLocations

Get list of unique peers in client

**Return**: List of unique peers

**Example**:
```javascript
Page.cmd("chartGetPeerLocations")
> [
>  {lat: 43.6655, city: "Toronto", ping: null, lon: -79.4204, country: "Canada"},
> ...
> ]
```

---

## Plugin: Cors

Allow cross-site file access under virtual directory **/cors-siteaddress/** and grant cross-site database query using the [as](#as-address-cmd-arguments) API command.

### corsPermission

Request Cross origin resource sharing permission with the given site.

Parameter            | Description
                 --- | ---
**address**          | The site address you want get cors access

**Return**: ok on success

After the permission is granted the other site's files will be available under **/cors-siteaddress/** virtual directory via http request or by the fileGet API command.

The site will be added to user's client if it's required.


---


## Plugin: CryptMessage


### userPublickey

Get user's site specific publickey

Parameter            | Description
                 --- | ---
**index** (optional) | Sub-publickey within site (default: 0)


**Return**: base64 encoded publickey

---

### eciesEncrypt

Encrypt a text using a publickey

Parameter                      | Description
                           --- | ---
**text**                       | Text to encrypt
**publickey** (optional)       | User's publickey index (int) or base64 encoded publickey (default: 0)
**return_aes_key** (optional)  | Get the AES key used in encryption (default: False)


**Return**: Encrypted text in base64 format or [Encrypted text in base64 format, AES key in base64 format]

---

### eciesDecrypt

Try to decrypt list of texts

Parameter                      | Description
                           --- | ---
**params**                     | A text or list of encrypted texts
**privatekey** (optional)      | User's privatekey index (int) or base64 encoded privatekey (default: 0)


**Return**: Decrypted text or list of decrypted texts (null for failed decodings)

---

### aesEncrypt

Encrypt a text using the key and the iv

Parameter                      | Description
                           --- | ---
**text**                       | A text encrypt using AES
**key** (optional)             | Base64 encoded password (default: generate new)
**iv** (optional)              | Base64 encoded iv (default: generate new)


**Return**: [base64 encoded key, base64 encoded iv, base64 encoded encrypted text]


---

### aesDecrypt

Decrypt text using the IV and AES key

Parameter                      | Description
                           --- | ---
**iv**                         | IV in Base64 format
**encrypted_text**             | Encrypted text in Base64 format
**encrypted_texts**            | List of [base64 encoded iv, base64 encoded encrypted text] pairs
**key**                        | Base64 encoded password for the text
**keys**                       | Keys for decoding (tries every one for every pairs)


**Return**: Decoded text or list of decoded texts


---


## Plugin: Newsfeed


### feedFollow

Set followed sql queries.

The SQL query should result in rows with cols:

Field          | Description
           --- | ---
**type**       | Type: post, article, comment, mention
**date_added** | Event time
**title**      | Event's first line to be displayed
**body**       | Event's second and third line
**url**        | Link to event's page

Parameter      | Description
           --- | ---
**feeds**      | Format: {"query name": [SQL query, [param1, param2, ...], ...}, parameters will be escaped, joined by `,` inserted in place of `:params` in the Sql query.

**Return**: ok

**Example:**
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


**Return**: The currently followed feeds in the same format as in the feedFollow commands


---

### feedQuery

Execute all followed sql query


**Return**: The result of the followed Sql queries

Parameter            | Description
                 --- | ---
**limit**            | Limit of results per followed site (default: 10)
**day_limit**        | Return no older than number of this days (default: 3)

---

## Plugin: MergerSite


### mergerSiteAdd

Start downloading new merger site(s)

Parameter            | Description
                 --- | ---
**addresses**        | Site address or list of site addresses


---

### mergerSiteDelete

Stop seeding and delete a merged site

Parameter            | Description
                 --- | ---
**address**           | Site address


---

### mergerSiteList

Return merged sites.

Parameter            | Description
                 --- | ---
**query_site_info**  | If True, then gives back detailed site info for merged sites


---


## Plugin: Mute


### muteAdd

Add new user to mute list. (Requires confirmation for non-ADMIN sites)

Parameter            | Description
                 --- | ---
**auth_address**     | Directory name of the user's data.
**cert_user_id**     | Cert user name of the user
**reason**           | Reason of the muting

**Return**: ok if confirmed

**Example:**
```coffeescript
Page.cmd("muteAdd", ['1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz','helloworld@kaffie.bit','Spammer'])
```

---

### muteRemove

Remove a user from mute list. (Requires confirmation for non-ADMIN sites)

Parameter            | Description
                 --- | ---
**auth_address**     | Directory name of the user's data.

**Return**: ok if confirmed

**Example:**
```coffeescript
Page.cmd("muteRemove", '1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz')
```

---

### muteList

List muted users. (Requires ADMIN permission on site)

**Return**: List of muted users


---


## Plugin: OptionalManager


### optionalFileList

Return list of optional files

Parameter            | Description
                 --- | ---
**address**          | The site address you want to list optional files (default: current site)
**orderby**          | Order of returned optional files (default: time_downloaded DESC)
**limit**            | Max number of returned optional files (default: 10)

**Return**: Database row of optional files: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

### optionalFileInfo

Query optional file info from database

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file

**Return**: Database row of optional file: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

### optionalFilePin

Pin (exclude from automatized optional file cleanup) downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileUnpin

Remove pinning (include from automatized optional file cleanup) of downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileDelete

Query a downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalLimitStats

Return currently used disk space by optional files

**Return**: limit, used and free space statistics

---


### optionalLimitSet

Set the optional file limit

Parameter            | Description
                 --- | ---
**limit**            | Max space used by the optional files in gb or percent of used space

---

### optionalHelpList

List the auto-downloaded directories of optional files

Parameter            | Description
                 --- | ---
**address**          | Address of site you want to list helped directories (default: current site)

**Return**: Dict of auto-downloaded directories and descriptions

---


### optionalHelp

Add directory to auto-download list

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to add to auto-download list
**title**            | Title for the entry (displayed on ZeroHello)
**address**          | Address of site you want to add the auto-download directory (default: current site)

---

### optionalHelpRemove

Remove an auto-download entry

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to remove from auto-download list
**address**          | Address of affected site (default: current site)

---

### optionalHelpAll

Help download every new uploaded optional file to the site

Parameter            | Description
                 --- | ---
**value**            | Enable or Disable the auto-download
**address**          | Address of affected site (default: current site)


---


## Admin commands
_(requires ADMIN permission in data/sites.json)_


### as

Execute command in other site's context


Parameter            | Description
                 --- | ---
**address**          | The context site's address
**cmd**              | API command name
**arguments**        | API command arguments

**Return**: Command's return value


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


**Return**: ok

### configSet

Create or update an entry in ZeroNet config file. (zeronet.conf by default)


Parameter            | Description
                 --- | ---
**key**              | Configuration entry name
**value**            | Configuration entry new value


**Return**: ok


---



### certSet

Set the used certificate for current site.

Parameter            | Description
                 --- | ---
**domain**           | Domain of the certificate issuer

**Return**: None


---


### channelJoinAllsite

Request notifications about every site's events.

Parameter           | Description
               ---  | ---
**channel**         | Channel to join (see channelJoin)

**Return**: None




---


### serverPortcheck

Start checking if port is opened

**Return**: True (port opened) or False (port closed)


---


### serverShutdown

Stop running ZeroNet client.

**Return**: None



---


### serverUpdate

Re-download ZeroNet from github.

**Return**: None


---


### siteClone
Copy site files into a new one.

Every file and directory will be skipped if it has a `-default` subfixed version and the subfixed version will be copied instead of it.


Eg. If you have a `data` and a `data-default` directory: The `data` directory will not be copied and the `data-default` directory will be renamed to data.

Parameter           | Description
               ---  | ---
**address**         | Address of site want to clone
**root_inner_path** | The source directory of the new site

**Return**: None, automatically redirects to new site on completion


---


### siteList

**Return**: <list> SiteInfo list of all downloaded sites


---


### sitePause
Pause site serving

Parameter           | Description
               ---  | ---
**address**         | Address of site want to pause

**Return**: None


---


### siteResume
Resume site serving

Parameter           | Description
               ---  | ---
**address**         | Address of site want to resume

**Return**: None 
