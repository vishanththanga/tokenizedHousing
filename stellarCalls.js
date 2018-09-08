require('dotenv').config()
const config = require('./config');
const StellarSdk = require('stellar-sdk');
const request = require('request');
const db = require('./db-interactions.js');
const stc = require('./stellarCalls.js')

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

module.exports = {
   sendTransaction (sourceKeyBase, db, transInfo) {
       server.loadAccount(destinationId)
        .catch(StellarSdk.NotFoundError, (error) => {
            throw new Error('Account Does Not Exist');
        })
        .then(() => {
            return server.loadAccount(sourceKeyBase.publicKey())
        }) 
        .then((sourceAccount) => {
            console.log(transInfo[0].assetCode)
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
              .addOperation(StellarSdk.Operation.payment({
                  destination: destinationId,
                  asset: new StellarSdk.Asset(transInfo[0].assetCode, 'GDITTRBNRNKBBEKQXSMPUOBDIM5UY25SMDFH44Q2ACXW5S4T3YXEC2TQ'),//
                  amount: transInfo[0].amount
              }))
              .addMemo(StellarSdk.Memo.text(`To: ${transInfo[0].to}, from:${transInfo[0].from}`))
              .build();

              transaction.sign(sourceKeyBase);

              return server.submitTransaction(transaction);
            })
            .then((result) => {
                console.log('Transaction Successful', result)
                return db.updateTxhash(transInfo[0].txNum, result.hash).then(() => {
                    return db.updateTxToOne(transInfo[0].txNum)
                        .then(() => {
                            return db.assetInfo(transInfo[0].assetCode)
                        }).then(() => {
                            return db.updateAsset(transInfo[0].to, transInfo[0].amount)
                        })
                })
            }).catch((error) => {
                console.log('Transaction Failed', error)
            })
    },

   createAsset(sourceKeyBase, sourceKeyIssuing, assetInfo) {
       server.loadAccount(sourceKeyBase.publicKey())
        .then((receiver) => {
          const transaction = new StellarSdk.TransactionBuilder(receiver)
            .addOperation(StellarSdk.Operation.changeTrust({
                asset: new StellarSdk.Asset(assetInfo[0].assetCode, sourceKeyIssuing.publicKey()),
                limit: assetInfo[0].totalToken
            })).addMemo(StellarSdk.Memo.text(`Owner: ${assetInfo[0].owner}`))     
            .build();
            transaction.sign(sourceKeyBase); 
            return server.submitTransaction(transaction);
        })
        .then(() => server.loadAccount(sourceKeyIssuing.publicKey()))
        .then((issuer) => {
            const transaction = new StellarSdk.TransactionBuilder(issuer)
              .addOperation(StellarSdk.Operation.payment({
                  destination: sourceKeyBase.publicKey(),
                  asset: new StellarSdk.Asset('hTwo', sourceKeyIssuing.publicKey()),
                  amount: assetInfo[0].totalToken,
              }))
              .build()
              transaction.sign(sourceKeyIssuing);
              return server.submitTransaction(transaction);

        }).then((result) => {
            console.log(result);
            return db.updateAssetToOne(assetInfo[0].houseId).then(() => {
                return db.updateAssetOwner(assetInfo[0].owner, (parseInt(assetInfo[0].totalToken) - parseInt(assetInfo[0].tokenSale)))
        })
        
     }).catch(console.error)
  }  
}