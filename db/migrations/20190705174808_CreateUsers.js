
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id").primary();
    t.string("username");
    t.string("email");
    t.string("password_digest");
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};