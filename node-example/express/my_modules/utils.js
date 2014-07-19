'use strict';
var crypto = require('crypto'),
    password = 'v4RkWMfaA8SF';

var encrypt = function (text) {
    var cipher = crypto.createCipher('aes-256-cbc', password),
        crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');
    return crypted;
};

var decrypt = function (text) {
    var decipher = crypto.createDecipher('aes-256-cbc', password),
        dec = decipher.update(text, 'hex', 'utf8');

    dec += decipher.final('utf8');
    return dec;
};

exports.encrypt = encrypt;
exports.decrypt = decrypt;