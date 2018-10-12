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
    let id = req.body._id;
    let issue_title = req.query.issue_title;
    let issue_text = req.query.issue_text;
    let created_by = req.query.created_by;
    let assigned_to = req.query.assigned_to;
    let status_text = req.query.status_text;
    let open = req.query.open;
    
    let query = {};
    
    if (issue_title !== undefined)  query.issue_title = issue_title;
    if (issue_text !== undefined) query.issue_text = issue_text;
    if (created_by !== undefined) query.created_by = created_by;
    if (assigned_to !== undefined) query.assigned_to = assigned_to;
    if (status_text !== undefined) query.status_text = status_text;
    if (open !== undefined) query.open = open;
    
    query.project = project;
    
    Issue.find(query, (err, foundIssues) => {
      if (err) {
        res.send('Could not get issues');
        return;
      }
      
      res.send(foundIssues);
      return;
    });
  });
  
  app.post('/api/issues/:project', (req, res) => {
    let project = req.params.project;
    let issue_title = req.body.issue_title;
    let issue_text = req.body.issue_text;
    let created_by = req.body.created_by;
    let assigned_to = req.body.assigned_to;
    let status_text = req.body.status_text;
    
    if (assigned_to === undefined) assigned_to = '';
    if (status_text === undefined) status_text = '';
    
    if (issue_title === undefined) {
      res.send('Missing required input');
      return;
    }
    
    if (issue_text === undefined) {
      res.send('Missing required input');
      return;
    }
    
    if (created_by === undefined) {
      res.send('Missing required input');
      return;
    }
    
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
    let id = req.body._id;
    let issue_title = req.body.issue_title;
    let issue_text = req.body.issue_text;
    let created_by = req.body.created_by;
    let assigned_to = req.body.assigned_to;
    let status_text = req.body.status_text;
    let open = req.body.open;
    
    if (issue_title === undefined && issue_text === undefined && created_by === undefined && assigned_to === undefined && status_text === undefined && open === undefined) {
      res.send('No updated field sent.');
    }
    
    let update = {};
    
    if (issue_title !== undefined) update.issue_title = issue_title;
    if (issue_text !== undefined) update.issue_text = issue_text;
    if (created_by !== undefined) update.created_by = created_by;
    if (assigned_to !== undefined) update.assigned_to = assigned_to;
    if (status_text !== undefined) update.status_text = status_text;
    if (open !== undefined) update.open = open;
    
    update.updated_on = Date.now();
    
    Issue.findByIdAndUpdate(id, update, (err, updatedIssue) => {
      if (err) {
        res.send('Could not update ' + id);
        return;
      }
      
      res.send('Successfully updated!');
      return;
    });

  })
    
  app.delete('/api/issues/:project', (req, res) => {
    let project = req.params.project;
    let id = req.body._id;
    
    if (id === undefined) {
      res.send('No _id given');
      return;
    }
    
    Issue.findByIdAndDelete(id, (err) => {
      if (err) {
        res.send('Could not delete ' + id);
        return;
      }
      
      res.send('Deleted ' + id);
      return;
    });

  });
    
};
