const knex = require('knex')(require('./knexfile'));

module.exports = {
    addAccount ({accountId, firstName, lastName, address, sex, dob, email, telephone}) {
        console.log('Adding Account');
        return knex('Accounts').insert({
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
        return knex('Transactions').insert({
            txNum,
            to,
            from,
            assetCode,
        });
    },

    addHouse ({houseId, owner, totalToken, tokenSale}) {
        console.log('Adding Tokens For Token Creation');
        return knex.insert('Houses').insert({
            houseId,
            owner,
            totalToken,
            tokenSale
        });
    },

    getAllHouse () {
        console.log('Getting All TOkenized Housing For Sale')
        return knex('Houses').where({ 'status': 1 }).then(houses => houses);
    },

    getHouse ({houseId}) {
        console.log(`Getting the house with Id ${hosueId}`);
        return knex('Houses').where({ 'houseId': houseId }).then(house => house)
    },
}