'use strict';

var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    forms = require('forms'),
    jsontemplate = require('./json-template'),
    encryptText = require('./encrypt.js');

const PORT = process.env.PORT || 3000;

let count = 0;
let limit_time = null;

var fields = forms.fields,
    validators = forms.validators,
    widgets = forms.widgets;

// template for the example page
var template = jsontemplate.Template(
    fs.readFileSync(__dirname + '/page.jsont').toString()
);

// our example registration form
var reg_form = forms.create({
    text: fields.string({ required: true, widget: widgets.textarea() })
});

http.createServer(function (req, res) {
    reg_form.handle(req, {
        success: function (form) {
            fs.readFile('secret/dict.txt', 'utf8', function(err, dict) {
                fs.readFile('secret/key.txt', 'utf8', function(err, key) {
                    fs.readFile('secret/concat1.txt', 'utf8', function(err, concat1) {
                        fs.readFile('secret/concat2.txt', 'utf8', function(err, concat2) {
                            let text;
                            if (limit_time && Date.now() > limit_time + 600000) {
                                count = 0;
                                limit_time = null;
                            }
                            if (count > 500) {
                                text = "Hey there! What do you think you're doing, trying to brute force a solution? That's not cool. (Or maybe another group did that and ruined it for everyone). Go take a break and come back in a bit :)";
                                if (!limit_time) {
                                    limit_time = Date.now();
                                }
                            } else {
                                text = encryptText(form.data.text, dict, key, concat1, concat2);
                                count++;
                            }
                            setTimeout(() => {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<p><strong>Encrypted text:</strong></p>');
                                res.end('<p style="width:500px">' + text + '</p>');
                            }, count * 10);
                        });
                    });
                });
            });
            
        },
        // perhaps also have error and empty events
        other: function (form) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(template.expand({
                form: form.toHTML(),
                enctype: '',
                method: 'GET'
            }));
        }
    });

}).listen(PORT);

function error(err) {
    if (err) throw err;
}