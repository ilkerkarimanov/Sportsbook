const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const xml2js = require('xml2js').parseString;

const app = express();

app.use(cors());

app.get('/matches', async (req, res) => {
    const data = await fetch('http://sports.ultraplay.net/sportsxml?siteID=1&sportId=2357').then(response => response.text())

    xml2js(data, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }

        res.send(result);
    });
});

const port = process.env.PORT || 8081;

app.listen(port);
console.info(`Listening on port ${port}`);