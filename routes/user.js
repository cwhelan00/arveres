/**
 * @module arveres/routes/user
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the Auctions router
 * @param {object} auctionsHandler
 * @return {object}
 */
function getUserRouter(userHandler) {
  var router = Router();

  router.get('/profile', userHandler.getUser);
  /*router.get('/create', auctionsHandler.getCreateAuction);
  
  router.post('/create', auctionsHandler.postCreateAuction);*/
  

  return router;
}

module.exports = getUserRouter;
