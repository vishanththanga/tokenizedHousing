
exports.up = knex => knex.schema.createTable('Accounts', (t) => {
  t.string('accountId').primary();
  t.string('FirstName').notNullable();
  t.string('LastName').notNullable();
  t.string('address').notNullable();
  t.string('sex').notNullable();
  t.string('dob').notNullable();
  t.string('email').notNullable();
  t.string('telephone').notNullable();
  t.string('House:1').defaultTo(0);
  t.string('House:3').defaultTo(0);
  t.timestamp(true, true);
})

exports.down = knex => knex.schema.dropTableIfExists('Accounts');
