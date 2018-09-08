require('dotenv').config()
const config = require('./config');
const StellarSdk = require('stellar-sdk');
const request = require('request');
const db = require('./db-interactions.js');
const stc = require('./stellarCalls.js')

//Base Account
const sourceKeyBase = StellarSdk.Keypair
  .fromSecret('SD34RZWQFQYDHV3VW46LATYVTTZX7K5CTQ2YKHDEJK7BNPOGX4SOJAEU');
const destinationId = 'GATTG2HJTJBUFFPDP5T5N2O2HBH74HXGPXYNVDOQOTGEN3ADGCFXVAHR';

//issueingAccount
const sourceKeyIssuing = StellarSdk.Keypair
  .fromSecret('SDAIKTY2VOKREX234AZL4TPALOHZ7ZD2Q34OC3TUV4DDW42KIPADJF5R');

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
let transaction;

module.exports = {
   sendTransaction (sourceKeyBase, db, transInfo, server) {
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
                  asset: StellarSdk.Asset.native(),
                  amount: '1'
              }))
              .addMemo(StellarSdk.Memo.text(`T: ${transInfo[0].to} f:${transInfo[0].from} AC:${transInfo[0].assetCode} AM:${transInfo[0].amount}`))
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


    createAsset (sourceKeyBase, db, assetInfo) {
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
                   asset: StellarSdk.Asset.native(),
                   amount: '1'
               }))
               .addMemo(StellarSdk.Memo.text(`AC: ${assetInfo[0].assetCode} O${assetInfo[0].owner} T${assetInfo[0].totalToken} TS${assetInfo[0].tokenSale}`))
               .build();
 
               transaction.sign(sourceKeyBase);
 
               return server.submitTransaction(transaction);
             })
             .then((result) => {
                 console.log('Transaction Successful', result)
                 console.log(assetInfo);
                 return db.updateAssetToOne(assetInfo[0].houseId).then(() => {
                    return db.updateAssetOwner(assetInfo[0].owner, (parseInt(assetInfo[0].totalToken) - parseInt(assetInfo[0].tokenSale)))
                 })
             }).catch((error) => {
                 console.log('Transaction Failed', error)
             })
     },

//    createAsset(sourceKeyBase, sourceKeyIssuing, assetInfo) {
//        server.loadAccount(sourceKeyBase.publicKey())
//         .then((receiver) => {
//           const transaction = new StellarSdk.TransactionBuilder(receiver)
//             .addOperation(StellarSdk.Operation.changeTrust({
//                 asset: new StellarSdk.Asset(assetInfo[0].assetCode, sourceKeyIssuing.publicKey()),
//                 limit: assetInfo[0].totalToken
//             })).addMemo(StellarSdk.Memo.text(`Owner: ${assetInfo[0].owner}`))     
//             .build();
//             transaction.sign(sourceKeyBase); 
//             return server.submitTransaction(transaction);
//         })
//         .then(() => server.loadAccount(sourceKeyIssuing.publicKey()))
//         .then((issuer) => {
//             const transaction = new StellarSdk.TransactionBuilder(issuer)
//               .addOperation(StellarSdk.Operation.payment({
//                   destination: sourceKeyBase.publicKey(),
//                   asset: new StellarSdk.Asset(assetInfo[0].assetCode, sourceKeyIssuing.publicKey()),
//                   amount: assetInfo[0].totalToken,
//               }))
//               .build()
//               transaction.sign(sourceKeyIssuing);
//               return server.submitTransaction(transaction);

//         }).then((result) => {
//             console.log(result);
//             return db.updateAssetToOne(assetInfo[0].houseId).then(() => {
//                 return db.updateAssetOwner(assetInfo[0].owner, (parseInt(assetInfo[0].totalToken) - parseInt(assetInfo[0].tokenSale)))
//         })
        
//      }).catch(console.error)
//   }  
}