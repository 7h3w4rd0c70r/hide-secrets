const _ = require('lodash');
const getTag = require('lodash/_getTag');

/**
 * @since 0.0.1
 * @param {Object} object The source object.
 * @param {Object} options Preserve options.
 * @param {string[]} [options.paths] Paths to properties to preserve.
 * @param {boolean} [options.isDeep] Use deep flag.
 * @param {string} [options.replacedValue] Value to be put insted of secret.
 * @param {boolean} [options.usePropType] Use property type as value to be put insted of secret.
 * @returns {object} Returns `object`.
 */
function basePreserve(obj, options) {
    let _obj = _.cloneDeep(obj);

    const paths = options.paths || [];
    const isDeep = options.isDeep || false;
    const replacedValue = options.replacedValue || null;
    const usePropType = options.usePropType || true;

    if (isDeep) {
        for (const i in _obj) {
            if (_obj[i] instanceof Object) {
                _obj[i] = basePreserve(_obj[i], options);
            } else if (paths.indexOf(i) < 0) {
                const newVal = replacedValue;
                if (usePropType) {
                    newVal = getTag(val);
                }
                _obj[i] = newVal;
            }
        }
    } else {
        const origialValues = [ ];
        paths
            .forEach(path => {
                const value = _.get(_obj, path);
                if (value !== void 0) {
                    origialValues.push({ path, value });
                }
            });
        _obj = basePreserve(_obj, {
            replacedValue,
            usePropType,
            isDeep: true,
            paths: [],
        });
        origialValues
            .forEach(origialValue => {
                _.set(_obj, origialValue.path, origialValue.value);
            });
    }
    
    return _obj;
};

exports.basePreserve = basePreserve;