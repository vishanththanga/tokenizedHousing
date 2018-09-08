require('dotenv').config()
const config = require('./config');
const StellarSdk = require('stellar-sdk');
const request = require('request');
const db = require('./db-interactions.js');
const stc = require('./stellarCalls.js')

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

module.exports = {
   sendTransaction (sourceKeyBase, stc, db, transInfo) {
       server.loadAccount(destinationId)
        .catch(StellarSdk.NotFoundError, (error) => {
            throw new Error('Account Does Not Exist');
        })
        .then(() => {
            return server.loadAccount(sourceKeyBase.publicKey())
        }) 
        .then((sourceAccount) => {
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
              .addOperation(StellarSdk.Operation.payment({
                  destination: destinationId,
                  asset: StellarSdk.Asset.native(),//new StellarSdk.Asset(transInfo[0].assetCode, 'GBSSI5CSKJ3WMB76VKMUXX7NN7SZKP4SOK5Y2Z5J5AEZCMK2UPAK2JOS'),
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
                    return db.updateTxToOne(transInfo[0].txNum);
                })
            }).catch((error) => {
                console.error('Transaction Failed', error)
                return db.revertTx(transInfo[0].txNum);
            })
    },

   // createAsset()
}