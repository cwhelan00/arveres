
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var Database;
var sheetsdb;

describe('Database', function() {
  before(function() {
    sheetsdb = {
      connect: sinon.stub()
    };

    Database = proxyquire('../../db', {
      'sheetsdb': sheetsdb
    });
  });

  describe('.connect', function() {
    afterEach(function() {
      delete Database.db;
      sheetsdb.connect.reset();
    });

    it('should connect to sheetsdb', function(done) {
      sheetsdb.connect.callsArgWith(2, null, 'db');

      Database.connect(function() {
        expect(sheetsdb.connect).to.have.been.called;
        done();
      });
    });

    it('should save the created `db`', function(done) {
      sheetsdb.connect.callsArgWith(2, null, 'db');

      Database.connect(function() {
        expect(Database).to.have.property('db');
        expect(Database.db).to.equal('db');
        done();
      });
    });

    it('should pass back an error if fails to connect', function(done) {
      sheetsdb.connect.callsArgWith(2, new Error('error'));

      Database.connect(function(err) {
        expect(err).to.be.ok;
        expect(err.message).to.equal('error');
        done();
      });
    });
  });
});
