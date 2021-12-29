import {Config} from '@oclif/core'
import {existsSync, writeJSONSync} from 'fs-extra'
import {readJSONSync} from 'fs-extra'

import IUser from '../interfaces/user.interface'
import User from '../models/user.model'

export class Configuration {
  private _config: Config
  private _user: IUser | undefined

  constructor(config: Config) {
    this._config = config
  }

  getUser = (): IUser | undefined => {
    if (this._user !== undefined) {
      return this._user
    }

    if (existsSync(`${this._config.configDir}/user.json`)) {
      const data = readJSONSync(`${this._config.configDir}/user.json`) as IUser
      this._user = new User(data.name, data.email, data.businessUnit, data.team)
    }

    return this._user
  }

  saveUser = (user: IUser): void => {
    this._user = user
    writeJSONSync(`${this._config.configDir}/user.json`, user)
  }
}
