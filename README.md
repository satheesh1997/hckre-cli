# hckre-cli

HackerEarth CLI 2.0 (Engineering & Support)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [hckre-cli](#hckre-cli)
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
hckre/2.2.2 darwin-arm64 node-v16.13.1
$ hckre --help [COMMAND]
USAGE
  $ hckre COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`hckre autocomplete [SHELL]`](#hckre-autocomplete-shell)
* [`hckre commands`](#hckre-commands)
* [`hckre help [COMMAND]`](#hckre-help-command)
* [`hckre update [CHANNEL]`](#hckre-update-channel)

## `hckre autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ hckre autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ hckre autocomplete

  $ hckre autocomplete bash

  $ hckre autocomplete zsh

  $ hckre autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.0.0/src/commands/autocomplete/index.ts)_

## `hckre commands`

list all the commands

```
USAGE
  $ hckre commands [-h] [-j] [--hidden] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -j, --json         display unfiltered api data in json format
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.0.1/src/commands/commands.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.9/src/commands/help.ts)_

## `hckre update [CHANNEL]`

update the hckre CLI

```
USAGE
  $ hckre update [CHANNEL] [--from-local]

FLAGS
  --from-local  interactively choose an already installed version

DESCRIPTION
  update the hckre CLI
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v2.1.3/src/commands/update.ts)_
<!-- commandsstop -->
