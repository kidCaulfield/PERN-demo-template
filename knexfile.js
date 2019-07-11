module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'pern_demo',
      user: process.env.DATABASE_USER,
      password: 'password'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'pg',
  //   connection: {
  //     database: 'my_db',
  //     user: process.env.DATABASE_USER,
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
