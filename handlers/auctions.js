/**
 * @module arveres/handlers/auctions
 */

'use strict';

var urlConfig = require('../config/url');

var AuctionsHandler = {
  getAuctions: getAuctions,
  getCreateAuction: getCreateAuction,
  postCreateAuction: postCreateAuction
}

/**
 * Render Auction Page
 * @param {object} req
 * @param {object} res
 */
function getAuctions(req, res) {
  res.render('auctions/search', {
    title: 'Arveres',
    url: urlConfig
  });
}
/*
/**
 * Render Create Page
 * @param {object} req
 * @param {object} res
 */
function getCreateAuction(req,res) {//make saved as create the page
  res.render('auctions/create',{
    title: 'Arveres',
    url: urlConfig
    
  });
 
}

/**
 * Create Auction
 * @param {object} req
 * @param {object} res
 */
function postCreateAuction(req,res) {
 //we want to console.log all of the passed in attributes by that he meant the names
 //item name description category and starting amount
 
  var myItemName = req.body.itemName;
  var myDesciptionItem = req.body.descriptionItem;
  var myItemAmount = req.body.itemAmount;
  console.log(myItemName);
  console.log(myDesciptionItem);
  console.log(myItemAmount);

  res.redirect('/user/profile');
}

module.exports = AuctionsHandler;

