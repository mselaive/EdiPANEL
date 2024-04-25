const express = require('express')
const router = express.Router()
const {ping} =require('../controllers/pingController')
const {login} = require('../controllers/loginController')
const {getvisitors} = require('../controllers/getvisitorsController')
const {addVisitor} = require('../controllers/newvisitorsController')
const {getResident} = require('../controllers/getresidentController')

router.get('/ping', ping);

router.get('/visitors', getvisitors);

router.post('/login', login);

router.post('/addvisitor', addVisitor);

router.get('/getResidents', getResident);


module.exports = router;

