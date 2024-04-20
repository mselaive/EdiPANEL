const express = require('express')
const router = express.Router()
const {ping} =require('../controllers/pingController')
const {login} = require('../controllers/loginController')
const {getvisitors} = require('../controllers/getvisitorsController')


router.get('/ping', ping);

router.get('/visitors', getvisitors);

router.post('/login', login);


module.exports = router;

