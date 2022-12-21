var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

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
    [check('name').not().isEmpty().withMessage('Se requiere un nombre'),
        check('id').not().isEmpty().withMessage('Introducce un id'),
        check('birth').not().isEmpty().withMessage('Introducce una fecha de nacimiento'),
        check('nation').not().isEmpty().withMessage('Introducce a que pais pertenece'),
        check('team').not().isEmpty().withMessage('Introducce a que equipo pertenece'),
        check('position').not().isEmpty().withMessage('Introducce en que posición juega'),
        check('number').not().isEmpty().withMessage('Introducce el número del jugador')],
    function(req,res){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       // res.locals.message = "Se han cometido errores" //err.message;7
          // res.locals.error = req.app.get('env') === 'development' ? 400 : {};
        console.log(errors.errors)
        res.render('add_error', { title: 'Error', mensaje: errors.errors[0].msg })
      }
      else {
        console.log(req.body)
        res.render('add')
      }
})

module.exports = router;
