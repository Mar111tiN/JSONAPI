const express = require('express');
//define variable router to pass routes to app.js via module.exports
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/todos')

router.route('/')           //---------defer Routes to the same path::
    .get(helpers.getTodos)  //------TODO-LIST ROUTE----------router.get('/', getTodos);
    .post(helpers.newTodo)  //------NEW TODO POST ROUTE------router.post('/', newTodo)




router.route('/:id')
    .get(helpers.showTodo)      //--SHOW TODO ROUTE---------
    .put(helpers.editTodo)      //--EDIT TODO ROUTE---------
    .delete(helpers.deleteTodo) //--DELETE TODO ROUTE-------

module.exports = router;