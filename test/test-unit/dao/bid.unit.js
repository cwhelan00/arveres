
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

  orderBy: function() {
    return this;
  },

  limit: function() {
    return this;
  },

  exec: function() {}
};

var Bid = proxyquire('../../../dao/bid', {
  '../db': {
    db: db
  }
});

describe('Bid', function() {
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

    it('should insert a new row into bids', function(done) {
      var i = sandbox.stub(db, 'insert', function(table, entry, cb) {
        cb();
      });

      Bid.create('userId', 'itemId', 50, function() {
        expect(db.insert).to.have.been.calledWith('bids');
        i.restore();
        done();
      });
    });

    it('should pass an error back if error fails', function(done) {
      var i = sandbox.stub(db, 'insert', function(table, entry, cb) {
        cb(new Error('error'));
      });

      Bid.create('userId', 'itemId', 50, function(err) {
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

    it('should select from bids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findById(0, function() {
        expect(db.select).to.have.been.calledWith('bids');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findById('id', function() {
        expect(db.where).to.have.been.calledWith('id = id');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Bid.findById('id', function(err) {
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

    it('should select from bid', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findByItem('itemId', function() {
        expect(db.select).to.have.been.calledWith('bids');
        e.restore();
        done();
      });
    });

    it('should select only specified itemIds', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findByItem('itemId', function() {
        expect(db.where).to.have.been.calledWith('itemId = itemId');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Bid.findByItem('itemId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findTopByItem', function() {
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
      sandbox.spy(db, 'select');
      sandbox.spy(db, 'where');
      sandbox.spy(db, 'orderBy');
      sandbox.spy(db, 'limit');
    });

    after(function() {
      sandbox.restore();
    });

    afterEach(function() {
      sandbox.reset();
    });

    it('should select from bid', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findTopByItem('itemId', function() {
        expect(db.select).to.have.been.calledWith('bids');
        e.restore();
        done();
      });
    });

    it('should select only specified itemIds', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findTopByItem('itemId', function() {
        expect(db.where).to.have.been.calledWith('itemId = itemId');
        e.restore();
        done();
      });
    });

    it('should order results by date', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findTopByItem('itemId', function() {
        expect(db.orderBy).to.have.been.calledWith('date');
        e.restore();
        done();
      });
    });

    it('should limit results by provided number', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findTopByItem('itemId', 10, function() {
        expect(db.limit).to.have.been.calledWith(10);
        e.restore();
        done();
      });
    });

    it('should limit results to 1 by default', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findTopByItem('itemId', function() {
        expect(db.limit).to.have.been.calledWith(1);
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Bid.findTopByItem('itemId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findByUser', function() {
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

    it('should select from bid', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findByUser('userId', function() {
        expect(db.select).to.have.been.calledWith('bids');
        e.restore();
        done();
      });
    });

    it('should select only specified userIds', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb();
      });

      Bid.findByUser('userId', function() {
        expect(db.where).to.have.been.calledWith('userId = userId');
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done) {
      var e = sandbox.stub(db, 'exec', function(cb) {
        cb(new Error('error'));
      });

      Bid.findByUser('userId', function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });
});
