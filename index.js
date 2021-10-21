const express = require('express');
const multer = require('multer');
const bodyParser = require("body-parser");
const DB = require('./src/db').DB;

// Imports
const upload = multer();
const s_route = require("./routes/shortener.js");
// App
const app = express();
const port = 3030;
app.set('view engine', 'pug')
    .set('views', './views')
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(upload.array())
    .use(express.static(__dirname + '/public'));
    let db = new DB();

// Routes
app.get('/:path?', (req, res) => {
    res.render("index");
});

app.use('/s', s_route);



const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


module.exports = { db };
