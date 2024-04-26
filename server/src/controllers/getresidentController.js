const connection = require('../models/db');

module.exports.getResident = (req, res) => {
    const consult = 'SELECT * FROM residents WHERE building = ? AND apartment_number = ?';
    
    try {
        connection.query(consult, [req.params.building, req.params.apartment_number], (err, results) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }
            res.json(results);
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred' });
    }
};