/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

let chaiHttp = require('chai-http');
let chai = require('chai');
let assert = chai.assert;
let server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
  let _id1, _id2;

  suite('POST /api/issues/{project} => object with issue data', () => {

    test('Every field filled in', (done) => {
     chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'open');
        assert.property(res.body, 'status_text');
        assert.property(res.body, '_id');
        _id1 = res.body._id;
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
        assert.equal(res.body.assigned_to, 'Chai and Mocha');
        assert.equal(res.body.status_text, 'In QA');
        assert.isBoolean(res.body.open);
        assert.equal(res.body.open, true);
        done();
      });
    });

    test('Required fields filled in', (done) => {
     chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title 2',
        issue_text: 'text',
        created_by: 'Functional Test - Required fields filled in'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'open');
        assert.property(res.body, 'status_text');
        assert.property(res.body, '_id');
        _id2 = res.body._id;
        assert.equal(res.body.issue_title, 'Title 2');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        assert.isBoolean(res.body.open);
        assert.equal(res.body.open, true);
        done();
      });        
    });

    test('Missing required fields', (done) => {
     chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title 3',
        created_by: 'Functional Test - Missing required fields',
        assigned_to: 'Chai and Mocha'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'Missing required input');
        done();
      });        
    });

  });

  suite('PUT /api/issues/{project} => text', () => {

    test('No body', (done) => {
      chai.request(server)
      .put('/api/issues/test')
      .send({_id: _id1})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'No updated field sent.');
        done();
      });        
    });

    test('One field to update', (done) => {
      chai.request(server)
      .put('/api/issues/test')
      .send({_id: _id1, issue_text: 'updated issue text test'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'Successfully updated!');
        done();
      });  
    });

    test('Multiple fields to update', (done) => {
      chai.request(server)
      .put('/api/issues/test')
      .send({_id: _id2, issue_text: 'updated issue text test for the second issue', open: 'false'})
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.equal(res.text, 'Successfully updated!');
        done();
      });  
    });

  });

  suite('GET /api/issues/{project} => Array of objects with issue data', () => {

    test('No filter', (done) => {
      chai.request(server)
      .get('/api/issues/test')
      .query({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      });
    });

    test('One filter', (done) => {
      chai.request(server)
      .get('/api/issues/test')
      .query({assigned_to: 'Chai and Mocha'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        assert.equal(res.body[0].assigned_to, 'Chai and Mocha');
        done();
      });
    });

    test('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {
      chai.request(server)
      .get('/api/issues/test')
      .query({open: false, issue_title: 'Title'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        assert.equal(res.body[0].open, false);
        assert.equal(res.body[0].issue_title, 'Title');
        done();
      });
    });

  });

  suite('DELETE /api/issues/{project} => text', () => {

    test('No _id', (done) => {
      chai.request(server)
      .delete('/api/issues/test')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'No _id given');
        done();
      });  
    });

    test('Valid _id', (done) => {
      chai.request(server)
      .delete('/api/issues/test')
      .send({_id: _id2})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'Deleted '+_id2);
        done();
      });  
    });

  });

});
