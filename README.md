# metalsmith-collection-grouping

A Metalsmith plugin for grouping collections by a property.

# Installation

```sh
$ npm install metalsmith-collection-grouping --save
```

# Usage

```js
var Metalsmith = require('metalsmith')
var collectionGrouping = require('metalsmith-collection-grouping')

var metalsmith = new Metalsmith(__dirname)
  .use(collectionGrouping({
    posts: {
      groupBy: 'category',
      meta: 'posts/categories.json'
    },
    projects: {
      groupBy: 'year',
      meta: {
        2014: {
          title: 'Projects from 2014'
        },
        2014: {
          title: 'Projects from 2014'
        }
      }
    }
  })
```

The `meta` property can either accept properties inline or through a json file.

The groups will be available as part of the `Metalsmith.metadata()`, this plugin
**does not** modify the collections, they will remain as-is.