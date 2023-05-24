var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');
var db = mongoose.connection;

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


// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function (req, res, next) {
	User.find().sort('-creationdate').exec(function(err, users) {
		if (err) res.status(500).send(err);
		else res.status(200).json(users);
	});
});

// GET de un único usuario por su Id
router.get('/:id', function (req, res, next) {
	User.findById(req.params.id, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.status(200).json(userinfo);
	});
});

// POST de un nuevo usuario
router.post('/', function (req, res, next) {
	User.create(req.body, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.sendStatus(200);
	});
});

// PUT de un usuario existente identificado por su Id
router.put('/:id', function (req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.sendStatus(200);
	});
});

router.delete('/:id', function (req, res, next) {
	User.findByIdAndDelete(req.params.id, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.sendStatus(200);
	});
});

// Comprueba si el usuario existe
router.post('/signin', function (req, res, next) {
	User.findOne({username: req.body.username}, function (err, user) {
		if (err) res.status(500).send('¡Error comprobando el usuario!');
		// Si el usuario existe...
		if (user != null){
			user.comparePassword(req.body.password,function(err, isMatch){
				if(err) return next(err);
				// Si el password es correcto...
				if (isMatch)
					res.status(200).send({message: 'ok', role: user.role, id: user._id});
				else
					res.status(200).send({message: 'ok'});
			});
		}else res.status(401).send({message: 'ok'});
	});
});

module.exports = router;
