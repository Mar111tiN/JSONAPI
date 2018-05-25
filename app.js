require('dotenv').config();
const express = require('express');
app = express();
bodyParser = require('body-parser');




//listen to port depending on environment
const port = (process.env.ENV == 'dev') ? process.env.DEVPORT : process.env.PRODPORT

const   indexRoutes = require('./routes'),
        todoRoutes = require('./routes/todos');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use('/', indexRoutes);
app.use('/api/todo', todoRoutes);
app.listen(port, () => console.log('API is running on PORT ', port));


