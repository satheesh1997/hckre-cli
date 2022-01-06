# hckre-cli

[![Lint](https://github.com/satheesh1997/hckre-cli/actions/workflows/lint.yml/badge.svg)](https://github.com/satheesh1997/hckre-cli/actions/workflows/lint.yml)
[![Format](https://github.com/satheesh1997/hckre-cli/actions/workflows/format.yml/badge.svg)](https://github.com/satheesh1997/hckre-cli/actions/workflows/format.yml)
[![Version](https://img.shields.io/npm/v/hckre.svg)](https://npmjs.org/package/hckre)
[![Downloads/week](https://img.shields.io/npm/dw/hckre.svg)](https://npmjs.org/package/hckre)
[![License](https://img.shields.io/npm/l/hckre.svg)](https://github.com/satheesh1997/hckre/blob/main/package.json)

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
hckre/2.3.0 darwin-arm64 node-v16.13.1
$ hckre --help [COMMAND]
USAGE
  $ hckre COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`hckre app:build`](#hckre-appbuild)
* [`hckre app:commands`](#hckre-appcommands)
* [`hckre app:deploy`](#hckre-appdeploy)
* [`hckre app:init`](#hckre-appinit)
* [`hckre app:run`](#hckre-apprun)
* [`hckre app:start`](#hckre-appstart)
* [`hckre app:test`](#hckre-apptest)
* [`hckre autocomplete [SHELL]`](#hckre-autocomplete-shell)
* [`hckre aws:ec2`](#hckre-awsec2)
* [`hckre aws:init`](#hckre-awsinit)
* [`hckre aws:login`](#hckre-awslogin)
* [`hckre aws:profiles`](#hckre-awsprofiles)
* [`hckre commands`](#hckre-commands)
* [`hckre help [COMMAND]`](#hckre-help-command)
* [`hckre init`](#hckre-init)
* [`hckre update [CHANNEL]`](#hckre-update-channel)

## `hckre app:build`

Build the application

```
USAGE
  $ hckre app:build

DESCRIPTION
  Build the application
```

_See code: [dist/commands/app/build.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/build.ts)_

## `hckre app:commands`

List & add commands

```
USAGE
  $ hckre app:commands [-a]

FLAGS
  -a, --add  add a new command

DESCRIPTION
  List & add commands
```

_See code: [dist/commands/app/commands.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/commands.ts)_

## `hckre app:deploy`

Deploy the application

```
USAGE
  $ hckre app:deploy

DESCRIPTION
  Deploy the application
```

_See code: [dist/commands/app/deploy.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/deploy.ts)_

## `hckre app:init`

Initialize an application

```
USAGE
  $ hckre app:init

DESCRIPTION
  Initialize an application
```

_See code: [dist/commands/app/init.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/init.ts)_

## `hckre app:run`

Run a command

```
USAGE
  $ hckre app:run

DESCRIPTION
  Run a command
```

_See code: [dist/commands/app/run.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/run.ts)_

## `hckre app:start`

Start the application

```
USAGE
  $ hckre app:start

DESCRIPTION
  Start the application
```

_See code: [dist/commands/app/start.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/start.ts)_

## `hckre app:test`

Test the application

```
USAGE
  $ hckre app:test

DESCRIPTION
  Test the application
```

_See code: [dist/commands/app/test.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/app/test.ts)_

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

## `hckre aws:ec2`

Connect to EC2 instance via SSM

```
USAGE
  $ hckre aws:ec2

DESCRIPTION
  Connect to EC2 instance via SSM
```

_See code: [dist/commands/aws/ec2.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/aws/ec2.ts)_

## `hckre aws:init`

Initialize AWS command

```
USAGE
  $ hckre aws:init

DESCRIPTION
  Initialize AWS command
```

_See code: [dist/commands/aws/init.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/aws/init.ts)_

## `hckre aws:login`

Login via SSO

```
USAGE
  $ hckre aws:login

DESCRIPTION
  Login via SSO
```

_See code: [dist/commands/aws/login.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/aws/login.ts)_

## `hckre aws:profiles`

Manage aws profiles

```
USAGE
  $ hckre aws:profiles [-a]

FLAGS
  -a, --add  add a new profile

DESCRIPTION
  Manage aws profiles
```

_See code: [dist/commands/aws/profiles.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/aws/profiles.ts)_

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

## `hckre init`

Initialize CLI tool

```
USAGE
  $ hckre init

DESCRIPTION
  Initialize CLI tool
```

_See code: [dist/commands/init.ts](https://github.com/satheesh1997/hckre-cli/blob/v2.3.0/dist/commands/init.ts)_

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
