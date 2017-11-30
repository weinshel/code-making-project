const fs = require('fs');
const encryptText = require('./encrypt');

// file reading stuff
fs.readFile('secret/in.txt', 'utf8', function(err, input) {  
    fs.readFile('secret/dict.txt', 'utf8', function(err, dict) {
        fs.readFile('secret/key.txt', 'utf8', function(err, key) {
            fs.readFile('secret/concat1.txt', 'utf8', function(err, concat1) {
                fs.readFile('secret/concat2.txt', 'utf8', function(err, concat2) {
                    const encrypted = encryptText(input, dict, key, concat1, concat2);

                    // fs.writeFile("out/encrypted.txt", encrypted, error); 
                    console.log(encrypted);
                });
            });
        });
    });
});