
# ZeroNet Command Line Reference



# Wrapper

_These commands handled by wrapper frame and does not sent to UiServer using websocket_


#### wrapperConfirm _message, [button_caption]_
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


#### wrapperInnerLoaded

Applies the windows.location.hash to page url. Call when you page is fully loaded to jump to the desired anchor point.


---


#### wrapperGetLocalStorage
**Return**: Browser's local store for the site

**Example:**
```coffeescript
@cmd "wrapperGetLocalStorage", [], (res) =>
	res ?= {}
	@log "Local storage value:", res
```



---

#### wrapperGetState
**Return**: Browser's current history state object

---

#### wrapperNotification _type, message, [timeout]_
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

#### wrapperOpenWindow _url, [target], [specs]

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


#### wrapperPermissionAdd _permission_

Request new permission for site


Parameter        | Description
             --- | ---
**permission**   | Name of permission (eg. Merger:ZeroMe)


---

#### wrapperPrompt _message, [type]_

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

#### wrapperPushState _state, title, url_
Change the url and adds new entry to browser's history. See: [pushState JS method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)

Parameter           | Description
               ---  | ---
**state**           | State javascript object
**title**           | Title of the page
**url**             | Url of the page

**Return**: None

```coffeescript
@cmd "wrapperPushState", [{"scrollY": 100}, "Profile page", "Profile"]
```


---

#### wrapperReplaceState _state, title, url_
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

#### wrapperSetLocalStorage _data_
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

#### wrapperSetTitle _title_
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


#### wrapperSetViewport _viewport_

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



# UiServer

The UiServer is for ZeroNet what the LAMP setup is for normal websites.

The UiServer will do all the 'backend' work (eg: querying the DB, accessing files, etc). This are the API calls you will need to make your site dynamic.



#### certAdd _domain, auth_type, auth_user_name, cert_
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


#### certSelect _accepted_domains_
Display certificate selector.

Parameter            | Description
                 --- | ---
**accepted_domains** | List of domains that accepted by site as authorization provider

**Return**: None

**Example:**
```coffeescript
@cmd "certSelect", {"accepted_domains": ["zeroid.bit"]}
```


---


#### channelJoin _channel_

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


#### dbQuery _query_
Run a query on the sql cache

Parameter            | Description
                 --- | ---
**query**            | Sql query command

**Return**: <list> Result of the query

**Example:**
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


#### fileDelete _inner_path_
Delete a file

Parameter        | Description
             --- | ---
**inner_path**   | The file you want to delete

**Return**: "ok" on success else the error message


---


#### fileGet _inner_path, [required], [format], [timeout]_
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


#### fileList _inner_path_
List of files in a directory

Parameter        | Description
             --- | ---
**inner_path**   | Directory you want to list

**Return**: List of files in the directory (recursive)


---


#### fileQuery _dir_inner_path, query_
Simple json file query command

Parameter            | Description
                 --- | ---
**dir_inner_path**   | Pattern of queried files
**query**            | Query command

**Return**: <list> Matched content

**Query examples:**

 - `["data/users/*/data.json", "topics"]`: Returns all topics node from all user files
 - `["data/users/*/data.json", "comments.1@2"]`: Returns `user_data["comments"]["1@2"]` value from all user files
 - `["data/users/*/data.json", ""]`: Returns all data from users files

**Example:**
```coffeescript
@cmd "fileQuery", ["data/users/*/data.json", "topics"], (topics) =>
	topics.sort (a, b) -> # Sort by date
		return a.added - b.added
	for topic in topics
		@log topic.topic_id, topic.inner_path, topic.title
```


---


#### fileRules _inner_path_
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


#### fileWrite _inner_path, content_

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



#### serverInfo

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


#### siteInfo

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


#### sitePublish _[privatekey], [inner_path], [sign]_
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


#### siteSign _[privatekey], [inner_path]_
Sign a content.json of the site

Parameter                 | Description
                      --- | ---
**privatekey** (optional) | Private key used for signing (default: current user's privatekey)
**inner_path** (optional) | Inner path of the content json you want to sign (default: content.json)

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



#### siteUpdate _address_

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


# Plugin: CryptMessage


#### userPublickey _[index]_

Get user's site specific publickey

Parameter            | Description
                 --- | ---
**index** (optional) | Sub-publickey within site (default: 0)


**Return**: base64 encoded publickey

---

#### eciesEncrypt _text, [publickey], [return_aes_key]_

Encrypt a text using a publickey

Parameter                      | Description
                           --- | ---
**text**                       | Text to encrypt
**publickey** (optional)       | User's publickey index (int) or base64 encoded publickey (default: 0)
**return_aes_key** (optional)  | Get the AES key used in encryption (default: False)


**Return**: Encrypted text in base64 format or [Encrypted text in base64 format, AES key in base64 format]

---

#### eciesDecrypt _params, [privatekey]_

Try to decrypt list of texts

Parameter                      | Description
                           --- | ---
**params**                     | A text or list of encrypted texts
**privatekey** (optional)      | User's privatekey index (int) or base64 encoded privatekey (default: 0)


**Return**: Decrypted text or list of decrypted texts (null for failed decodings)

---

#### aesEncrypt _text, [key], [iv]_

Encrypt a text using the key and the iv

Parameter                      | Description
                           --- | ---
**text**                       | A text encrypt using AES
**key** (optional)             | Base64 encoded password (default: generate new)
**iv** (optional)              | Base64 encoded iv (default: generate new)


**Return**: [base64 encoded key, base64 encoded iv, base64 encoded encrypted text]


---

#### aesDecrypt _iv, encrypted_text, key_
#### aesDecrypt _encrypted_texts, keys_

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


# Plugin: Newsfeed


#### feedFollow _feeds_

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

#### feedListFollow

Return of current followed feeds


**Return**: The currently followed feeds in the same format as in the feedFollow commands


---

#### feedQuery _[limit], [day_limit]_

Execute all followed sql query


**Return**: The result of the followed Sql queries

Parameter            | Description
                 --- | ---
**limit**            | Limit of results per followed site (default: 10)
**day_limit**        | Return no older than number of this days (default: 3)

---

# Plugin: MergerSite


#### mergerSiteAdd _addresses_

Start downloading new merger site(s)

Parameter            | Description
                 --- | ---
**addresses**        | Site address or list of site addresses


---

#### mergerSiteDelete _address_

Stop seeding and delete a merged site

Parameter            | Description
                 --- | ---
**address**           | Site address


---

#### mergerSiteList _[query_site_info]_

Return merged sites.

Parameter            | Description
                 --- | ---
**query_site_info**  | If True, then gives back detailed site info for merged sites



---


# Plugin: Mute

#### muteAdd _auth_address_, _cert_user_id_, _reason_

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

#### muteRemove _auth_address_

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

#### muteList

List muted users. (Requires ADMIN permission on site)

**Return**: List of muted users


---


# Plugin: OptionalManager

#### optionalFileList _[address]_, _[orderby]_, _[limit]_

Return list of optional files

Parameter            | Description
                 --- | ---
**address**          | The site address you want to list optional files (default: current site)
**orderby**          | Order of returned optional files (default: time_downloaded DESC)
**limit**            | Max number of returned optional files (default: 10)

**Return**: Database row of optional files: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

#### optionalFileInfo _inner_path_

Query optional file info from database

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file

**Return**: Database row of optional file: file_id, site_id, inner_path, hash_id, size, peer, uploaded, is_downloaded, is_pinned, time_added, time_downlaoded, time_accessed

---

#### optionalFilePin _inner_path_, _[address]_

Pin (exclude from automatized optional file cleanup) downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

#### optionalFileUnpin _inner_path_, _[address]_

Remove pinning (include from automatized optional file cleanup) of downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

#### optionalFileDelete _inner_path_, _[address]_

Query a downloaded optional file

Parameter            | Description
                 --- | ---
**inner_path**       | The path of the file
**address**          | Address for the file (default: current site)

---

#### optionalLimitStats

Return currently used disk space by optional files

**Return**: limit, used and free space statistics

---


#### actionOptionalLimitSet _limit_

Set the optional file limit

Parameter            | Description
                 --- | ---
**limit**            | Max space used by the optional files in gb or percent of used space

---

#### actionOptionalHelpList _[address]_

List the auto-downloaded directories of optional files

Parameter            | Description
                 --- | ---
**address**          | Address of site you want to list helped directories (default: current site)

**Return**: Dict of auto-downloaded directories and descriptions

---


#### actionOptionalHelp directory, title, _[address]_

Add directory to auto-download list

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to add to auto-download list
**title**            | Title for the entry (displayed on ZeroHello)
**address**          | Address of site you want to add the auto-download directory (default: current site)

---

#### actionOptionalHelpRemove directory, _[address]_

Remove an auto-download entry

Parameter            | Description
                 --- | ---
**directory**        | Directory you want to remove from auto-download list
**address**          | Address of affected site (default: current site)

---

#### actionOptionalHelpAll value, _[address]_

Help download every new uploaded optional file to the site

Parameter            | Description
                 --- | ---
**value**            | Enable or Disable the auto-download
**address**          | Address of affected site (default: current site)

---

# Admin commands
_(requires ADMIN permission in data/sites.json)_



---


#### configSet _key, value_

Create or update an entry in ZeroNet config file. (zeronet.conf by default)


Parameter            | Description
                 --- | ---
**key**              | Configuration entry name
**value**            | Configuration entry new value


**Return**: ok


---



#### certSet _domain_

Set the used certificate for current site.

Parameter            | Description
                 --- | ---
**domain**           | Domain of the certificate issuer

**Return**: None


---


#### channelJoinAllsite _channel_

Request notifications about every site's events.

Parameter           | Description
               ---  | ---
**channel**         | Channel to join (see channelJoin)

**Return**: None




---


#### serverPortcheck

Start checking if port is opened

**Return**: True (port opened) or False (port closed)


---


#### serverShutdown

Stop running ZeroNet client.

**Return**: None



---


#### serverUpdate

Re-download ZeroNet from github.

**Return**: None


---


#### siteClone _address_, _[root_inner_path]_
Copy site files into a new one.

Every file and directory will be skipped if it has a `-default` subfixed version and the subfixed version will be copied instead of it.


Eg. If you have a `data` and a `data-default` directory: The `data` directory will not be copied and the `data-default` directory will be renamed to data.

Parameter           | Description
               ---  | ---
**address**         | Address of site want to clone
**root_inner_path** | The source directory of the new site

**Return**: None, automatically redirects to new site on completion


---


#### siteList

**Return**: <list> SiteInfo list of all downloaded sites


---


#### sitePause _address_
Pause site serving

Parameter           | Description
               ---  | ---
**address**         | Address of site want to pause

**Return**: None


---


#### siteResume _address_
Resume site serving

Parameter           | Description
               ---  | ---
**address**         | Address of site want to resume

**Return**: None


