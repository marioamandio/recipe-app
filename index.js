const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.
app.use(bodyParser.json())
let port = process.env.dev || 3001

app.get('/api/getResults', (req, res) => {
    res.send('this is the call to server')
})

if(process.env.NODE_ENV = "production") {

    app.use(express.static('client/dist'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
    });
}








app.listen(port, () => {
    console.log('Server listening on Port ' + port);
})
