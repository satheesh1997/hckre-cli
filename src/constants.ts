import os = require('os')

export const CLI_STORAGE: string = os.homedir + '/.hckre'
export const AWS_CREDENTIALS_STORAGE: string = os.homedir + '/.aws'
export const AWS_SSM_MAX_INSTANCES = 200

export const DEFAULT_AWS_CONFIG = `[profile SupportUserAccess-981015344048]
sso_start_url = https://hackerearth.awsapps.com/start
sso_region = ap-southeast-1
sso_account_id = 981015344048
sso_role_name = SupportUser
region = ap-southeast-1
output = json
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
