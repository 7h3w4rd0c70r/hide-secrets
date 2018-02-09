const _ = require('lodash');
const getTag = require('lodash/_getTag');

/**
 * @since 0.0.1
 * @param {Object} object The source object.
 * @param {Object} options Replace options.
 * @param {string[]} [options.paths] Paths to properties to replace.
 * @param {boolean} [options.isDeep] Use deep flag.
 * @param {string} [options.replacedValue] Value to be put insted of secret.
 * @param {boolean} [options.usePropType] Use property type as value to be put insted of secret.
 * @returns {object} Returns `object`.
 */
function baseReplace(obj, options) {
    const _obj = _.cloneDeep(obj);

    const paths = options.paths || [];
    const isDeep = options.isDeep || false;
    const replacedValue = options.replacedValue || null;
    const usePropType = options.usePropType || true;

    if (isDeep) {
        for (const i in _obj) {
            if (paths.indexOf(i) > -1) {
                let newVal = replacedValue;
                if (usePropType) {
                    newVal = getTag(_obj[i]);
                }
                _obj[i] = newVal;
            } else if (_obj[i] instanceof Object) {
                _obj[i] = baseReplace(_obj[i], options);
            }
        }
    } else {
        paths
            .forEach(path => {
                const val = _.get(_obj, path);
                if (val !== void 0) {
                    let newVal = replacedValue;
                    if (usePropType) {
                        newVal = getTag(val);
                    }
                    _.set(_obj, path, newVal);
                }
            });
    }
    
    return _obj;
};

exports.baseReplace = baseReplace;