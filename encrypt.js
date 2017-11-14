const fs = require('fs');

const MonoAlphabeticCipher = require('text-ciphers').MonoAlphabeticCipher;

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

function error(err) {
    if (err) throw err;
}

function encryptText(text, dict, key, concat1, concat2) {

    text = cleanText(text);

    // split into words
    let split = text.split(' ');

    // replace the with one of the others
    const thes = ["the1", "the2", "the3", "the4"];
    let the_counter = 0;
    split = split.map(x => {
        if (x === "the") {
            the_counter++;
            return thes[the_counter % 4];
        } else {
            return x;
        }
    })

    // get only unique words
    const unique = new Set(split);
    // fs.writeFile("out/intermediate/unique_words.txt", Array.from(unique), error); 

    // get some other words from Moby Dick
    dict = dict.split("\n")
    let moby_words = getNonOverlappingMoby(dict, unique);

    // construct mapping
    let mapping = {}
    unique.forEach(x => {
        mapping[x] = moby_words.shift();
    });
    // fs.writeFile("out/intermediate/mapping.txt", JSON.stringify(mapping, null, '\t'), error); 

    let ciphered = split.map(x => {
        return mapping[x]
    });

    let joined = ciphered.join(" ");
    let appended = String.prototype.concat(concat1, joined, concat2);
    // fs.writeFile("out/intermediate/word_subsitution.txt", appended, error); 

    const monoalphabeticCipher = new MonoAlphabeticCipher({
        substitution: MonoAlphabeticCipher.createKey(key),
        preserveSpaces: true
    });

    const enciphered = monoalphabeticCipher.encipher(appended);

    return enciphered;
}

function getNonOverlappingMoby(dict, overlap_set) {
    let length = overlap_set.size;

    let res = [];
    for (let i = 0; i < overlap_set.size; i++) {
        if (dict[i] != overlap_set[i]) {
            res.push(dict[i]);
        }
    }
    return res;
}

function cleanText(text) {
    return text
        .trim() // trim some spaces
        .replace(/(?:\r\n|\r|\n)/g, ' ') // strip newlines
        .replace(/(?:\.|;|,|\)|\(|\')/g, '') // strip punctuation
        .replace("—", ' ')
        .toLowerCase();
}