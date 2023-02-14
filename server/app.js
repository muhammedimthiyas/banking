const express = require('express');
const app = express();
const fs = require('node:fs/promises');
const data = require('./data.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { response } = require('express');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//routing
app.get('/', (req, res) => {
    res.send('hello world')
});

app.post('/deposit', (req, res) => {
    fs.writeFile(__dirname + '/data.json', JSON.stringify({ balance: req.body.deposit })).then(
        (result) => {
            console.log(result);
            response.redirect("back")
            res.end()
        }
    );
})

app.post('/withdraw', (req, res) => {
    let withdrawal=Number(req.body.withdraw)
    let parsedata=data.balance;
    let allBalance=Number(parsedata)-withdrawal
    console.log(allBalance);
    fs.writeFile(__dirname + '/data.json', JSON.stringify({balance:allBalance})).then(
        (result) => {
            console.log(result);
            response.redirect("back")
            res.end()
        }
    );
})

app.get('/balance', (req, res) => {
    res.json(data)
    res.render('/bal')
    res.end()
});

//listening
app.listen(5000, () => {
    console.log("server started");
})
