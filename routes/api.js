/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

let expect = require('chai').expect;
let MongoClient = require('mongodb');
let ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DATABASE;
MongoClient.connect(CONNECTION_STRING, (err, db) => {});

module.exports = (app) => {

  app.route('/api/issues/:project')
  
    .get((req, res) =>{
      let project = req.params.project;
      
    })
    
    .post((req, res) => {
      let project = req.params.project;
      console.log('POST from ' + project);
      console.log(res.body);
      //console.log('issue_title: ' + res.body.issue_title);
      //console.log('issue_text: ' + res.body.issue_text);
      //console.log('created_by: ' + res.body.created_by);
    })
    
    .put((req, res) =>{
      let project = req.params.project;
      
    })
    
    .delete((req, res) => {
      let project = req.params.project;
      
    });
    
};
