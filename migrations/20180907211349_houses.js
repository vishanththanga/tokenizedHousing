
exports.up = knex => knex.schema.createTable('Houses', (t) => {
    t.string('houseId').primary();
    t.string('owner').defaultTo(0);
    t.string('assetCode').notNullable()
    t.string('totalToken').defaultTo(0);
    t.string('tokenSale').defaultTo(0);
    t.integer('status').defaultTo(0)
    t.timestamps(true, true);
  })

exports.down = knex => knex.schema.dropTableIfExists('Houses');
