import os = require('os')

export const CLI_STORAGE: string = os.homedir + '/.hckre'
export const AWS_CREDENTIALS_STORAGE: string = os.homedir + '/.aws'

export const SUPPORTED_AWS_PROFILE_CHOICES: {name: string}[] = [
  {name: 'Singapore-PowerAccess'},
  {name: 'Singapore-SupportAccess'},
  {name: 'Mumbai-AdministratorAccess'},
  {name: 'Mumbai-SupportAccess'},
]

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

export const DARWIN_INSTALLER_CHOICES_DATA = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <array>
    <dict>
      <key>choiceAttribute</key>
      <string>customLocation</string>
      <key>attributeSetting</key>
      <string>${CLI_STORAGE}</string>
      <key>choiceIdentifier</key>
      <string>default</string>
    </dict>
  </array>
</plist>`
