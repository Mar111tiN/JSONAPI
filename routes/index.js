const express = require('express');
//define variable router to pass routes to app.js via module.exports
const router = express.Router();


router.get('/', (req,res) => res.send('HOME ROUTE'));





module.exports = router;