# gatsby-source-yuidoc
## Description
A gatsby source plugin for Yuidoc

It will set Yuidoc data into graphql nodes.

You can find all the annotations in the [YUIDoc Syntax Reference](http://yui.github.io/yuidoc/syntax/index.html) page

### Dependencies (optional)
* [yuidocjs](https://www.npmjs.com/package/yuidocjs)

## How to install and init
 * `yarn add | npm install gatsby-source-yuidoc`
 * In gatsby-config.js:
 ```javascript
{
  plugins: [
    {
      resolve: `gatsby-source-yuidoc`,
      options: {
        paths: [path.resolve(__dirname, `/path`)],
        exclude: path.resolve(__dirname, `/path/to_exclude`),
      },
    },
  ],
}
```

## Available options and their default values 
Options used in [YUIDoc Class](https://yui.github.io/yuidoc/api/classes/YUIDoc.html#property_OPTIONS)
merged with plugin options:

| Option        | Definition                                                                   | Default value |
|---------------|------------------------------------------------------------------------------|---------------|
| baseUrl       | If provided, will generate an url for each node                              | ``            |
| allowNoParent | If false, the plugin will not create nodes without parents, except DocModule | true          |

```javascript
{
    quiet: false,
    writeJSON: true,
    outdir: path.join(process.cwd(), 'out'),
    extension: '.js',
    exclude: '.DS_Store,.svn,CVS,.git,build_rollup_tmp,build_tmp,node_modules',
    norecurse: false,
    version: '0.1.0',
    paths: [],
    themedir: path.join(__dirname, 'themes', 'default'),
    syntaxtype: 'js',
    baseUrl: `/documentation`,
    allowNoParent: true,
}
```

## Nodes
This plugin will generate nodes described in [types.js](./types.js):

* DocModule
* DocClass
* DocMethod

#### Relations
| Parent    | Children  |
|-----------|-----------|
| /         | DocModule |
| DocModule | DocClass  |
| DocClass  | DocMethod |

#### Url
Each node has a generated url if the config `baseUrl` is provided

| Node      | Url                                                                  |
|-----------|----------------------------------------------------------------------|
| DocModule | \`${baseUrl}/${DocModule.name}/\`                                    |
| DocClass  | \`${baseUrl}/${DocModule.name}/${DocClass.name}/\`                   |
| DocMethod | \`${baseUrl}/${DocModule.name}/${DocClass.name}/#${DocMethod.name}\` |

## How to query for data
```graphql
query MyDoc {
  allDocModule {
    nodes {
      name
      childrenDocClass {
        name
        childrenDocMethod {
          name
        }
      }
    }
  }
}
```

## How to run tests
lint: yarn lint

## How to contribute
If you'd like to contribute any changes simply fork the project on Github and send a pull request.
