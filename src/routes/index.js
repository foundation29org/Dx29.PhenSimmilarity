const phenSimilarityCntrl = require('../controllers/phenSimilarity')
const aboutCntrl = require('../controllers/about')

const express = require('express')
const api = express.Router();

// get version
api.get('/version', aboutCntrl.getVersion)

// PhenSimilarity post 2 list of symptoms
api.post('/v1/calculate', phenSimilarityCntrl.calculate)

module.exports = api;
