const knex = require('knex')(require('./knexfile'));

module.exports = {
    addAccount ({accountId, firstName, lastName, address, sex, dob, email, telephone}) {
        console.log('Adding Account');
        knex('Accounts').insert({
            accountId,
            firstName,
            lastName,
            address,
            sex,
            dob,
            email,
            telephone
        });
    },
    
    addTrans ({txNum, to, from, assetCode}) {
        console.log('Adding Transaction');
        knex('Transactions').insert({
            txNum,
            to,
            from,
            assetCode,
        });
    },

    addHouse ({houseId, owner, totalToken, tokenSale}) {
        console.log('Adding Tokens For Token Creation');
        knex.insert('Houses').insert({
            houseId,
            owner,
            totalToken,
            tokenSale
        });
    },

    getAllHouse () {
        console.log('Getting All TOkenized Housing For Sale')
        knex('Houses').where({ 'status': 1 }).then(houses => houses);
    },

    getHouse ({houseId}) {
        console.log(`Getting the house with Id ${hosueId}`);
        knex('Houses').where({ 'houseId': houseId }).then(house => house)
    },
}