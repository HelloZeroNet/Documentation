# ZeroFrame API Reference

# Standard commands


#### siteInfo

**Return**: <dict> All information about the site

**Example:**
```coffeescript
@cmd "siteInfo", {}, (site_info) =>
	@log site_info
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
	"started_task_num": 1, # Last number of files downloaded
	"content_updated": 1426008289.71 # Content.json update time
}
```


---


#### serverInfo

**Return:** <dict> All information about the server

**Example:**
```coffeescript
@cmd "serverInfo", {}, (server_info) =>
	@log server_info
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


#### siteUpdate _address_

Force check and download changed content from other peers (only necessary if user in passive mode and using old version of Zeronet)

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


#### sitePublish _[privatekey], [inner_path]_ 
Sign and Publish a content.json of the site

Parameter                 | Description
                      --- | ---
**privatekey** (optional) | Private key used for signing (default: current user's privatekey)
**inner_path** (optional) | Inner path of the content json you want to publish (default: content.json)

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


#### fileWrite _inner_path, content_
Write file content

Parameter        | Description
             --- | ---
**inner_path**   | Inner path of the file you want to write
**content**      | Content you want to write to file (base64 encoded)

**Return**: "ok" on success else the error message

**Example:**
```coffeescript
writeData: (cb=null) ->
	# Encode to json, encode utf8
	json_raw = unescape(encodeURIComponent(JSON.stringify(@data, undefined, '\t')))
	# Convert to to base64 and send
	@cmd "fileWrite", ["data.json", btoa(json_raw)], (res) =>
		if res == "ok"
			if cb then cb(true)
		else
			@cmd "wrapperNotification", ["error", "File write error: #{res}"]
			if cb then cb(false) 
```


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


#### wrapperConfirm _message, [button_caption]_
Display a notification with confirm button

Parameter              | Description
                  ---  | ---
**message**            | The message you want to display
**timeout** (optional) | Caption of the confirmation button (default: OK)

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


#### wrapperPrompt _message, [type]_

Prompt text input from user
**Return**: Text entered to input

Parameter           | Description
               ---  | ---
**message**         | The message you want to display
**type** (optional) | Type of the input (default: text)

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


# Admin commands
_(requires ADMIN permission in data/sites.json)_


#### siteList

**Return**: <list> SiteInfo list of all downloaded sites


---


#### channelJoinAllsite _channel_

Request notifications about every site's events.

Parameter           | Description
               ---  | ---
**channel**         | Channel to join (see channelJoin)

**Return**: None


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
