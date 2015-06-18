# Contributing to ZeroNet

 - Write about ZeroNet. You can add your article to [ZeroTalk](http://127.0.0.1:43110/1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ/?Topics:8@2/Articles+about+ZeroNet).
 - Join our IRC channel, [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) and help to answer questions.
 - Create new ZeroNet sites: The network is worth nothing without content, so we need You to make it succeed. Content is king!
 - Help to develop ZeroNet: If you know python you can pick a task from
   [github issues](https://github.com/HelloZeroNet/ZeroNet/issues) or develop your own idea.
   Before you start anything big please, open a [new discussion](https://github.com/HelloZeroNet/ZeroNet/issues/new),
   so you can make sure nobody is working on it already and we can share our ideas to make the best out of it.
 - You can [donate](zeronet_development/donate) bitcoins to support ZeroNet.

# Coding standards if you want to collaborate to ZeroNet
 - Follow [PEP8](https://www.python.org/dev/peps/pep-0008/)
 - Simple is better than complex
 - Premature optimization is the root of all evil

### Naming
 - ClassNames: Capitalized, CamelCased
 - functionNames: starts with lowercase, camelCased
 - variable_names: lowercased, under_scored

### Variables
 - file_path: File path realtive to working dir (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - inner_path: File relative to site dir (css/all.css)
 - file_name: all.css
 - file: Python file object
 - privatekey: Private key for the site (without _)

### Source files directories and naming
 - One class per file is preferred
 - Source file name and directory comes from ClassName: WorkerManager class = Worker/WorkerManager.py
