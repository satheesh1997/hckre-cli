import {ConfigIniParser} from 'config-ini-parser'
import {existsSync, readFileSync} from 'fs-extra'

import {AWS_CREDENTIALS_STORAGE} from '../constants'

import IAWSConfiguration from '../interfaces/aws.config.interface'

export default class AWSConfiguration implements IAWSConfiguration {
  public profiles: string[] = []
  public profileRegionMap: {[key: string]: string} = {}

  constructor() {
    if (!existsSync(`${AWS_CREDENTIALS_STORAGE}/config`)) {
      throw new Error('Missing AWS configuration file. Run hckre aws:init to configure.')
    }

    this.loadFromFile()
  }

  private loadFromFile = (): void => {
    const parser = new ConfigIniParser('\n')

    parser.parse(readFileSync(`${AWS_CREDENTIALS_STORAGE}/config`).toString())

    this.profiles = parser.sections()
    this.profiles = this.profiles.map(profile => profile.split(' ')[1])

    for (const profile of parser.sections()) {
      this.profileRegionMap[profile.split(' ')[1]] = parser.get(profile, 'region')
    }
  }
}
