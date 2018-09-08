require('dotenv').config();
const knex = require('knex')(require('./knexfile'));

module.exports = {
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

    revertTx(txNum) {
        console.log(`Revert Transaction ${txNum}`)
        return knex.where('Transactions').where('txNum', txNum).update({ 'status': 0 })
    }
}