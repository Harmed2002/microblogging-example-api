var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

// GET del listado de usuarios
router.get('/', function(req, res) {
	res.json({
		"users": [
			{
				"id": 123,
				"name": "Eladio Guardiola",
				"phones": {
					"home": "800-123-4567",
					"mobile": "877-123-1234"
				},
				"email": [
					"jd@example.com",
					"jd@example.org"],
				"dateOfBirth": "1980-01-02T00:00:00.000Z",
				"registered": true
			},
			{
				"id": 456,
				"name": "Nemesio Tornero",
				"phones": {
					"home": "800-123-3498",
					"mobile": "877-432-1278"
				},
				"email": [
					"pt@example.com",
					"pt@example.org"],
				"dateOfBirth": "1983-01-09T00:00:00.000Z",
				"registered": false
			}
		]
	});
});


// GET de un usuario por su id
router.get('/:id', function(req, res) {
	if (req.params.id == '123'){
		res.json({
			"id": 123,
			"name": "Eladio Guardiola",
			"phones": {
				"home": "800-123-4567",
				"mobile": "877-123-1234"
			},
			"email": [
				"jd@example.com",
				"jd@example.org"
			],
			"dateOfBirth": "1980-01-02T00:00:00.000Z",
			"registered": true
		});
	}else
		res.status(404).send('¡Lo siento, el ítem no se ha encontrado!');
});



module.exports = router;
