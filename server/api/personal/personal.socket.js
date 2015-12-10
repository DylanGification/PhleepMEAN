/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Personal = require('./personal.model');

exports.register = function(socket) {
  Personal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Personal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('personal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('personal:remove', doc);
}