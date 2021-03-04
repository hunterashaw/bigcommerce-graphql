# BigCommerce GraphQL Client

Simple GraphQL client for the cornerstone theme. Automatically handles authorization & cleans result data of "edges" and "nodes" to allow simpler data access.

## Installation

`npm i bigcommerce-graphql`

This will automatically make changes to the `templates/layout/base.html` & `templates/layout/empty.html` files by adding a handlebar JSON GraphQL token for authentication.

## Usage

### Import

At the top of the JS file:

`import get from 'bigcommerce-graphql'`

### Promise-Based Query

```javascript
    get('{ site { categoryTree { name } } }').then((data) => {
        console.log(data)
    })
```

### Async/Await Query

Using async/await within the default cornerstone theme will produce an error unless you install the following babel plugin:

https://babeljs.io/docs/en/babel-plugin-transform-runtime

```javascript
    async function getData(){
        console.log(await get('{ site { categoryTree { name } } }'))
    }
```

### "Cleaning" behavior

After the data is returned, it will be "cleaned" to remove any "edges" or "nodes" properties. This allows for simpler data access.

This behavior can be turned off (if access to the cursor values is needed) by passing false as the second parameter: `get(query, false)`

#### Example

Input query: `{ site { products (first:3, after:"") { edges { node { name } } } } }`

Output from GraphQL server:
```
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "name": "Product A"
            }
          },
          {
            "node": {
              "name": "Product B"
            }
          },
          {
            "node": {
              "name": "Product C"
            }
          }
        ]
      }
    }
  }
}
```

Output from get(query):
```
{
    site:{
        products:[
            { name:"Product A" },
            { name:"Product B" },
            { name:"Product C" }
        ]
    }
}
```

Output from get(query, false):
```
{
    site: {
        products: {
            edges: [
                { node : { name :"Product A" } },
                { node : { name :"Product B" } },
                { node : { name :"Product C" } },
            ]
        }
    }
}
```
