/**
 *  @module arveres/dao/item
 */

'use strict';

var Database = require('../db');
var ObjectID = require('mongoose').mongo.ObjectID;

var Item = {
  create: create,
  findById: findById,
  // findByAuction: findByAuction,
  findByTitle: findByTitle
}

/**
 *  Creates an Item entry in the database
 *
 *  @param {string} title - title of item being auctioned
 *  @param {string} image - name of image file
 *  @param {string} description - details of item
 *  @param {function} cb - a callback function
 */
function create(title, image, description, cb){
  var item = {
    id: new ObjectID().toString(),
    title: title,
    image: image,
    description: description
  };

  Database.db.insert('items', item, cb);
}

/**
 *  Retrieves an Item row matching the id given
 *
 *  @param {string} id - the id of Item to retrieve
 *  @param {function} cb - a callback function
 */
function findById(id, cb){
  Database.db.select('items')
    .where({id: id})
    .exec(cb);
}

/**
 *  Retrieves Items matching the specified title
 *
 *  @param {string} title - the title of the Item to retrieve
 *  @param {function} cb - a callback function
 */
function findByTitle(title, cb){
  Database.db.select('items')
    .where({title: title})
    .exec(cb);
}

// /**
//  *  Retrieves Items matching the specified auction
//  *
//  *  @param {string} auctionId - the auction id to find
//  *  @param {function} cb - a callback function
//  */
// function findByAuction(auctionId, cb){
//
// }

module.exports = Item;
