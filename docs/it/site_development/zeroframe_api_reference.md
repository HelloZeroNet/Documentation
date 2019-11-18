# ZeroFrame API Reference

## The ZeroFrame API

ZeroFrame is an API that allows ZeroNet websites to interact with the ZeroNet daemon. It allows sites to save/retrieve files, publish changes and many other things. A copy of the library is included at `js/ZeroFrame.js` whenever a new site is created.

The library can be imported like any other JavaScript file, or site developers also have the option of [importing through NPM](ZeroFrame API Page, ##Import?). Please see the [ZeroFrame API Reference]() for API details.

## Wrapper

Commands that interact with code outside of the iframe.

### wrapperConfirm
Display a notification with a confirmation.

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    message = 'Are you sure you want to delete this?'
    buttonTitle = 'Delete'

    zeroframe.cmd 'wrapperConfirm', [message, buttonTitle], (confirmed) =>
      if confirmed
        console.log 'Deleting post...'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    let message = 'Are you sure you want to delete this?';
    let buttonTitle = 'delete';

    zeroframe.cmd('wrapperConfirm', [message, buttonTitle], (confirmed) => {
      if (confirmed) {
        console.log('Deleting post...');
      }
    };
    ```

    **Output:**

    User clicks confirm:

    ```javascript
    "Deleting post..."
    ```

    !!! info "Note"

        The callback function is not run if the user dismisses the notification.
---


### wrapperInnerLoaded
Because `#anchors` in the URL only apply to the outer web page, and not the inner iframe where ZeroNet sites live, this command must be used to do so. When your site is fully loaded, call this method to apply the current anchor to the inner iframe's `src` URL.

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperInnerLoaded', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperInnerLoaded', []);
    ```

    **Output:**

    If the user is on `http://127.0.0.1:43110/mysite.bit#my-title`:

    ```
    [Wrapper] Added hash to location http://127.0.0.1:43110/mysite.bit/?wrapper_nonce=some_nonce#my-title
    ```


---

### innerLoaded
Alias for [wrapperInnerLoaded](#wrapperinnerloaded).

---


### wrapperGetLocalStorage
Retrieve the contents of the ZeroNet site's Local Storage.

!!! info "Note"

    As ZeroNet sites all run off the same domain, the same Local Storage is
    technically shared by all sites, which is a security risk. Thus, the
    UiWrapper compartmentalizes each site to only be able to access their own
    portion.

**Return**: The Local Storage for this site as JSON.

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd "wrapperGetLocalStorage", [], (res) =>
      res ?= {}
      console.log "Local storage value:", res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd("wrapperGetLocalStorage", [], (res) => {
      res = res || {};
      console.log("Local Storage contents:", res);
    });
    ```

    **Output:**

    If Local Storage is empty:

    ```javascript
    Local Storage contents: {}
    ```

    If Local Storage has been modified with [wrapperSetLocalStorage](#wrappersetlocalstorage):

    ```javascript
    Local Storage contents: {"score": 500}
    ```

---

### wrapperGetState
Return the history state of the current tab from the browser.

**Return**: Browser's current history state object.

??? "Example"

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

    **Output:**

    ```
    null
    ```

---

### wrapperGetAjaxKey
**Return**: Retrieve a key that can be used to make ajax (XMLHTTPRequest, fetch) requests.

??? "Example"

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

    **Output:**

    The file we requested. In this case, the `content.json` of the current site:

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

    !!! info "Note"

        The recommended usecase of this is for communicating with non-ZeroNet
        sources. This is not the recommended way to retrieve the contents of
        a file for a site. For that, use the [fileGet](#fileget) command
        instead.

        Retrieving files from other ZeroNet sites can be done via the [CORS
        plugin](#plugin-cors).

        You can also use `monkeyPatchAjax` function from `ZeroFrame.js` to
        patch default XMLHTTPRequest and fetch implementations.

---

### wrapperNotification
Display a notification.

Parameter              | Description
                  ---  | ---
**type**               | The style of the notification. Possible values: `info`, `error`, `done`
**message**            | The message you want to display
**timeout** (optional) | Hide display after this interval (milliseconds)

**Return**: None.

??? "Example"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperNotification', ['done', 'Your registration has been sent!', 10000]
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperNotification', ['done', 'Your registration has been sent!', 10000]);
    ```


---

### wrapperOpenWindow
Navigates to or opens a new popup window.

Parameter              | Description
                  ---  | ---
**url**                | URL of the opened page
**target** (optional)  | Target window name
**specs** (optional)   | Special properties of the window (see: [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open))

??? "Example"

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
Request a new permission for site.

Parameter        | Description
             --- | ---
**permission**   | Name of permission (e.g. Merger:ZeroMe)

??? "Example"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperPermissionAdd', ['Merger:ZeroMe'], (res) ->
      if res == 'ok'
        console.log 'Permission granted.'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperPermissionAdd', ['Merger:ZeroMe'], (res) => {
      if (res === 'ok') {
        console.log('Permission granted.');
      }
    });
    ```

    **Output:**

    If the user accepted the permission request:

    ```
    Permission granted.
    ```

    If the user denied or did not answer the request, the method will not be
    run.


---

### wrapperPrompt
Prompt for text input from the user.

Parameter           | Description
               ---  | ---
**message**         | The message you want to display
**type** (optional) | The input field type (e.g. `text`, `password`)

**Return**: Entered input text.

??? "Example"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    # Prompt for a site's private key
    zeroframe.cmd 'wrapperPrompt', ['Enter your private key:', 'password'], (privatekey) ->
      # Sign and publish content.json
      zeroframe.cmd 'sitePublish', [privatekey], (res) ->
        console.log 'Publish result:', res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe = new ZeroFrame();

    // Prompt for a site's private key
    zeroframe.cmd('wrapperPrompt', ['Enter your private key:', 'password'], function(privatekey) {
      // Sign and publish content.json
      zeroframe.cmd('sitePublish', [privatekey], function(res) {
        console.log('Publish result:', res);
      });
    });
    ```

    **Output:**

    ```
    Publish result: ok
    ```


---

### wrapperPushState
Change the url while and adding a new entry to the browser's history. See [JavaScript pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method). And see [wrapperReplaceState](#wrapperreplacestate) to do so without adding a new history entry.

Parameter           | Description
               ---  | ---
**state**           | State JavaScript object
**title**           | Title of the page
**url**             | URL path of the page

**Return**: None.

??? "Example"
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
Change the url without adding a new entry to the browser's history. See [JavaScript replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method).

Parameter           | Description
               ---  | ---
**state**           | State JavaScript object
**title**           | Title of the page
**url**             | URL path of the page

**Return**: None.

??? "Example"
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

!!! warning "Deprecated"

    Starting from ZeroNet Rev3136 you can use the fullscreen javascript API directly, without needing to ask the wrapper first.

Set the current page to fullscreen.

??? "Example"

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
Set browser's local store data stored for the site

Parameter              | Description
                  ---  | ---
**data**               | Any data structure you want to store for the site

**Return**: None.

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    setTimeout(->
      zeroframe.cmd 'wrapperSetLocalStorage', {'score': 500}, (res) =>
        console.log 'Score saved.'
    , 100)
    ```

    ```javascript tab="JavaScript"
    import 'js/ZeroFrame.js'

    setTimeout(() => {
      zeroframe.cmd('wrapperSetLocalStorage', {'score': 500}, (res) => {
        console.log('Score saved.');
      });
    }, 100);

    const zeroframe = new ZeroFrame();
    ```

    !!! info "Note"

        `wrapperSetLocalStorage` relies on `site_info`, an object containing
        information about the site that is retrieved from ZeroNet daemon on
        ZeroFrame's load In order to allow for this to happen, we delay the
        execution of `wrapperSetLocalStorage` by 100ms.

    **Output:**

    If local storage is empty:

    ```javascript
    Score saved.
    ```


---

### wrapperSetTitle
Set the title of the site.

Parameter              | Description
                  ---  | ---
**title**              | New browser tab title

**Return**: None.

??? "Example"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperSetTitle', 'My New Title'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperSetTitle', 'My New Title');
    ```

    Site title will now be `My New Title`.


---


### wrapperSetViewport
Set sites's viewport meta tag content (required for mobile sites).

Parameter           | Description
               ---  | ---
**viewport**        | The viewport meta tag content

**Return**: None.

??? "Example"

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

The UiServer does all the 'backend' work (eg: querying the DB, accessing files,
etc). These are the API calls you will need to make your site dynamic.

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
Add a new certificate to the current user.

Parameter            | Description
                 --- | ---
**domain**           | Certificate issuer domain
**auth_type**        | Auth type used on registration
**auth_user_name**   | User name used on registration
**cert**             | The cert itself: `auth_address#auth_type/auth_user_name` string signed by the cert site owner

**Return**: `"ok"`, `"Not changed"` or `{"error": error_message}`.

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

Parameter                       | Description
                            --- | ---
**accepted_domains** (optional) | List of domains that accepted by site as authorization provider (default: [])
**accept_any** (optional)       | Does not limits the accepted certificate providers (default: False)
**accepted_pattern** (optional) | Regexp pattern for accepted certificate providers address (default: None)

**Return**: None.

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

**Return**: None.

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

**Return**: Result of the query as an array.


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
Delete a file.

Parameter        | Description
             --- | ---
**inner_path**   | The file you want to delete

**Return**: `"ok"` on success, the error message otherwise.


---


### fileGet
Get the contents of a file.

Parameter               | Description
                    --- | ---
**inner_path**          | The file you want to get
**required** (optional) | Try and wait for the file if it's not exists. (default: True)
**format** (optional)   | Encoding of returned data. (text or base64) (default: text)
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**Return**: <string> The content of the file.


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

**Return**: List of files in the directory (recursive).


---


### fileNeed
Initialize download of a (optional) file.

Parameter               | Description
                    --- | ---
**inner_path**          | The file you want to get
**timeout** (optional)  | Maximum wait time to data arrive (default: 300)

**Return**: `"ok"` on successful download.


---

### fileQuery
Simple json file query command

Parameter            | Description
                 --- | ---
**dir_inner_path**   | Pattern of queried files
**query**            | Query command (optional)

**Return**: Matched content as an array.

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

**Return**: Matched content as an array.

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

**Return**: `"ok"` on success, the error message otherwise.

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

**Return:** All information about the server as a JavaScript object.

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

**Return**: All information about the site as a JavaScript object.

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

**Return**: `"ok"` on success, the error message otherwise.

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

**Return**: `"ok"` on success, the error message otherwise.

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

**Return:** None.

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

**Return:** `"ok"` on success.


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

Get a list of unique peers from the client.

**Return**: A list of unique peers.

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

**Return**: `"ok"` on success.

After the permission is granted the other site's files will be available under **/cors-siteaddress/** virtual directory via http request or by the fileGet API command.

The site will be added to user's client if it's required.


---

## Plugin: Multiuser

!!! info "Note"
    The below commands can only be executed by a site with the "ADMIN" [permission](#wrapperpermissionadd).


### userLoginForm

Request to login with a private key.

!!! info "Info"
    The Multiuser plugin will take this private key, convert it to a master seed,
    and by setting a cookie in your browser (e.g. `master_address=1bc83cc...`) you
    can specify which user to act as on all subsequent requests.

    This cookie is sent by the UiWrapper as part of its WebSocket connection
    handshake. This method was chosen as it doesn't require modifying existing
    requests, and it also works with communicating to ZeroNet clients that are
    hosted on a separate machine (such as ZeroNet proxies).

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userLoginForm', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **Output:**

    None, the login prompt will appear in a window inaccessible to the iframe.


### userShowMasterSeed

Request to show the user's private key.

??? "Example"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userShowMasterSeed', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **Output:**

    None, the private key will appear in a window inaccessible to the iframe.


---


## Plugin: CryptMessage


### userPublickey

Get user's site specific public key.

Parameter            | Description
                 --- | ---
**index** (optional) | Sub-public key within site (default: 0)


**Return**: Base64-encoded public key.

---

### eciesEncrypt

Encrypt a text using a public key.

Parameter                      | Description
                           --- | ---
**text**                       | Text to encrypt
**publickey** (optional)       | User's public key index (int) or base64 encoded public key (default: 0)
**return_aes_key** (optional)  | Get the AES key used in encryption (default: False)


**Return**: Encrypted text in base64 format or [Encrypted text in base64 format, AES key in base64 format].

---

### eciesDecrypt

Try to decrypt list of texts

Parameter                      | Description
                           --- | ---
**params**                     | A text or list of encrypted texts
**privatekey** (optional)      | User's privatekey index (int) or base64 encoded privatekey (default: 0)


**Return**: Decrypted text or array of decrypted texts (null for failed decodings).

---

### aesEncrypt

Encrypt a text using the key and the iv

Parameter                      | Description
                           --- | ---
**text**                       | A text encrypt using AES
**key** (optional)             | Base64 encoded password (default: generate new)
**iv** (optional)              | Base64 encoded iv (default: generate new)


**Return**: [base64 encoded key, base64 encoded iv, base64 encoded encrypted text].


---

### aesDecrypt

Decrypt text using the IV and AES key

Parameter                      | Description
                           --- | ---
**iv**                         | IV in Base64 format
**encrypted_text**             | Encrypted text in Base64 format
**encrypted_texts**            | Array of [base64 encoded iv, base64 encoded encrypted text] pairs
**key**                        | Base64 encoded password for the text
**keys**                       | Keys for decoding (tries every one for every pairs)


**Return**: Decoded text or array of decoded texts.


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

**Return**: `"ok"`.

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

**Return**: The currently followed feeds in the same format as in the feedFollow commands.


---

### feedQuery

Execute all queries for followed sites/pages in the user's notifications feed.

**Return**: The result of the followed SQL queries.

Parameter            | Description
                 --- | ---
**limit**            | Limit of results per followed site (default: 10)
**day_limit**        | Events no older than number of this days (default: 3)


---

## Plugin: MergerSite


### mergerSiteAdd

Start downloading new merger site(s).

Parameter            | Description
                 --- | ---
**addresses**        | Site address or list of site addresses


---

### mergerSiteDelete

Stop seeding and delete a merged site.

Parameter            | Description
                 --- | ---
**address**          | Site address


---

### mergerSiteList

Return merged sites.

Parameter            | Description
                 --- | ---
**query_site_info**  | If true, then gives back detailed site infomation for merged sites


---


## Plugin: Mute


### muteAdd

Add new user to mute list. (Requires confirmation for non-ADMIN sites)

Parameter            | Description
                 --- | ---
**auth_address**     | Directory name of the user's data
**cert_user_id**     | Cert user name of the user
**reason**           | Reason of the muting

**Return**: `"ok"` if confirmed.

**Example:**
```coffeescript
Page.cmd("muteAdd", ['1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz','helloworld@kaffie.bit','Spammer'])
```

---

### muteRemove

Remove a user from mute list. (Requires confirmation for **non-admin** sites).

Parameter            | Description
                 --- | ---
**auth_address**     | Directory name of the user's data

**Return**: `"ok"` if confirmed.

**Example:**
```coffeescript
Page.cmd("muteRemove", '1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz')
```

---

### muteList

List muted users. (Requires **admin** permission on site).

**Return**: Array of muted users.


---


## Plugin: OptionalManager


### optionalFileList

Return an array of optional file information.

Parameter            | Description
                 --- | ---
**address**          | The site address you want to list optional files (default: current site)
**orderby**          | Order of returned optional files (default: time_downloaded DESC)
**limit**            | Max number of returned optional files (default: 10)

**Return**: Database rows with the following columns for each optional file returned:

Column name         | Description
                --- | ---
**file_id**         | The ID of the file
**site_id**         | The ID of the site the file is from
**inner_path**      | The path of the file starting from the site root
**hash_id**         | The hash of the file
**size**            | The size of the file (in bytes)
**peer**            | How many peers this file has
**uploaded**        | How many bytes of this file have been uploaded to other peers
**is_downloaded**   | Whether this file has been completely downloaded
**is_pinned**       | Whether this file has been pinned
**time_added**      | When this file was added
**time_downloaded** | When this file finished downloading
**time_accessed**   | When this file was last accessed

---

### optionalFileInfo

Query information about a single optional file given its path.

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file starting from the site root

**Return**: Database row with the following columns:

Column name         | Description
                --- | ---
**file_id**         | The ID of the file
**site_id**         | The ID of the site the file is from
**inner_path**      | The path of the file starting from the site root
**hash_id**         | The hash of the file
**size**            | The size of the file (in bytes)
**peer**            | How many peers this file has
**uploaded**        | How many bytes of this file have been uploaded to other peers
**is_downloaded**   | Whether this file has been completely downloaded
**is_pinned**       | Whether this file has been pinned
**time_added**      | When this file was added
**time_downloaded** | When this file finished downloading
**time_accessed**   | When this file was last accessed

---

### optionalFilePin

Pin a downloaded optional file. The file is now excluded from automated optional file cleanup.

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileUnpin

Remove pinning of a downloaded optional file. The file is now included in automated optional file cleanup.

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalFileDelete

Delete a downloaded optional file.

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

### optionalLimitStats

Return currently used disk space by optional files.

**Return**: limit, used and free space statistics.

---


### optionalLimitSet

Set the optional file limit.

Parameter            | Description
                 --- | ---
**limit**            | Max space used by the optional files in GB or percentage of used space

---

### optionalHelpList

List the auto-downloaded directories of optional files.

Parameter            | Description
                 --- | ---
**address**          | Address of site you want to list helped directories (default: current site)

**Return**: Auto-downloaded directories and descriptions as a JavaScript object.

---


### optionalHelp

Add directory to auto-download list.

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to add to auto-download list
**title**            | Title for the entry (displayed on ZeroHello)
**address**          | Address of site you want to add the auto-download directory (default: current site)

---

### optionalHelpRemove

Prevent auto-download of optional files within a directory. Only effective if
[optionalHelp](#optionalhelp) is enabled on the site.

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to remove from auto-download list
**address**          | Address of site (default: current site)

---

### optionalHelpAll

Help download every new uploaded optional file to the site

Parameter            | Description
                 --- | ---
**value**            | Enable or Disable the auto-download
**address**          | Address of affected site (default: current site)


---


## Plugin: UiPluginManager


### pluginAddRequest


Ask user to install a new plugin from a directory of the current site.

Parameter            | Description
                 --- | ---
**inner_path**       | Directory of the plugin

**Example:**
```coffeescript
Page.cmd("pluginAddRequest", "plugins/Example")
```

The plugin directory must contain a **plugin_info.json** file that contains the plugin's displayed name, a short description and the version (rev) number.

**Example plugins/Example/plugin_info.json:**
```json
{
    "name": "Example plugin",
    "description": "Just an example for third-party plugins",
    "rev": 5
}
```

**Return**: "ok" on success

> __Note:__
> You can see the currently installed plugins version number in [server info](#serverinfo) plugins_rev node.


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


### certList

Returns information regarding the currently known identity provider certificates.

**Return**: A list of objects each representing a certificate from an identity provider.

**Example**

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

**Return**: ok


### configSet

Create or update an entry in ZeroNet config file. (zeronet.conf by default)


Parameter            | Description
                 --- | ---
**key**              | Configuration entry name
**value**            | Configuration entry new value


**Return**: ok

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
