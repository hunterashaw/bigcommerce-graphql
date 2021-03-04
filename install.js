const fs = require('fs')

const base = fs.readFileSync('../../templates/layout/base.html', 'utf8')
const empty = fs.readFileSync('../../templates/layout/empty.html', 'utf8')

const installation = '<script id="BC_GraphQL_Token" type="application/json">"{{settings.storefront_api.token}}"</script>'

function install(contents){
    if (contents.includes(installation)) return contents

    const splitter = contents.match(/<body.*>/)

    const parts = contents.split(splitter)

    return `${parts[0]}
    ${splitter}
        ${installation}
    ${parts[1]}`
}

fs.writeFileSync('../../templates/layout/base.html', install(base))
fs.writeFileSync('../../templates/layout/empty.html', install(empty))