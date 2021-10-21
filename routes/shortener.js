const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const db = require('../index.js');


router.get('/', (req, res) => {
    res.send("hi");
});

router.post('/', (req, res) => {
    let link = req.body.link;
    let slug = getRandomString(6);
    let short = {
        uid: crypto.randomUUID(),
        original: link,
        date: new Date(),
        slug: slug,
    }

    db.write(link, short);

    let val = db.seek(link);

    console.log(val);


    // Writing to DB
    res.send(`https://tld.tld/${slug}`);
});

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}




module.exports = router;