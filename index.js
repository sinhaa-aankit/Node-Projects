const fs = require('fs');

const textIn = fs.readFileSync('./README.md', 'utf-8');

console.log(textIn);

const textOut = `${textIn}. \n Created on ${Date.now()}`;

fs.writeFileSync('./README.md', textOut);