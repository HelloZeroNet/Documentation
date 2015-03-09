Example code in [[ZeroNet Developer's Documentation]]

# Standard commands

##### siteInfo
 - Return: <dict> All information about the site

##### serverInfo
 - Return: <dict> All information about the server

##### channelJoin channel
 - Request notifications about sites's events.
 - Return: None
 - Parameters:
   * channel: Channel to join
     - siteChanged (joined by default): peers_added, file_started, file_done, file_failed

##### siteUpdate address
 - Force check and download changed content from other peers
 - Return: None
 - Parameters:
   - address: Address of site want to update (only current site allowed without ADMIN permission)

##### sitePublish privatekey
 - Sign and Publish the site (only allowed on own sites)
 - Return: "ok" on success else the error message
 - Parameters:
   - privatekey: Private key used for signing

##### fileWrite inner_path content
 - Write file content (only allowed on own sites)
 - Return: "ok" on success else the error message
 - Parameters:
   - inner_path: File relative to site's dir (eg. data.json)
   - content: File content encoded with base64

##### wrapperNotification type message [timeout]
 - Display a notification
 - Return: None
 - Parameters:
   - type: info, error, done
   - message: The message you want to display
   - timeout (optional): Hide display after this interval (milliseconds)

##### wrapperConfirm message [button]
 - Display a notification with confirm button
 - Return: True if clicked on button
 - Parameters:
   - message: The message you want to display
   - button (optional): Caption of the confirmation button

##### wrapperPrompt message [type]
 - Prompt text input from user
 - Return: Text entered to input
 - Parameters:
   - message: The message you want to display
   - type (default: text): Type of the input


# Admin commands
(requires ADMIN permission in data/sites.json)

##### siteList
 - Return: <list> SiteInfo list of all downloaded sites

##### channelJoinAllsite channel
 - Request notifications about every site's events.
 - Return: None
 - Parameters:
   * channel: Channel to join (see channelJoin)

##### sitePause address
 - Pause site serving
 - Return: None
 - Parameters:
   - address: Address of site want to pause

##### siteResume address
 - Pause site serving
 - Return: None
 - Parameters:
   - address: Address of site want to pause