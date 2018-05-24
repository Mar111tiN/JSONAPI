const db = require('../models');


exports.getTodos = (req, res) => {
    db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => res.send(err.message))
}

exports.newTodo = (req,res) => {
    db.Todo.create(req.body)
    .then((newTodo) => {
        res.status(201).json(newTodo);  //status(201) means successfully created
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.showTodo = (req, res) => {
    db.Todo.findById(req.params.id)
    .then((todo) => {
        res.json(todo);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.editTodo = (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then((todo) => {
        res.json(todo)
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.deleteTodo = (req, res) => {
    db.Todo.remove({_id: req.params.id})
    .then(() => {
        res.send('DELETED');
    })
}

module.exports = exports