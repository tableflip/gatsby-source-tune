# gatsby-source-tune

Gatsby plugin to expose TUNE data as GraphQL nodes.

Creates `Facts` and `Content` nodes and `FactsSchema` and `Schema` nodes.

## Install

`npm install --save gatsby-source-tune`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-tune',
    options: {
      name: 'tune',
      path: `${__dirname}/` // Default process.cwd()
    }
  }
]
```

## How to query

You can query file nodes like the following:

```graphql
{
  facts {
    some
    facts
    props
  }
  factsSchema {
    some
    schema
    props
  }
  homeContent: content(page: { eq: "home" }) {
    content
    for
    home
    page
  }
  homeSchema: schema(page: { eq: "home" }) {
    schema
    for
    home
    page
  }
  aboutContent: content(page: { eq: "about" }) {
    content
    for
    about
    page
  }
  aboutSchema: schema(page: { eq: "about" }) {
    schema
    for
    about
    page
  }
}
```
