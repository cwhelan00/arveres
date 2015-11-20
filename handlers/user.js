/**
 * @module arveres/handlers/user
 */

'use strict';

var UserHandler = {
  getUser: getUser
}

/**
 * Render Auction Page
 * @param {object} req
 * @param {object} res
 */
function getUser(req, res) {
  res.render('user/profile', {
    title: 'Arveres',
    url: urlConfig
  });
}

module.exports = UserHandler;
