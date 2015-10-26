/**
 * @module arveres/db
 */

'use strict';

var sheetsdb = require('sheetsdb');

var id = '1tKsA2FV0wi6C21-YOSP-ucxXkpB0vBykkBpA-URbgY0';
var creds = require('./arveres-9adfc0a00a23.json');

var Database = {
  connect: connect
};

/**
 * Connects to a Google Sheet Database
 * @param {function} cb
 */
function connect(cb) {
  sheetsdb.connect(id, creds, function(err, db) {
    if(err) {
      return cb(err);
    }

    Database.db = db;
    cb();
  });
};

module.exports = Database;
