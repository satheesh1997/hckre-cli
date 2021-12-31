import os = require('os')

export const CLI_STORAGE: string = os.homedir + '/.hckre'
export const AWS_CREDENTIALS_STORAGE: string = os.homedir + '/.aws'

export const DEFAULT_AWS_CONFIG = `[profile Singapore-SupportAccess]
sso_start_url = https://hackerearth.awsapps.com/start
sso_region = ap-southeast-1
sso_account_id = 981015344048
sso_role_name = SupportUser
region = ap-southeast-1
output = json

[profile Singapore-PowerAccess]
sso_start_url = https://hackerearth.awsapps.com/start
sso_region = ap-southeast-1
sso_account_id = 981015344048
sso_role_name = PowerUserAccess
region = ap-southeast-1
output = json

[profile Mumbai-AdministratorAccess]
sso_start_url = https://hackerearth.awsapps.com/start
sso_region = ap-southeast-1
sso_account_id = 049744324789
sso_role_name = AdministratorAccess
region = ap-south-1

[profile Mumbai-SupportAccess]
sso_start_url = https://hackerearth.awsapps.com/start
sso_region = ap-southeast-1
sso_account_id = 049744324789
sso_role_name = SupportUser
region = ap-south-1
`
