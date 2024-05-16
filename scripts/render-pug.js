'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');

module.exports = function renderPug(filePath, data) {
    // Compile the Pug template using the filePath and data
    const compiledFunction = pug.compileFile(filePath);
    const html = compiledFunction(data);

    // Define the output path for the generated HTML
    const outputPath = upath.join(__dirname, '../dist', upath.basename(filePath, '.pug') + '.html');

    // Ensure the destination directory exists
    const destPathDirname = upath.dirname(outputPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    // Format the HTML using Prettier before writing to the file
    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    // Write the formatted HTML to the output path
    fs.writeFileSync(outputPath, prettified);
};
