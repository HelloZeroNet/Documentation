# Contributing to ZeroNet

Thank you for using ZeroNet. ZeroNet is a collaborative effort of 67+ decentralization enthusiasts just like you. We appreciate all users that catch bugs, improve documentation and have good ideas of designing new protocols. Here are a few guidelines we ask you to follow to get started with making your contribution.

### You don’t have to contribute source code

In fact, a majority of contributors do not submit source code. Even if you like to write programs, other types of contribution are also welcomed.

### Do you like to write?

- Write about ZeroNet.
- Write tutorials to help people set things up.
- Help translate ZeroNet.
- Improve this documentation. This documentation is a written by many community members all over the world.

### Do you like helping people?

- Subscribe to our [issue tracker on GitHub](https://github.com/HelloZeroNet/ZeroNet/issues) and help people solve problems.
- Join us on [Gitter](https://gitter.im/HelloZeroNet/ZeroNet) and IRC channel [#zeronet @ freenode](https://kiwiirc.com/client/irc.freenode.net/zeronet) and help answer questions.
- Set up a seed box and help make the network faster.

### Do you like to make websites?

- Create new ZeroNet sites. Go ahead and make your own blog on ZeroNet. [It is easy and costs little.](../using_zeronet/create_new_site.md)
- “Content is king!” as NoFish puts. The network is worth nothing without content, so we need You to make it succeed.

### Do you like to do research?

- Help us investigate our [hard issues](https://github.com/HelloZeroNet/ZeroNet/labels/help%20wanted).
- Join our discussion of designing new features and protocols, such as [I2P support](https://github.com/HelloZeroNet/ZeroNet/issues/45) and [DHT support](https://github.com/HelloZeroNet/ZeroNet/issues/57).
- Do you own a [Raspberry Pi](https://github.com/HelloZeroNet/ZeroNet#linux-terminal), a [C.H.I.P.](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:94:Running+ZeroNet+on+a+$9%C2%A0computer) or an [open router](https://github.com/HelloZeroNet/ZeroNet/issues/783)? Try running ZeroNet on it and tell us how well ZeroNet works on your device.

### Do you like to write code?

- If you know Python, you can pick a task from our [issue tracker on GitHub](https://github.com/HelloZeroNet/ZeroNet/issues).
- You are also welcomed develop your own ideas. Before you start, please [open a new discussion](https://github.com/HelloZeroNet/ZeroNet/issues/new) to let the community know, so you can make sure we can share our ideas to make the best out of it.
- Keep your coding style consistent. We ask you to follow our coding convention below.

### Do you like to offer financial support?

- You can [donate bitcoins](donate.md) to support ZeroNet.


## Coding convention

- Follow [PEP8](https://www.python.org/dev/peps/pep-0008/)
- Simple is better than complex
- Premature optimization is the root of all evil

### Naming
- ClassNames: Capitalized, CamelCased
- functionNames: starts with lowercase, camelCased
- variable_names: lowercased, under_scored

### Variables
- file_path: File path relative to working dir (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
- inner_path: File relative to site dir (css/all.css)
- file_name: all.css
- file: Python file object
- privatekey: Private key for the site (without `_`)

### Source files directories and naming
- One class per file is preferred
- Source file name and directory comes from ClassName: WorkerManager class = Worker/WorkerManager.py
