import {Command} from '@oclif/core'
import {existsSync, mkdirpSync, writeFileSync} from 'fs-extra'
import {Listr, ListrOptions} from 'listr2'

import {AWS_CREDENTIALS_STORAGE, DEFAULT_AWS_CONFIG} from '../../constants'
import {printCommandError} from '../../messages/error.messages'
import {installAWSCommandLine, installAWSSSMPlugin} from '../../tasks/aws.tasks'

export class Initialize extends Command {
  static description = 'Initialize AWS command'

  async run(): Promise<void> {
    const tasks = new Listr(
      [
        {
          title: 'CommandLine Interface',
          task: (_ctx, task) => task.newListr(installAWSCommandLine),
        },
        {
          title: 'SSM Plugin',
          task: (_ctx, task) => task.newListr(installAWSSSMPlugin),
        },
        {
          title: 'Files Storage',
          skip: () => existsSync(AWS_CREDENTIALS_STORAGE),
          task: () => {
            mkdirpSync(AWS_CREDENTIALS_STORAGE)
          },
        },
        {
          title: 'Credentials File',
          skip: () => existsSync(AWS_CREDENTIALS_STORAGE + '/credentials'),
          task: () => {
            writeFileSync(AWS_CREDENTIALS_STORAGE + '/credentials', '')
          },
        },
        {
          title: 'Configuration File',
          skip: () => existsSync(AWS_CREDENTIALS_STORAGE + '/config'),
          task: () => {
            writeFileSync(AWS_CREDENTIALS_STORAGE + '/config', DEFAULT_AWS_CONFIG)
          },
        },
      ],
      {rendererOptions: {collapse: false}} as ListrOptions,
    )
    tasks.run().catch(_error => {
      printCommandError()
    })
  }
}
