require('dotenv').config();
const StellarSdk = require('stellar-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const config = require('./config');
const db = require('./db-interactions');
const stc = require('./stellarCalls');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/addAccount', (res, req) => {
    console.log(req.body)
    return store.addAccount ({
        accountId: req.body.accountId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        sex: req.body.sex,
        dob: req.body.dob,
        email: req.body.email,
        telephone: req.body.telephone,
    })
    .then(res.sendStatus(200));
})

app.post('/api/addTrans', (res, req) => {
    console.log(req.body)
    return store.addTrans ({
        txNum: req.body.txNum,
        to: req.body.to,
        from: req.body.from,
        assetCode: req.body.address,
    }).then(res.sendStatus(200));
})

app.post('/api/addHouse', (res, req) => {
    console.log(req.body)
    return store.addHouse ({
        houseId: req.body.houseId,
        owner: req.body.owner,
        totalToken: req.body.totalToken,
        tokenSale: req.body.tokenSale,
    }).then(res.sendStatus(200));
})

app.get('/api/houses', (res, req) => {
    console.log('listing houses')
    return store.getAllHouses ()
        .then(res.json(houses));
})

app.get('/api/:houseId', (res, req) => {
    console.log(req.params.houseId)
    return store.getHouse ({
        hosueId: req.params.houseId,
    }).then(res.json(house));
})

app.listen(config.server_port).then(console.log(`Running on ${config.server_port}`))
