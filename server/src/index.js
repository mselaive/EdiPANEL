const express = require('express')
const app = express()
const port = 3001 // Port number
const routes = require('./api/endPoints');
const cors = require('cors')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
    } )
    
