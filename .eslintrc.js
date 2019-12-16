module.exports = {
    root: true,
    extends: ["standard",],
    rules: {
        quotes: [`error`, `backtick`],
        "no-console": [`error`, { allow: [`time`, `timeEnd`, `error`] }],
        "comma-dangle": [
            `error`,
            {
                arrays: `always-multiline`,
                objects: `always-multiline`,
                functions: `always-multiline`,
            },
        ],
        "template-curly-spacing": `off`,
        indent: `off`,
        "no-else-return": [`error`],
        "newline-before-return": [`error`],
    },
}
