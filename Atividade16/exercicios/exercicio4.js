const fs = require('fs');
let data = fs.readFileSync('file.txt', 'utf8').split("\n");
console.log(data.toString());