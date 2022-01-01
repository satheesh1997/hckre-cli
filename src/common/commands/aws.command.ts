import {Command, Config} from '@oclif/core'

import {panicAWSNotLoaded, panicSSMNotLoaded} from '../../messages/error.messages'

import IAWSConfiguration from '../../interfaces/aws.config.interface'
import AWSConfiguration from '../../models/aws.config.model'
import AWSProcess from '../../processes/aws.process'
import SSMProcess from '../../processes/ssm.process'

export abstract class AWSCommonCommand extends Command {
  public awsConfiguration: IAWSConfiguration

  constructor(argv: string[], config: Config) {
    super(argv, config)

    if (!AWSProcess.isLoaded()) {
      panicAWSNotLoaded(this)
    }

    if (!SSMProcess.isLoaded()) {
      panicSSMNotLoaded(this)
    }

    this.awsConfiguration = new AWSConfiguration()
  }
}
