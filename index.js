require('dotenv').config();
const StellarSdk = require('stellar-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const config = require('./config');
const db = require('./db-interactions');
const stc = require('./stellarCalls');

const app = express();
const port = parseInt(config.server_port, 10);

app.use(bodyParser.urlencoded({ extended: true }));

//Base Account
const sourceKeyBase = StellarSdk.Keypair
  .fromSecret('SASY24Y4OOP3SLWJ3JNNNXQQMIS5ZAMB6BHRUMZCJCKAE4ZNWWEDDTO4');
const destinationId = 'GBBEWXGEY37KFQN6BFCHXLEQMDMVADGIS22S3XKYZSMJPCT6HFU6VBHW';

//issueingAccount
const sourceKeyIssuing = StellarSdk.Keypair
  .fromSecret('SBEEB22NUEZLERGJGXWP5ZVZF3NF6H5V6MMHU4D2WVDB7UKNODXCB7UG');

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
let transaction;

//all express related calls are here
app.post('/api/addAccount',(req, res) => {
    console.log(req.body)
    return store
      .addAccount ({
        accountId: req.body.accountId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        sex: req.body.sex,
        dob: req.body.dob,
        email: req.body.email,
        telephone: req.body.telephone,
      }).then(() => res.sendStatus(200))
})

app.post('/api/addTrans', (req, res) => {
    console.log(req.body)
    return store.addTrans ({
        txNum: req.body.txNum,
        to: req.body.to,
        from: req.body.from,
        amount: req.body.amount,
        assetCode: req.body.address,
    }).then(() => res.sendStatus(200));
})

app.post('/api/addHouse', (req, res) => {
    console.log(req.body)
    return store.addHouse ({
        houseId: req.body.houseId,
        owner: req.body.owner,
        totalToken: req.body.totalToken,
        tokenSale: req.body.tokenSale,
    }).then(() => res.sendStatus(200));
})

app.get('/api/houses', (req, res) => {
    console.log('listing houses')
    return store.getAllHouses ()
        .then((houses) => res.json(houses));
})

app.post('/api/houseId', (req, res) => {
    console.log(req.body)
    return store.getHouse ({
        houseId: req.body.houseId,
    }).then((house) => res.json(house));
})


app.listen(port, () => {
    console.log(`Running server on port ${config.server_port}`)
}); 

//all stellar
/*db.pendingRequest().then((transInfo) => {
    stc.sendTransaction(sourceKeyBase, stc, db, transInfo) 
})*/

db.pendingAssets().then((assetInfo) => {
    console.log(assetInfo)
    stc.createAsset(sourceKeyBase, sourceKeyIssuing, assetInfo)
})
