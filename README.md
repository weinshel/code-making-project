# Code Making Project

Group Project in Cryptography and Cryptananalysis for LING 26040 Fall 2017. We designed an algorithm to encipher a passage, and then other groups in the classed were challenged with breaking our code.

Code written by Ben Weinshel, cipher algorithm designed by Caleb Bacos, Manasvi Sagarkar, Clare Ulmer and Ben Weinshel.

# Running the code

## Installing dependencies

You will need [node.js](http://nodejs.org/) installed. Then run `npm install` to install dependencies.

## Secret files

You will need 4 files that encompass the keys in order to run the code:

- `secret/in.txt` is the text to encode
- `secret/concat1.txt` and `secret/concat2.txt` contain some text
- `secret/dict.txt` contains some words
- `secret/key.txt` contains some type of key

## Command-line version

```
$ node cli.js
```

Prints encrypted text given input files in proper locations.

## Web version

```
$ node web.js
```

Runs rudimentary web interface that lets you input plaintext and produces ciphertext. By default uses `http://localhost:3000`.