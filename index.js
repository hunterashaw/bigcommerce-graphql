const token = JSON.parse(document.getElementById('BC_GraphQL_Token').textContent)

/**
 * Performs a GraphQL query and returns a cleaned result of the data (removes edges & nodes from arrays).
 * @async
 * @param {string} query GraphQL query without 'query' keyword. Example: `{ site { categoryTree { name } } }`
 */
async function get(query, removeEdges=true){
    const response = await fetch('/graphql', {
        method: 'post',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({query})
    });
    if (response.ok)
        return removeEdges ? clean((await response.json()).data) : (await response.json()).data
    else
        throw Error(`GraphQL error ${response.status} - ${response.statusText}`)
}

function clean(data){
    for (let property in data){
        if (data[property].edges !== undefined) {
            data[property]
            data[property] = data[property].edges.map((element)=>element.node)
        }
        else if (typeof data[property] === 'object' && !Array.isArray(data[property])) clean(data[property])
    }
    return data
}

module.exports = get