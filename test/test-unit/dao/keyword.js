
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var db = {
  insert: function() {
    return this;
  },

  select: function() {
    return this;
  },

  where: function() {
    return this;
  },

  exec: function () {}
};

var Keyword = proxyquire('../../../dao/keyword', {
  '../db': {
    db: db
  }
});

describe('Keyword', function() {
  describe('.create', function() {
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
      sandbox.spy(db, 'insert');
    });

    after(function() {
      sandbox.restore();
    });

    afterEach(function() {
      sandbox.reset();
    });

    it('should insert a new row into keywords', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Keyword.create('word', function() {
        expect(db.insert).to.have.been.calledWith('keywords');
        e.restore();
        done();
      });
    });

    it('should pass back an error if insertion fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Keyword.create('word', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findById', function() {
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
      sandbox.spy(db, 'select');
      sandbox.spy(db, 'where');
    });

    after(function() {
      sandbox.restore();
    });

    afterEach(function() {
      sandbox.reset();
    });

    it('should select from keywords', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Keyword.findById(0, function() {
        expect(db.select).to.have.been.calledWith('keywords');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Keyword.findById(0, function() {
        expect(db.where).to.have.been.calledWith('id = 0');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Keyword.findById(0, function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findByKeyword', function() {
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
      sandbox.spy(db, 'select');
      sandbox.spy(db, 'where');
    });

    after(function() {
      sandbox.restore();
    });

    afterEach(function() {
      sandbox.reset();
    });

    it('should select from keywords', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Keyword.findByKeyword('word', function() {
        expect(db.select).to.have.been.calledWith('keywords');
        e.restore();
        done();
      });
    });

    it('should select only specified words', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Keyword.findByKeyword('word', function() {
        expect(db.where).to.have.been.calledWith('keyword = word');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Keyword.findByKeyword('word', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });
});
