
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var ErrorHandler = require('../../../handlers/error');

describe('ErrorHandler', function() {
  describe('.pageNotFound', function() {
    it('should pass on a new Error', function(done) {
      ErrorHandler.pageNotFound(null, null, function(err) {
        expect(err.message).to.equal('Not Found');
        done();
      });
    });

    it('should attach a `status` to the passed error', function(done) {
      ErrorHandler.pageNotFound(null, null, function(err) {
        expect(err.status).to.equal(404);
        done();
      });
    });
  });

  describe('.handlePageError', function() {
    var res;

    before(function() {
      res = {
        status: sinon.spy(),
        render: sinon.spy()
      };
    });

    afterEach(function() {
      res.status.reset();
      res.render.reset();
    });

    it('should set `res` status to the errors status', function() {
      var err = {status: 404};
      ErrorHandler.handlePageError(err, null, res);
      expect(res.status).to.have.been.calledWith(404);
    });

    it('should set `res`status to `500` by default', function() {
      var err = {};
      ErrorHandler.handlePageError(err, null, res);
      expect(res.status).to.have.been.calledWith(500);
    });

    it('should render error', function() {
      var err = {};
      ErrorHandler.handlePageError(err, null, res);
      expect(res.render).to.have.been.calledWith('error');
    });
  });
});
