/**
 * @module arveres/handlers/index
 */

'use strict';

var urlConfig = require('../config/url');

var IndexHandler = {
  getIndex: getIndex
}

/**
 * Render Index Page
 * @param {object} req
 * @param {object} res
 */
function getIndex(req, res) {
  res.render('index', {
    title: 'Arveres',
    url: urlConfig
  })

}

module.exports = IndexHandler;
