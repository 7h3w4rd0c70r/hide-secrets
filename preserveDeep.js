const { basePreserve } = require('./.internal/basePreserve');

/**
 * @since 0.0.1
 * @param {Object} object The source object.
 * @param {string|string[]} paths Path(s) to properties to be preserved.
 * @param {string} [replacedValue] The value to be put insted of secret.
 * @returns {object} Returns `object`.
 */
function preserveDeep(obj, paths, replacedValue) {
    const _paths = paths || [];
    const _replacedValue = replacedValue || null;
    const isDeep = true;

    return basePreserve(obj, {
        isDeep,
        replacedValue: _replacedValue,
        usePropType: _replacedValue === null ? true : false,
        paths: _paths instanceof Array ? _paths : [_paths],
    });
};

module.exports = preserveDeep;