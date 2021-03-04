const fs = require('fs')

const filePath = '../../templates/layout/base.html'

if (!fs.existsSync(filePath)) {console.log('GraphQL token install failed. File not found templates/layout/base.html');process.exit()}

const base = fs.readFileSync(filePath, 'utf8')

const bodyStart = '<body class="template_{{#replace '/' template_file}}-{{/replace}}">'

const split = base.split(bodyStart)

if (split.length < 2) {console.log('GraphQL token install failed. Couldnt find start of body tag in templates/layout/base.html');process.exit()}

const token = '\n        <script id="BC_GraphQL_Token" type="application/json">{"token":"{{settings.storefront_api.token}}"}</script>\n'

const newFile = split[0] + bodyStart + token + split[1]

fs.writeFileSync(filePath, newFile)