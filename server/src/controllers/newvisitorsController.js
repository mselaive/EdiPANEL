const connection = require('../models/db');


module.exports.addVisitor = (req, res) => {
    const { name, guests, building, time } = req.body;

    const consult = 'INSERT INTO visitors (name, guests, building, time) VALUES (?, ?, ?, ?)';

    try {
        connection.query(consult, [name, guests, building, time], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }

            console.log('Visitor added successfully');
            res.status(200).json({ message: 'Visitor added successfully' });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred' });
    }
};