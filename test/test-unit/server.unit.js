'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var Server;
var http;

var server = {
  listen: sinon.spy(),
  close: sinon.spy()
};

describe('Server', function() {
  before(function() {
    http = {
      createServer: function() {
        return server;
      }
    };

    Server = proxyquire('../../server', {
      'http': http
    });
  });

  describe('.listen', function() {
    afterEach(function() {
      server.listen.reset();
    });

    it('should listen on a port', function(done) {
      server.on = function(event, cb) {
        if(event === 'listening') {
          cb();
        }
      };

      Server.listen(function() {
        expect(server.listen).to.have.been.called;
        done();
      });
    });

    it('should pass back an error if fails to listen', function(done) {
      server.on = function(event, cb) {
        if(event === 'error') {
          cb(new Error('error'));
        }
      };

      Server.listen(function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        done();
      });
    });
  });

  describe('.close', function() {
    afterEach(function() {
      server.close.reset();
    });

    it('should close server', function() {
      Server.close();
      expect(server.close).to.have.been.called;
    });
  });
});
