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
        const hasEdge = !!data[property].edges

        if (hasEdge)
            data[property] = data[property].edges.map((element) => element.node)

        const isObject = typeof data[property] === 'object'
        const isArray = Array.isArray(data[property])

        if (isObject && !isArray)
            clean(data[property])

        if (isArray) {
            for (const i of data[property])
                clean(i)
        }
    }

    return data
}

module.exports = get
