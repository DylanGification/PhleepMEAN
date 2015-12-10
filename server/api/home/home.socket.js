/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Home = require('./home.model');

exports.register = function(socket) {
  Home.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Home.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('home:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('home:remove', doc);
}