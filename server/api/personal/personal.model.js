'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonalSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Personal', PersonalSchema);