import {Command} from '@oclif/core'
import {cli} from 'cli-ux'
import {SSM} from 'aws-sdk'

import {CLI_STORAGE} from '../../constants'
import {
  createSSMSession,
  getRegion,
  getRunningSSMConnectedEC2Instances,
  terminateSSMSession,
} from '../../common/helpers/aws.helpers'
import {selectAWSInstance, selectAWSProfile} from '../../prompts/aws.prompts'

import Chalk = require('chalk')
import ChildProcess = require('child_process')

const compareObjects = (object1: any, object2: any, key: any) => {
  const obj1 = object1[key]
  const obj2 = object2[key]

  if (obj1 < obj2) {
    return -1
  }

  if (obj1 > obj2) {
    return 1
  }

  return 0
}

export class EC2InstanceConnect extends Command {
  static description = 'Connect to EC2 instance via SSM'

  async run(): Promise<void> {
    const {profile} = await selectAWSProfile()

    cli.action.start(`${Chalk.green('?')} ${Chalk.bold(`Fetching EC2 instances running in ${getRegion(profile)}`)}`)
    const runningSSMConnectedEC2Instances: {name: string; value: string}[] = await getRunningSSMConnectedEC2Instances(
      profile,
    )
    runningSSMConnectedEC2Instances.sort((first, second) => {
      return compareObjects(first, second, 'name')
    })
    cli.action.stop(`${Chalk.cyan('done')}`)

    const {instance} = await selectAWSInstance(runningSSMConnectedEC2Instances)
    const startSessionRequest: SSM.StartSessionRequest = {
      Target: instance,
    }
    const sessionData: SSM.StartSessionResponse = await createSSMSession(startSessionRequest, profile)

    ChildProcess.spawnSync(
      `${CLI_STORAGE}/session-manager-plugin '${JSON.stringify(sessionData).toString()}' ${getRegion(
        profile,
      )} StartSession ${profile} '${JSON.stringify(startSessionRequest).toString()}'`,
      {
        shell: true,
        stdio: 'inherit',
      },
    )

    await terminateSSMSession(sessionData.SessionId as string, profile)

    this.exit(0)
  }
}
