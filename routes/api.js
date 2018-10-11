/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

let expect = require('chai').expect;
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CONNECTION_STRING = process.env.DATABASE;
mongoose.connect(CONNECTION_STRING);

let issueSchema = new Schema({
  project: {type: String, required: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: String,
  status_text: String,
  open: Boolean,
  created_on: {type: Date, default: Date.now},
  updated_on: {type: Date, default: Date.now}
});

let Issue = mongoose.model('Issue', issueSchema);


module.exports = (app) => {

  app.get('/api/issues/:project', (req, res) => {
    let project = req.params.project;
  });
  
  app.post('/api/issues/:project', (req, res) => {
    let project = req.params.project;
    let issue_title = req.body.issue_title;
    let issue_text = req.body.issue_text;
    let created_by = req.body.created_by;
    let assigned_to = req.body.assigned_to;
    let status_text = req.body.status_text;
    
    let newIssue = Issue({
      project: project,
      issue_title: issue_title,
      issue_text: issue_text,
      created_by: created_by,
      assigned_to: assigned_to,
      status_text: status_text,
      open: true
    });
    
    newIssue.save((err, createdIssue) => {
      if (err) return;
      res.json({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text,
        open: true,
        _id: createdIssue._id,
        created_on: createdIssue.created_on,
        updated_on: createdIssue.updated_on
      });
    });
    
  });
    
    
  app.put('/api/issues/:project', (req, res) => {
    let project = req.params.project;

  })
    
  app.delete('/api/issues/:project', (req, res) => {
    let project = req.params.project;

  });
    
};
