const connection = require('../models/db');

module.exports.getResident = (req, res) => {
    const { buildingLetter, apartmentNumber } = req.body;
    const consult = 'SELECT * FROM residents WHERE building = ? AND apartment_number = ?';

    try {
        connection.query(consult, [buildingLetter, apartmentNumber], (err, results) => {
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