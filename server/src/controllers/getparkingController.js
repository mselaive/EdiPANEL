const connection = require('../models/db');

module.exports.getParking = (req, res) => {
    const consult = 'SELECT * FROM parking';

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }
            console.log(results);
            res.json(results);
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred' });
    }
};