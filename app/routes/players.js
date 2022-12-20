var express = require('express');
var router = express.Router();
const { check, body , validationResult } = require('express-validator');

//const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Ejercicio 2.4
router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add',
    [check('name').not().isEmpty().withMessage('Se requiere un nombre')],
    function(req,res){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.locals.message = "Se han cometido errores" //err.message;
        res.locals.error = req.app.get('env') === 'development' ? 400 : {};
        res.render('add_error', { title: 'Error' })
      }
      else {
        console.log(req.body)
        res.render('add')
      }
})

module.exports = router;
