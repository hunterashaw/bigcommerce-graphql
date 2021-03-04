const token = JSON.parse(document.getElementById("BC_GraphQL_Token").text).token

console.log('BC GQL Token:', token)

export async function getQuery(query){
    const response = await fetch('/graphql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
    })
    if (response.ok)
        return (await response.json()).data
    throw Error(`GraphQL error ${response.status} - ${response.statusText}`)
}

/**
 * GraphQL product price options. Set other properties to true to retrieve their values.
 * @typedef {Object} prices
 * @property {boolean} price
 * @property {boolean} salePrice
 * @property {boolean} basePrice
 * @property {boolean} retailPrice
 * @property {boolean} minPrice
 * @property {boolean} maxPrice
 * @property {boolean} saved
 * 
 */

/**
 * GraphQL product options. Requires either id or sku to get product. Set other properties to true to retrieve their values.
 * @typedef {Object} product
 * @property {int} id Product ID
 * @property {string} sku Product SKU
 * @property {boolean} name
 * @property {boolean} description
 * @property {boolean} minPurchaseQuantity
 * @property {boolean} maxPurchaseQuantity
 * @property {boolean} addToCartUrl
 * @property {boolean} addToWishlistUrl
 * @property {boolean} prices
 * @property {boolean} weight
 * @property {boolean} height
 * @property {boolean} width
 * @property {boolean} depth
 * @property {prices} prices
 */

export async function getProduct(options){

}

export async function getProducts(options){

}