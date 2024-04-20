const connection = require('../models/db');

module.exports.getvisitors = (req, res) => {
    const consult = 'SELECT * FROM visitors';

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