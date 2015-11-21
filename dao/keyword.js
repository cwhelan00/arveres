/**
 * @module arveres/dao/keyword
 */

'use strict';

var Database = require('../db');
var ObjectId = require('mongoose').mongo.ObjectID;
//var Auction = require('./auction');

var async = require('async');

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

  Database.db.insert('keywords', entry, cb);
}

/**
 * Finds keyword row by id
 * @param {string} id
 * @param {function} cb
 */
function findById(id, cb) {
  Database.db
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
  Database.db
    .select('keywords')
    .where('keyword = ' + word)
    .exec(cb);
}

///**
// * Finds keyword rows by auction
// * @param {string} auctionId
// * @param {function} cb
// */
//function findByAuction(auctionId, cb) {
//  Database.db
//    .select('hasKeyword')
//    .where('auctionId = ' + auctionId)
//    .exec(function(err, rows) {
//      if(err) {
//        return cb(err);
//      }
//
//      async.map(rows, Auction.findById, cb);
//    });
//}

module.exports = Keyword;