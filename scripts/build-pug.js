'use strict';
const upath = require('upath');
const sh = require('shelljs');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8'));

sh.find(srcPath).forEach(filePath => {
    if (
        filePath.match(/\.pug$/) && 
        !filePath.match(/include/) && 
        !filePath.match(/mixin/) && 
        !filePath.match(/\/pug\/layouts\//)
    ) {
        renderPug(filePath, { projects: projectsData }); // Assuming renderPug accepts a second parameter for data
    }
});
