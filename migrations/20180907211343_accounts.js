
exports.up = knex => knex.schema.createTable('Accounts', (t) => {
  t.string('accountId').primary();
  t.string('firstName').notNullable();
  t.string('lastName').notNullable();
  t.string('address').notNullable();
  t.string('sex').notNullable();
  t.string('dob').notNullable();
  t.string('email').notNullable();
  t.string('telephone').notNullable();
  t.string('hOne').defaultTo(0);
  t.string('hTwo').defaultTo(0);
  t.timestamp(true, true);
})

exports.down = knex => knex.schema.dropTableIfExists('Accounts');
