/**
 * @module arveres/routes/auctions
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the Auctions router
 * @param {object} auctionsHandler
 * @return {object}
 */
function getAuctionsRouter(auctionsHandler) {
  var router = Router();

  router.get('/search', auctionsHandler.getAuctions);
  /*router.get('/create', auctionsHandler.getCreateAuction);
  
  router.post('/create', auctionsHandler.postCreateAuction);*/
  

  return router;
}

module.exports = getAuctionsRouter;
