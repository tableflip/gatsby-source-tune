# gatsby-source-tune

Plugin for creating `File` nodes from the file system. The various
"transformer" plugins transform `File` nodes into various other types of data
e.g. `gatsby-transformer-json` transforms JSON files into JSON data nodes and
`gatsby-transformer-remark` transforms markdown files into `MarkdownRemark`
nodes from which you can query an HTML representation of the markdown.

## Install

`npm install --save gatsby-source-tune`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-tune',
    options: {
      name: 'tuneData',
      path: `${__dirname}/`, // Default process.cwd()
    },
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
