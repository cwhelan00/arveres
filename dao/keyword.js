/**
 * @module arveres/doa/keyword
 */

var db = require('../db').db;
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var Keyword = {
  create: create,
  findById: findById,
  findByKeyword: findByKeyword
};

/**
 * Creates a keyword entry in database
 * @param {string} keyword
 * @param {function} cb
 */
function create(keyword, cb) {
  var entry = {
    id: new ObjectId().toString(),
    keyword: keyword
  };

  db
    .insert('keywords', entry)
    .exec(cb);
}

/**
 * Finds keyword row by id
 * @param {string} id
 * @param {function} cb
 */
function findById(id, cb) {
  db
    .select('keywords')
    .where('id = ' + id)
    .exec(cb);
}

/**
 * Finds keyword row by keyword
 * @param {string} keyword
 * @param {function} cb
 */
function findByKeyword(word, cb) {
  db
    .select('keywords')
    .where('keyword = ' + word)
    .exec(cb);
}

module.exports = Keyword;
