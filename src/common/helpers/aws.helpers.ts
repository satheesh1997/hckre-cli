import {fromSSO} from '@aws-sdk/credential-provider-sso'
import {AWSError, EC2, SSM} from 'aws-sdk'
import {
  StartSessionRequest,
  StartSessionResponse,
  TerminateSessionRequest,
  TerminateSessionResponse,
} from 'aws-sdk/clients/ssm'

import IAWSConfiguration from '../../interfaces/aws.config.interface'
import AWSConfiguration from '../../models/aws.config.model'

import {AWS_SSM_MAX_INSTANCES} from '../../constants'

const getCredentials = async (profile: string): Promise<any> => {
  return fromSSO({profile: profile})()
}

const getRegion = (profile: string): string => {
  const awsConfiguration: IAWSConfiguration = new AWSConfiguration()
  return awsConfiguration.profileRegionMap[`${profile}`]
}

const getSSMManagedEC2Instances = async (profile: string): Promise<any> => {
  const readyInstancesList: any[] = []
  const sessionManager: SSM = new SSM({credentials: await getCredentials(profile), region: getRegion(profile)})

  return new Promise((resolve, reject) => {
    let nextToken = ''
    const loop = () => {
      sessionManager.describeInstanceInformation(
        {
          MaxResults: 50,
          InstanceInformationFilterList: [{key: 'ResourceType', valueSet: ['EC2Instance']}],
          NextToken: nextToken,
        },
        (err, data) => {
          if (err) {
            reject(err)
          }

          if (data?.InstanceInformationList) {
            for (let eachInstance = 0; eachInstance < data.InstanceInformationList.length; eachInstance++) {
              readyInstancesList.push(data.InstanceInformationList[eachInstance])
            }
          }

          if (data?.NextToken) {
            nextToken = data.NextToken
            Promise.resolve().then(loop).catch(reject)
          } else {
            resolve(readyInstancesList)
          }
        },
      )
    }

    loop()
  })
}

const describeEC2Instances = async (
  instancesFilter: {Filters: {Name: string; Values: string[]}[]},
  profile: string,
): Promise<EC2.DescribeInstancesResult> => {
  const credentials = await getCredentials(profile)
  return new Promise((resolve, reject) => {
    new EC2({credentials: credentials, region: getRegion(profile)}).describeInstances(
      instancesFilter,
      function (error, data) {
        if (error) return reject(error)
        resolve(data)
      },
    )
  })
}

// eslint-disable-next-line complexity
const getRunningSSMConnectedEC2Instances = async (profile: string): Promise<{name: string; value: string}[]> => {
  const SSMManagedEC2Instances = await getSSMManagedEC2Instances(profile)
  const ec2InstanceIds: string[] = []
  const describeInstances: EC2.DescribeInstancesResult[] = []
  const reservations: EC2.ReservationList[] = []
  const responses: {name: string; value: string}[] = []

  if (SSMManagedEC2Instances.length === 0) {
    describeInstances.push(
      await describeEC2Instances(
        {
          Filters: [
            {
              Name: 'instance-state-name',
              Values: ['running'],
            },
          ],
        },
        profile,
      ),
    )
  } else {
    for (const SSMManagedEC2Instance of SSMManagedEC2Instances) {
      if (SSMManagedEC2Instance.PingStatus === 'Online' && SSMManagedEC2Instance.ResourceType === 'EC2Instance') {
        ec2InstanceIds.push(SSMManagedEC2Instance.InstanceId)
      }
    }

    const describeInstancesPromises: Promise<EC2.DescribeInstancesResult>[] = []
    const maxFilterValues = AWS_SSM_MAX_INSTANCES - 1
    const n = ec2InstanceIds.length
    const numBatches = n / maxFilterValues

    for (let i = 0; i < numBatches; i++) {
      const start = i * maxFilterValues
      let end = start + maxFilterValues

      if (end > n) {
        end = n
      }

      const instancesFilter = {
        Filters: [
          {
            Name: 'instance-state-name',
            Values: ['running'],
          },
          {
            Name: 'instance-id',
            Values: ec2InstanceIds.slice(start, end),
          },
        ],
      }

      describeInstancesPromises.push(describeEC2Instances(instancesFilter, profile))
    }

    describeInstances.push(...(await Promise.all(describeInstancesPromises)))
  }

  for (const describeInstance of describeInstances) {
    if (describeInstance.Reservations && describeInstance.Reservations.length > 0) {
      reservations.push(describeInstance.Reservations)
    }
  }

  for (const reservation of reservations) {
    for (const rData of reservation) {
      if (!rData.Instances) continue

      for (const instance of rData.Instances) {
        if (!instance.Tags) continue

        const instanceId = instance.InstanceId || ''
        let name = ''
        let user = ''
        for (const tag of instance.Tags) {
          // eslint-disable-next-line max-depth
          if (tag.Key === 'Name') {
            name = tag.Value || ''
          }

          // eslint-disable-next-line max-depth
          if (tag.Key === 'StagingUser') {
            user = tag.Value || ''
          }
        }

        if (name && user) responses.push({value: instanceId, name: `(${instanceId}) - ${name} - ${user}`})
        else if (name) responses.push({value: instanceId, name: `[${instanceId}] - ${name}`})
        else responses.push({value: instanceId, name: `${instanceId}`})
      }
    }
  }

  return responses
}

const createSSMSession = async (request: StartSessionRequest, profile: string): Promise<StartSessionResponse> => {
  const sessionManager: SSM = new SSM({credentials: await getCredentials(profile), region: getRegion(profile)})
  return new Promise((resolve, reject) => {
    sessionManager.startSession(request, (err: AWSError, data: StartSessionResponse) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

const terminateSSMSession = async (sessionID: string, profile: string): Promise<SSM.SessionId> => {
  const sessionManager: SSM = new SSM({credentials: await getCredentials(profile), region: getRegion(profile)})
  const terminateSessionRequest: TerminateSessionRequest = {
    SessionId: sessionID,
  }
  return new Promise((resolve, reject) => {
    sessionManager.terminateSession(terminateSessionRequest, (err: AWSError, data: TerminateSessionResponse) => {
      if (err) {
        reject(err)
      }

      resolve(data.SessionId || '')
    })
  })
}

export {getRunningSSMConnectedEC2Instances, getRegion, getCredentials, createSSMSession, terminateSSMSession}
