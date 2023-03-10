var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const DB = require('../modules/db');

//const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('players/Home');
});

// Ejercicio 2.4
router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add',
  [check('name').not().isEmpty().withMessage('Se requiere un nombre'),
  check('id').not().isEmpty().withMessage('Introduce un id'),
  check('birth').not().isEmpty().withMessage('Introduce una fecha de nacimiento'),
  check('nation').not().isEmpty().withMessage('Introduce a que pais pertenece'),
  check('team').not().isEmpty().withMessage('Introduce a que equipo pertenece'),
  check('position').not().isEmpty().withMessage('Introduce en que posición juega'),
  check('number').not().isEmpty().withMessage('Introduce el número del jugador')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.render('add_error', { title: 'Error', mensaje: errors.errors[0].msg })

    console.log(req.body)
    const params = {
      id: parseInt(req.body.id),
      name: req.body.name,
      birthdate : req.body.birth,
      nationality: req.body.nation,
      teamId: parseInt(req.body.team),
      position: req.body.position,
      number: parseInt(req.body.number)
    }
    DB.insertPlayer(params);
    res.render('add')
})

router.get('/:id', async (req, res) => {
  const aux = await DB.getPlayerById(parseInt(req.params.id));
  if(!aux) return res.json({ok:false})
  console.log(aux);
  res.json({
    ok: true,
    data: aux
  });
});

router.get('/remove/:id', async (req, res) => {
  DB.removePlayer(parseInt(req.params.id));
  res.json({ok: true});
})

router.get('/edit/:id', async (req, res) => {
  const player = await DB.getPlayerById(parseInt(req.params.id));
  res.render('players/Edit', {player});
})

router.put('/edit', async (req, res) => {
  const params = {
    id: parseInt(req.body.id),
    name: req.body.name,
    birthdate: req.body.birth,
    nationality: req.body.nation,
    teamId: parseInt(req.body.team),
    position: req.body.position,
    number: parseInt(req.body.number)
  }

  const result = await DB.modifyPlayer(params);

  res.json({ok:true, result});
})

module.exports = router;
