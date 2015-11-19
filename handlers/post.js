/**
 * @module arveres/handlers/post
 */

'use strict';


var PostHandler = {
  getPost: getPost
}

/**
 * Render Auction Page
 * @param {object} req
 * @param {object} res
 */
function getPost(req, res) {
  res.render('auctions/post', {title: 'Arveres'});
}                                

module.exports = PostHandler;