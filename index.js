const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

const PORT = 3002;
const PROXY_SERVER_HOST = 'ENTER_HOST_HERE';

app.use(function (req, res, next) {
    // allow cors only on port 3002
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    // allow necessary methods
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    // allow credentials so that the BE request gets authenticated on port ${PORT} and be available on proxy
    res.header('Access-Control-Allow-Credentials', 'true');
    // allow headers same as on request
    res.header(
        'Access-Control-Allow-Headers',
        req.header('access-control-request-headers')
    );
    if (req.method === 'OPTIONS') {
        // bypass preflight requests
        res.statusCode = 200;
        res.end();
    } else {
        next();
    }
});

app.use('/', proxy(PROXY_SERVER_HOST));

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}!`);
});