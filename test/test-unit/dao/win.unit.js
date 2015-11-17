
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var db = {
  insert: function() {},

  select: function() {
    return this;
  },

  where: function() {
    return this;
  },

  exec: function () {}
};

var Win = proxyquire('../../../dao/win', {
  '../db': {
    db: db
  }
});

describe('Win', function() {
  describe('.create', function() {
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
    });

    after(function() {
      sandbox.restore();
    });

    afterEach(function() {
      sandbox.reset();
    });

    it('should insert a new row into wins', function(done) {
      var i = sandbox.stub(db, 'insert', function(table, entry, cb) {
        cb();
      });

      Win.create('winner', 'seller', 'item', function() {
        expect(db.insert).to.have.been.calledWith('wins');
        i.restore();
        done();
      });
    });

    it('should pass back an error if insertion fails', function(done) {
      var i = sandbox.stub(db, 'insert', function(table, entry, cb) {
        cb(new Error('error'));
      });

      Win.create('winner', 'seller', 'item', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        i.restore();
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

    it('should select from wins', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findById('id', function() {
        expect(db.select).to.have.been.calledWith('wins');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findById('id', function() {
        expect(db.where).to.have.been.calledWith('id = id');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Win.findById('id', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findByItem', function() {
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

    it('should select from wins', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findByItem('itemId', function() {
        expect(db.select).to.have.been.calledWith('wins');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findByItem('itemId', function() {
        expect(db.where).to.have.been.calledWith('itemId = itemId');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Win.findByItem('itemId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findByWinner', function() {
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

    it('should select from wins', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findByWinner('winnerId', function() {
        expect(db.select).to.have.been.calledWith('wins');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findByWinner('winnerId', function() {
        expect(db.where).to.have.been.calledWith('winnerId = winnerId');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Win.findByWinner('winnerId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findBySeller', function() {
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

    it('should select from wins', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findBySeller('sellerId', function() {
        expect(db.select).to.have.been.calledWith('wins');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Win.findBySeller('sellerId', function() {
        expect(db.where).to.have.been.calledWith('sellerId = sellerId');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Win.findBySeller('sellerId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });
});
