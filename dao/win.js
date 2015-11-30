/**
 * @module arveres/dao/win
 */

'use strict';

var Database = require('../db');
var ObjectId = require('mongoose').mongo.ObjectID;

var async = require('async');

//var User = require('./user');
//var Item = require('./item');

var Win = {
  create: create,
  findById: findById,
  findByItem: findByItem,
  findByWinner: findByWinner,
  findBySeller: findBySeller
};

/**
 * Creates a win entry in the database
 * @param {string} winnerId
 * @param {string} sellerId
 * @param {string} itemId
 * @param {function} cb
 */
function create(winnerId, sellerId, itemId, cb) {
  var entry = {
    id: new ObjectId().toString(),
    winnerId: winnerId,
    sellerId: sellerId,
    itemId: itemId
  };

  Database.db.insert('wins', entry, cb);
}

/**
 * Finds win row by id
 * @param {string} id
 * @param {function} cb
 */
function findById(id, cb) {
  Database.db
    .select('wins')
    .where({id: id})
    .exec(cb);
}

/**
 * Finds win row by item
 * @param {string} itemId
 * @param {function} cb
 */
function findByItem(itemId, cb) {
  Database.db
    .select('wins')
    .where({itemId: itemId})
    .exec(cb);
}

/**
 * Finds win rows by winner
 * @param {string} winnerId
 * @param {function} cb
 */
function findByWinner(winnerId, cb) {
  Database.db
    .select('wins')
    .where({winnerId: winnerId})
    .exec(cb);
}

/**
 * Finds win rows by seller
 * @param {string} sellerId
 * @param {function} cb
 */
function findBySeller(sellerId, cb) {
  Database.db
    .select('wins')
    .where({sellerId: sellerId})
    .exec(cb);
}

///**
// * Populates wins with hold appropriate relations
// * @param {object} err
// * @param {array} rows
// */
//function populate(cb, err, rows) {
//  if(err) {
//    return cb(err);
//  }
//
//  async.map(rows, function(row, done) {
//    async.series({
//      winnerId: User.findById.bind(User, row.get('winnerId')),
//      sellerId: User.findById.bind(User, row.get('sellerId')),
//      itemId: Item.findById.bind(Item, row.get('itemId'))
//    }, done);
//  }, cb);
//}

module.exports = Win;
