const connection = require('../models/db');

module.exports.ping = (req, res) => {
    res.json({message: 'pong'});
};