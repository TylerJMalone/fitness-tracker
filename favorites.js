const fs = require('fs');


function saveItem(string) {
    fs.appendFile('favorites.json', string);
}

module.exports = saveItem;