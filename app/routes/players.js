var express = require('express');
var router = express.Router();

//const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Ejercicio 2.4
router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', function(req,res){
  console.log(req.body)
  res.render('add')
})

module.exports = router;
