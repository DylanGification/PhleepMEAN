'use strict';

var _ = require('lodash');
var Home = require('./home.model');

// Get list of homes
exports.index = function(req, res) {
  Home.find(function (err, homes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(homes);
  });
};

// Get a single home
exports.show = function(req, res) {
  Home.findById(req.params.id, function (err, home) {
    if(err) { return handleError(res, err); }
    if(!home) { return res.status(404).send('Not Found'); }
    return res.json(home);
  });
};

// Creates a new home in the DB.
exports.create = function(req, res) {
  Home.create(req.body, function(err, home) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(home);
  });
};

// Updates an existing home in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Home.findById(req.params.id, function (err, home) {
    if (err) { return handleError(res, err); }
    if(!home) { return res.status(404).send('Not Found'); }
    var updated = _.merge(home, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(home);
    });
  });
};

// Deletes a home from the DB.
exports.destroy = function(req, res) {
  Home.findById(req.params.id, function (err, home) {
    if(err) { return handleError(res, err); }
    if(!home) { return res.status(404).send('Not Found'); }
    home.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}