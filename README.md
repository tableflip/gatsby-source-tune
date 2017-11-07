# gatsby-source-tune

Gatsby plugin to expose TUNE data as GraphQL nodes.

Creates `Facts` and `*Content` nodes and `FactsSchema` and `*Schema` nodes.

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
  homeContent {
    content
    for
    home
    page
  }
  homeSchema {
    schema
    for
    home
    page
  }
  aboutContent {
    content
    for
    about
    page
  }
  aboutSchema {
    schema
    for
    about
    page
  }
}
```
