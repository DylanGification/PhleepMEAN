'use strict';

var _ = require('lodash');
var Personal = require('./personal.model');

// Get list of personals
exports.index = function(req, res) {
  Personal.find(function (err, personals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personals);
  });
};

// Get a single personal
exports.show = function(req, res) {
  Personal.findById(req.params.id, function (err, personal) {
    if(err) { return handleError(res, err); }
    if(!personal) { return res.status(404).send('Not Found'); }
    return res.json(personal);
  });
};

// Creates a new personal in the DB.
exports.create = function(req, res) {
  Personal.create(req.body, function(err, personal) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personal);
  });
};

// Updates an existing personal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Personal.findById(req.params.id, function (err, personal) {
    if (err) { return handleError(res, err); }
    if(!personal) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personal);
    });
  });
};

// Deletes a personal from the DB.
exports.destroy = function(req, res) {
  Personal.findById(req.params.id, function (err, personal) {
    if(err) { return handleError(res, err); }
    if(!personal) { return res.status(404).send('Not Found'); }
    personal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}