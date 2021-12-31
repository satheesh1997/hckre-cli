import {Command} from '@oclif/core'
import {existsSync, mkdirpSync, writeFileSync} from 'fs-extra'

import {AWS_CREDENTIALS_STORAGE, DEFAULT_AWS_CONFIG} from '../../constants'
import {printCommandError} from '../../messages/error.messages'
import {installAWSCommandLine, installAWSSSMPlugin} from '../../tasks/aws.tasks'

import Listr = require('listr')

export class Initialize extends Command {
  static description = 'Initialize AWS command'

  async run(): Promise<void> {
    const tasks = new Listr(
      [
        {
          title: 'CommandLine Interface',
          task: () => installAWSCommandLine,
        },
        {
          title: 'SSM Plugin',
          task: () => installAWSSSMPlugin,
        },
        {
          title: 'Credentials File',
          skip: () => existsSync(AWS_CREDENTIALS_STORAGE) && existsSync(AWS_CREDENTIALS_STORAGE + '/credentials'),
          task: () => {
            if (!existsSync(AWS_CREDENTIALS_STORAGE)) {
              mkdirpSync(AWS_CREDENTIALS_STORAGE)
            }

            if (!existsSync(AWS_CREDENTIALS_STORAGE + '/credentials')) {
              writeFileSync(AWS_CREDENTIALS_STORAGE + '/credentials', '')
            }
          },
        },
        {
          title: 'Configuration File',
          skip: () => existsSync(AWS_CREDENTIALS_STORAGE) && existsSync(AWS_CREDENTIALS_STORAGE + '/config'),
          task: () => {
            if (!existsSync(AWS_CREDENTIALS_STORAGE)) {
              mkdirpSync(AWS_CREDENTIALS_STORAGE)
            }

            if (!existsSync(AWS_CREDENTIALS_STORAGE + '/config')) {
              writeFileSync(AWS_CREDENTIALS_STORAGE + '/config', DEFAULT_AWS_CONFIG)
            }
          },
        },
      ],
      {collapse: false} as Listr.ListrOptions,
    )
    tasks.run().catch(_error => {
      printCommandError()
    })
  }
}
