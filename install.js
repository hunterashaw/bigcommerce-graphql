const fs = require('fs')

try {
    const base = fs.existsSync('../../templates/layout/base.html') ? fs.readFileSync('../../templates/layout/base.html', 'utf8') : undefined
    const empty = fs.existsSync('../../templates/layout/empty.html') ? fs.readFileSync('../../templates/layout/empty.html', 'utf8') : undefined

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

    if (base !== undefined) fs.writeFileSync('../../templates/layout/base.html', install(base))
    if (empty !== undefined) fs.writeFileSync('../../templates/layout/empty.html', install(empty))
} catch (e){
    console.error(e.message)
    console.error('bigcommerce-graphql install failed. Check output above. Please manually install the following token into layout files:')
    console.log('<script id="BC_GraphQL_Token" type="application/json">"{{settings.storefront_api.token}}"</script>')
}

