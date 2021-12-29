oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hckre
$ hckre COMMAND
running command...
$ hckre (--version)
hckre/0.0.0 darwin-arm64 node-v16.13.1
$ hckre --help [COMMAND]
USAGE
  $ hckre COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hckre help [COMMAND]`](#hckre-help-command)
* [`hckre plugins`](#hckre-plugins)
* [`hckre plugins:inspect PLUGIN...`](#hckre-pluginsinspect-plugin)
* [`hckre plugins:install PLUGIN...`](#hckre-pluginsinstall-plugin)
* [`hckre plugins:link PLUGIN`](#hckre-pluginslink-plugin)
* [`hckre plugins:uninstall PLUGIN...`](#hckre-pluginsuninstall-plugin)
* [`hckre plugins update`](#hckre-plugins-update)

## `hckre help [COMMAND]`

Display help for hckre.

```
USAGE
  $ hckre help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hckre.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `hckre plugins`

List installed plugins.

```
USAGE
  $ hckre plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hckre plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `hckre plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hckre plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hckre plugins:inspect myplugin
```

## `hckre plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hckre plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ hckre plugins add

EXAMPLES
  $ hckre plugins:install myplugin 

  $ hckre plugins:install https://github.com/someuser/someplugin

  $ hckre plugins:install someuser/someplugin
```

## `hckre plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ hckre plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ hckre plugins:link myplugin
```

## `hckre plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hckre plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hckre plugins unlink
  $ hckre plugins remove
```

## `hckre plugins update`

Update installed plugins.

```
USAGE
  $ hckre plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
