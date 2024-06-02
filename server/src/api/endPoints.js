const express = require('express')
const router = express.Router()
const {ping} =require('../controllers/pingController')
const {login} = require('../controllers/loginController')
const {getvisitors} = require('../controllers/getvisitorsController')
const {addVisitor} = require('../controllers/newvisitorsController')
const {getResident} = require('../controllers/getresidentController')
const {getParking} = require('../controllers/getparkingController')


const app = express()
app.set('port', process.env.PORT || 3001)


router.get('/ping', ping);

router.get('/visitors', getvisitors);

router.post('/login', login);

router.post('/addvisitor', addVisitor);

router.get('/residents/:building/:apartment_number', getResident);

router.get('/parking', getParking)


module.exports = router;

