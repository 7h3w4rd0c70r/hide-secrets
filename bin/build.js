
const path = require('path')
const fs = require('fs')

;;(function build() {
    const files = fs.readdirSync(path.resolve(__dirname, '../lib'))
    let indexContent = ''

    files
        .forEach(fileName => {
            if (/\.js$/.test(fileName)) {
                indexContent += `exports.${fileName.replace('.js', '')} = require('./lib/${fileName}');\n`
            }
        })

    fs.writeFileSync(path.resolve(__dirname, '../index.js'), indexContent)
}());

