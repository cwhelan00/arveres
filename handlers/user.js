/**
 * @module arveres/handlers/user
 */

'use strict';

var urlConfig = require('../config/url');

var UserHandler = {
  getUser: getUser,
  getMyAuctions: getMyAuctions,
  getSubs: getSubs
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
function getMyAuctions(req, res) {
  res.render('user/myauctions', {
    title: 'Arveres',
    url: urlConfig
  });
}
function getSubs(req, res) {
  res.render('user/subs', {
    title: 'Arveres',
    url: urlConfig
  });
}

module.exports = UserHandler;

