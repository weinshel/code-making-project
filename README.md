# Group Projects in Cryptography and Cryptananalysis

- Caleb Bacos
- Manasvi Sagarkar
- Clare Ulmer
- Ben Weinshel

# Running the code

## Installing Dependencies

You will need [node.js](http://nodejs.org/) installed.

## Secret Files

You will need 4 files that encompass the keys in order to run the code:

- `secret/in.txt` is the text to encode
- `secret/concat1.txt` and `secret/concat2.txt` contain some text
- `secret/dict.txt` contains some words
- `secret/key.txt` contains some type of key

## Running 

```
node encrypt.js
```

Generates `out/encrypted.txt` with the encrypted text.