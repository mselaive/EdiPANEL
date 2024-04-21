const express = require('express')
const router = express.Router()
const {ping} =require('../controllers/pingController')
const {login} = require('../controllers/loginController')
const {getvisitors} = require('../controllers/getvisitorsController')
const {addVisitor} = require('../controllers/newvisitorsController')

router.get('/ping', ping);

router.get('/visitors', getvisitors);

router.post('/login', login);

router.post('/addvisitor', addVisitor);


module.exports = router;

