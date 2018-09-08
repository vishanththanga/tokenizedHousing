
exports.up = knex => knex.schema.createTable('Transactions', (t) => {
    t.string('txNum').primary();
    t.string('to').notNullable();
    t.string('from').notNullable();
    t.string('amount').notNullable();
    t.string('assetCode').notNullable();
    t.integer('status').defaultTo(null);
    t.string('txhash').defaultTo('notAssigned');
    t.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists('Transactions');
