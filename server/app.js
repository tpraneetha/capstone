const path = require('path')
const express = require('express')
/* Dependencies */
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(express.static('dist'));
app.use(cors());

const dotenv = require('dotenv');

// const moment=require('moment')
dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const port = 3000




app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
});

app.get('/get_data', (req, res) => {
    res.send({
        GEONAMES_USERNAME: GEONAMES_USERNAME,
        WEATHERBIT_API_KEY: WEATHERBIT_API_KEY,
        PIXABAY_API_KEY: PIXABAY_API_KEY,
    });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);

})