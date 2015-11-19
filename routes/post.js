/**
 * @module arveres/routes/post
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the Auctions router
 * @param {object} auctionsHandler
 * @return {object}
 */
function getPostRouter(postHandler) {
  var router = Router();

  router.get('/post', postHandler.getPost);
  /*router.get('/create', auctionsHandler.getCreateAuction);
  
  router.post('/create', auctionsHandler.postCreateAuction);*/
  

  return router;
}

module.exports = getPostRouter;
