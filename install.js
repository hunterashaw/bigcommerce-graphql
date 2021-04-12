const fs = require('fs')

const installation = '<script id="BC_GraphQL_Token" type="application/json">"{{settings.storefront_api.token}}"</script>'

function install(contents){
    if (contents.includes(installation)) {
        console.log('Already installed.')
        return contents
    }

    const splitter = contents.match(/<body.*>/)

    if (splitter === null) {
        console.log('No body tag found. Not installing.')
        return contents
    }

    const parts = contents.split(splitter)

    console.log('Installing.')
    return `${parts[0]}
${splitter}${installation}
${parts[1] !== undefined ? parts[1] : ''}`
}

try {
    const files = fs.readdirSync('../../templates/layout/')
    for (const file of files) {
        console.log(`Checking installation in templates/layout/${file}:`)
        fs.writeFileSync(`../../templates/layout/${file}`, install(fs.readFileSync(`../../templates/layout/${file}`, 'utf-8')))
    }
} catch (e) {
    console.error(e.message)
    console.error('bigcommerce-graphql install failed. Check output above. Please manually install the following token into all layout files after the <body> tag:')
    console.log(installation)
}