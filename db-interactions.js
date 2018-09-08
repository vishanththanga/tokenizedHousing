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

    // houses 
    pendingAssets() {
        console.log('Getting All Assets that need to be created')
        return knex('Houses').where({ 'status': 0 }).orderBy('created_at', 'asc')
    },

    updateAssetToOne(houseId) {
        console.log(`Updating ${houseId} to 1`)
        return knex('Houses').where('houseId', houseId).update({ 'status': 1 })
    },
}