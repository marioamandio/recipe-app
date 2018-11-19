const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json())
let port = process.env.dev || 3001

app.get('/api/getResults', (req, res) => {
    res.send('this is the call to server')
})








app.listen(port, () => {
    console.log('Server listening on Port ' + port);
})
