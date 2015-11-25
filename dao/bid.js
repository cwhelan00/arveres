/**
 * @module arveres/dao/bid
 */

'use strict';

var Database = require('../db');
var ObjectId = require('mongoose').mongo.ObjectID;

var async = require('async');

var Bid = {
  create: create,
  findById: findById,
  findByItem: findByItem,
  findTopByItem: findTopByItem,
  findByUser: findByUser
};

/**
 * Creates a bid entry in the database
 * @param {string} userId
 * @param {string} itemId
 * @param {function} cb
 */
function create(userId, itemId, amount, cb) {
  var entry = {
    id: new ObjectId().toString(),
    userId: userId,
    itemId: itemId,
    amount: amount,
    date: new Date().getTime()
  };

  Database.db.insert('bids', entry, cb);
}

/**
 * Finds bid row by id
 * @param {string} id
 * @param {function} cb
 */
function findById(id, cb) {
  Database.db
    .select('bids')
    .where({id: id})
    .exec(cb);
}

/**
 * Finds bid rows by item
 * @param {string} itemId
 * @param {function} cb
 */
function findByItem(itemId, cb) {
  Database.db
    .select('bids')
    .where({itemId: itemId})
    .exec(cb);
}

/**
 * Finds top bid row by item
 * @param {string} itemId
 * @param {function} cb
 */
function findTopByItem(itemId, limit, cb) {
  if(typeof limit === 'function') {
    cb = limit;
    limit = 1;
  }

  Database.db
    .select('bids')
    .where({itemId: itemId})
    .orderBy('date')
    .limit(limit)
    .exec(cb);
}

/**
 * Funds bid rows by user
 * @param {string} userId
 * @param {function} cb
 */
function findByUser(userId, cb) {
  Database.db
    .select('bids')
    .where({userId: userId})
    .exec(cb);
}

module.exports = Bid;
