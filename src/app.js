const express = require('express')
const api = require('./routes')
const bodyParser = require('body-parser');

const app = express();

//CORS middleware
function setCrossDomain(req, res, next) {
    //instead of * you can define ONLY the sources that we allow.
    res.header('Access-Control-Allow-Origin', '*');
    //http methods allowed for CORS.
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin, Accept, Accept-Language, Origin, User-Agent');
    next();
}

app.use(setCrossDomain);

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// Error catcher
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send('Invalid Request data: ' + err);
    } else {
        next()
    }
})

app.use('/apidoc', express.static('apidoc', { 'index': ['index.html'] }))
app.use('/api', api)

module.exports = app