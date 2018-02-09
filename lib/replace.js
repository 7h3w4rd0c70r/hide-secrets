const { baseReplace } = require('../.internal/baseReplace');

/**
 * @since 0.0.1
 * @param {Object} object The source object.
 * @param {string|string[]} paths Path(s) to properties to be replaced.
 * @param {string} [replacedValue] The value to be put insted of secret.
 * @returns {object} Returns `object`.
 * @example
 * 
 * const obj = { username: 'abc', password: '123' };
 * 
 * replace(obj, ['password'], '[CONFIDENTIAL]');
 * // => { username: 'abc', password: '[CONFIDENTIAL]' }
 */
function replace(obj, paths, replacedValue) {
    const _paths = paths || [];
    const _replacedValue = replacedValue || null;
    const isDeep = false;

    return baseReplace(obj, {
        isDeep,
        replacedValue: _replacedValue,
        usePropType: _replacedValue === null ? true : false,
        paths: _paths instanceof Array ? _paths : [_paths],
    });
};

module.exports = replace;