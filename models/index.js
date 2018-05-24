const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/jsonapi');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');