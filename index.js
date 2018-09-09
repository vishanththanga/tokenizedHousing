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
  .fromSecret('SBX7XHSD7ISYPDE7VYUCS6KAKKQQJ27CG7TVDXHEJIZT2T2TIDFHTRTG');
const destinationId = 'GB5R2C2HKU5SZNRMMNVUSUELQTB55EPU6HSRFGF63RPTJYZK22B7RK6J';

//issueingAccount
const sourceKeyIssuing = StellarSdk.Keypair
  .fromSecret('SB6JXU2KSXMJMCNLPWM74NMAKMXSXAIR5FR3LSX62NN4K2UYZJ54IIRU');

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

const delayFn = function (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
}
function transactions(sourceKeyBase, db, server, stc) {
    const delay = 7*1000
    db.pendingRequest().then((transInfo) => {
        console.log(transInfo)
        return stc.sendTransaction(sourceKeyBase, db, transInfo , server) 
    }).catch((e) => {
        console.log('No Transactions')
        return delayFn(delay).then(() => { return transactions(sourceKeyBase, db, server, stc) });
    }).then(() => {
        console.log('Looping Transacations...')
        return delayFn(delay).then(() => { return transactions(sourceKeyBase, db, server, stc) });
    })
}

function assets(sourceKeyBase, db, server, stc) {
    const delay = 7*1000
    db.pendingAssets().then((assetInfo) => {
        return stc.createAsset(sourceKeyBase, db, assetInfo); 
    }).catch((e) => {
        console.log('No Assetss')
        return delayFn(delay).then(() => { return assets(sourceKeyBase, db, server, stc) });
    }).then(() => {
        console.log('Looping Assets...')
        return delayFn(delay).then(() => { return assets(sourceKeyBase, db, server, stc) });
    })
}

transactions(sourceKeyBase, db, server, stc);
assets(sourceKeyBase, db, server, stc);




