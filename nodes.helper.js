const allNodesToCreate = []

function createEntityNode (
  type,
  { createNodeId, createContentDigest, createNode },
) {
  return (item, parent) => {
    const node = {
      ...item,
      id: createNodeId(type + `-` + (item.id || item.slug || item.name)),
      originalId: item.id || item.slug || item.name,
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest: createContentDigest(item),
      },
    }
    createParentChildLink(parent, node)
    allNodesToCreate.push(node)

    return node
  }
}

function createParentChildLink (parent, child) {
  if (parent && child) {
    child.parent = parent.id
    parent.children.push(child.id)
  }
}

function findNode (type, callback) {
  const allTypeNodes = allNodesToCreate.filter(
    node => node.internal.type === type,
  )

  return allTypeNodes.find(callback)
}

function createAllNodes ({actions: {createNode}}) {
  return Promise.all(
    allNodesToCreate.map(node => {
      return createNode(node)
    }),
  )
}

module.exports = {
  createEntityNode,
  createParentChildLink,
  findNode,
  createAllNodes,
}
