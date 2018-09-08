
exports.up = knex => knex.schema.createTable('Accounts', (t) => {
    t.string('accountId').primary();
    t.string('House:1').defaultTo(0);
    t.string('House:3').defaultTo(0);
    t.timestamp(true, true);
  })

exports.down = knex => knex.schema.dropTableIfExists('Houses');
