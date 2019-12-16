const yuidoc = require(`yuidocjs`)
const { createEntityNode, createAllNodes, findNode } = require(`./nodes.helper`)
const types = require(`./types`)

const defaultConfig = {
    quiet: true,
    writeJSON: false,
    paths: [process.cwd()],
    exclude: ``,
    baseUrl: `/documentation`,
    allowNoParent: true,
}

exports.sourceNodes = async (api, pluginOptions) => {
    const { reporter, actions: { createTypes } } = api
    const config = {
        ...defaultConfig,
        ...pluginOptions,
    }

    const yuidocResult = new yuidoc.YUIDoc(config).run()
    const { classitems, classes, modules } = yuidocResult

    if (Object.values(modules).length <= 0) {
        reporter.warn(`No module was found. Doc will not be generated`)

        return
    }

    //  prepare nodes
    const createDocModule = createEntityNode(`DocModule`, api)
    const createDocClass = createEntityNode(`DocClass`, api)
    const createDocMethod = createEntityNode(`DocMethod`, api)
    createTypes(types)

    for (const _module of Object.values(modules)) {
        const shortName = _module.name.split(`/`).pop()
        createDocModule({
            ..._module,
            shortName,
            ...(config.baseUrl ? { url: `${config.baseUrl}/${shortName.toLowerCase()}/` } : {}),
        })
    }

    for (const _class of Object.values(classes)) {
        const parent = findNode(`DocModule`, node => node.name === _class.module)
        if (!config.allowNoParent && !parent) {
            reporter.warn(
                `Class ${_class.name} was ignored because parent module (${_class.module}) was not found`,
            )
            continue
        }

        createDocClass({
            ..._class,
            ...(config.baseUrl ? { urll: parent ? `${parent.url}${_class.name.toLowerCase()}/` : `${config.baseUrl}/class/${_class.name.toLowerCase()}/` } : {}),
        }, parent)
    }

    for (const _method of Object.values(classitems)) {
        const parent = findNode(`DocClass`, node => node.name === _method.class)
        if (!config.allowNoParent && !parent) {
            reporter.warn(
                `Method ${_method.name} was ignored because parent class (${_method.class}) was not found`,
            )
            continue
        }
        const name = _method.is_constructor ? `constructor` : _method.name
        const lowerName = name.toLowerCase()
        createDocMethod({
            ..._method,
            name,
            is_constructor: !!_method.is_constructor,
            static: !!_method.static,
            params: _method.params || [],
            return: _method.return || {},
            ...(config.baseUrl ? { url: parent ? `${parent.url}#${lowerName}` : `${config.baseUrl}/method/${lowerName}/` } : {}),
        }, parent)
    }

    return createAllNodes(api)
}
