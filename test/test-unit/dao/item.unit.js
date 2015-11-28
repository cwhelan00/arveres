
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
  exec: function() {}
};

var Item = proxyquire('../../../dao/item', {
  '../db': {
    db: db
  }
});

describe('Item', function(){
  describe('.create', function(){
    var sandbox;

    before(function() {
      sandbox = sinon.sandbox.create();
    });

    after(function(){
      sandbox.restore();
    });

    afterEach(function(){
      sandbox.reset();
    });

    it('should insert a new row into items', function(done){
      var i = sandbox.stub(db, 'insert', function(table, entry, cb){
        cb();
      });

      Item.create('test_title', 'test.png', 'test_description', function(){
        expect(db.insert).to.have.been.calledWith('test_title', 'test.png', 'test_description');
        i.restore();
        done();
      });
    });

    it('should pass back an error if insertion fails'. function(done){
      var i = sandbox.stub(db, 'insert', function(){
        cb(new Error('error'));
      });

      Item.create('test_title', 'test.png', 'test_description', function(err){
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        i.restore();
        done();
      });
    });
  });

  describe('.findById', function(){
    var sandbox;

    before(function(){
      sandbox = sinon.sandbox.create();
      sandbox.spy(db.where);
      sandbox.spy(db.select);
    });

    after(function(){
      sandbox.restore();
    });

    afterEach(function(){
      sandbox.reset();
    });

    it('should select from items', function(done){
      var e = sandbox.stub(db, 'exec', function(cb){
        cb();
      });

      Item.findById('0', function(){
        expect(db.select).to.have.been.calledWith('items');
        e.restore();
        done();
      });
    });

    it('should select only specified ids', function(done){
      var e = sandbox.stub(db, 'exec', function(id, cb){
        cb();
      });

      Item.findById('0', function(){
        expect(db.where).to.have.been.calledWith({id: '0'});
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done){
      var e = sandbox.stub(db, 'exec', function(){
        cb(new Error('error'));
      });

      Item.findById('0', function(err){
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });

  describe('.findByTitle', function(){
    it('should select from items', function(done){
      var e = sandbox.stub(db, 'exec', function(cb){
        cb();
      });

      Item.findByTitle('test', function(){
        expect(db.select).to.have.been.calledWith('items');
        e.restore();
        done();
      });
    });

    it('should select only items with a given title', function(done){
      var e = sandbox.stub(db, 'exec', function(cb){
        cb();
      });

      Items.findByTitle('test', function(){
        expect(db.where).to.have.been.calledWith({title: 'test'});
        e.restore();
        done();
      });
    });

    it('should pass back an error if selection fails', function(done){
      var e = sandbox.stub(db, 'exec', function(cb){
        cb(new Error('error'));
      });

      Items.findByTitle('test', function(err){
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        e.restore();
        done();
      });
    });
  });
});
