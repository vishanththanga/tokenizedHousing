require('dotenv').config();
const knex = require('knex')(require('./knexfile'));

module.exports = {
    // transaction databse 
    pendingRequest() {
        console.log('Pulling All Transactions with Status of 0')
        return knex('Transactions').where({ 'status': 0 }).orderBy('created_at', 'asc')
    },

    updateTxToOne(txNum) {
        console.log(`Updating ${txNum} to 1`)
        return knex('Transactions').where('txNum', txNum).update({ 'status': 1 })
    },

    updateTxhash(txNum, txhash) {
        console.log(`Updating ${txNum} to ${txhash}`)
        return knex('Transactions').where('txNum', txNum).update({ 'txhash': txhash })
    },

    paymentRecieved(txNum) {
        console.log(`Payment Recieved for ${txnum}`)
        return knex('Transcations').where('txNum', txNum).update('status', 0)
    },

    // houses database
    pendingAssets() {
        console.log('Getting All Assets that need to be created')
        return knex('Houses').where({ 'status': 0 }).orderBy('created_at', 'asc')
    },

    updateAssetToOne(houseId) {
        console.log(`Updating ${houseId} to 1`)
        return knex('Houses').where('houseId', houseId).update({ 'status': 1 })
    },

    assetInfo(assetCode) {
        console.log('Getting the requested asset')
        return knex('Houses').where('assetCode', assetCode).orderBy('created_at', 'asc')        
    },

    //acounts database
    updateAssetOwner(accountId, amount) {
        console.log('Updating Amount Of Token for', accountId,'to', amount)
        return knex('Accounts').where('accountId', accountId).increment('hTwo', amount)
    },

    updateAsset(accountId, amount) {
        console.log('Updating Amount Of Token for', accountId,'to', amount)
        return knex('Accounts').where('accountId', accountId).increment('hTwo', amount)
    }
}