module.exports = `
    type DocModule implements Node {
        description: String
        extends: String
        file: String!
        itemtype: String
        line: String!
        name: String!
        originalId: String!
        shortName: String!
        tag: String
        url: String!
    }
    type DocClass implements Node {
        name: String!
        extends: String
        description: String
        file: String!
        line: String!
        module: String
        namespace: String
        originalId: String!
        shortname: String
        url: String!
    }
    type Param {
        description: String
        name: String!
        optdefault: String
        optional: Boolean
        type: String
    }
    type Return {
        description: String
        type: String
    }
    type Throw {
        description: String
        type: String
    }
    type DocMethod implements Node {
      class: String
      description: String
      file: String!
      is_constructor: Boolean!
      itemtype: String
      line: String!
      module: String
      name: String!
      originalId: String!
      static: Boolean!
      url: String
      params: [Param]
      return: Return
      throws: [Throw]
    }
`
