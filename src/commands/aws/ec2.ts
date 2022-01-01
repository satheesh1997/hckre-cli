import chalk from 'chalk'

import {cli} from 'cli-ux'
import {SSM} from 'aws-sdk'
import {CredentialsProviderError} from '@aws-sdk/property-provider'

import SSMProcess from '../../processes/ssm.process'

import {panicSSOLoginExpired} from '../../messages/error.messages'
import {
  createSSMSession,
  getRegion,
  getRunningSSMConnectedEC2Instances,
  terminateSSMSession,
} from '../../common/helpers/aws.helpers'
import {selectAWSInstance, selectAWSProfile} from '../../prompts/aws.prompts'
import {AWSCommonCommand} from '../../common/commands/aws.command'

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

export class EC2InstanceConnect extends AWSCommonCommand {
  static description = 'Connect to EC2 instance via SSM'

  async run(): Promise<void> {
    try {
      const {profile} = await selectAWSProfile(this.awsConfiguration)

      cli.action.start(`${chalk.green('?')} ${chalk.bold(`Fetching EC2 instances running in ${getRegion(profile)}`)}`)
      const runningSSMConnectedEC2Instances: {name: string; value: string}[] = await getRunningSSMConnectedEC2Instances(
        profile,
      )
      runningSSMConnectedEC2Instances.sort((first, second) => {
        return compareObjects(first, second, 'name')
      })
      cli.action.stop(`${chalk.cyan('done')}`)

      const {instance} = await selectAWSInstance(runningSSMConnectedEC2Instances)
      const startSessionRequest: SSM.StartSessionRequest = {
        Target: instance,
      }
      const sessionData: SSM.StartSessionResponse = await createSSMSession(startSessionRequest, profile)

      SSMProcess.spawnSync(
        `'${JSON.stringify(sessionData).toString()}' ${getRegion(profile)} StartSession ${profile} '${JSON.stringify(
          startSessionRequest,
        ).toString()}'`,
      )

      await terminateSSMSession(sessionData.SessionId as string, profile)

      this.exit(0)
    } catch (error) {
      if (error instanceof CredentialsProviderError) {
        panicSSOLoginExpired(this)
      }

      throw error
    }
  }
}
