/**
 * @module arveres/routes/user
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the user router
 * @param {object} userHandler
 * @return {object}
 */
function getUserRouter(userHandler) {
  var router = Router();

  router.get('/profile', userHandler.getUser);
  router.get('/myauctions', userHandler.getMyAuctions);
  router.get('/subs', userHandler.getSubs);
  return router;
}

module.exports = getUserRouter;

