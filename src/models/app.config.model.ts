import path from 'node:path'

import {existsSync, readFileSync, readJSONSync, writeJSONSync} from 'fs-extra'

import {IAppConfiguration, IAppConfigurationCommand} from '../interfaces/app.config.interface'
import {ConfigIniParser} from 'config-ini-parser'

export default class AppConfiguration implements IAppConfiguration {
  name = path.basename(process.cwd())
  repository = ''
  commands = {}
  environmentCommands = {
    local: {build: [], test: [], deploy: [], start: []} as IAppConfigurationCommand,
    production: {build: [], test: [], deploy: [], start: []} as IAppConfigurationCommand,
    staging: {build: [], test: [], deploy: [], start: []} as IAppConfigurationCommand,
  }

  constructor() {
    if (existsSync('hckre.json')) {
      this.loadFromFile()
    } else if (existsSync('.git')) {
      const parser = new ConfigIniParser('\n')
      parser.parse(readFileSync('.git/config').toString())
      this.repository = parser.get('remote "origin"', 'url')
    }
  }

  private loadFromFile = (): void => {
    const data = readJSONSync('hckre.json') as IAppConfiguration
    this.name = data.name
    this.repository = data.repository
    this.environmentCommands = data.environmentCommands
    this.commands = data.commands
  }

  public save = (): void => {
    writeJSONSync('hckre.json', this as IAppConfiguration, {spaces: 4})
  }
}
