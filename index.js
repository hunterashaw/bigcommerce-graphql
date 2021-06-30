const token = JSON.parse(document.getElementById('BC_GraphQL_Token').textContent)

/**
 * Performs a GraphQL query and returns a cleaned result of the data (removes edges & nodes from arrays).
 * @async
 * @param {string} query GraphQL query without 'query' keyword. Example: `{ site { categoryTree { name } } }`
 */
async function get(query, removeEdges=true) {
    const response = await fetch('/graphql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({query})
    });

    if (response.ok) {
        const { data } = await response.json()

        return removeEdges
            ? clean(data)
            : data
    } else
        throw Error(`GraphQL error ${response.status} - ${response.statusText}`)
}

function clean(data){
    for (let property in data){
        if (data[property] !== null){
            const hasEdge = !!data[property].edges
            const isObject = typeof data[property] === 'object'
            const isArray = Array.isArray(data[property])

            if (hasEdge){
                // Retain other properties like pageInfo within the parent in a concatenated property name
                for (const property_name in data[property]){
                    if (property_name !== 'edges'){
                        data[property + property_name] = data[property][property_name]
                    }
                }
                data[property] = data[property].edges.map((element) => element.node)
            }
            if (isObject || isArray)
                clean(data[property])
        }
    }

    return data
}

module.exports = get