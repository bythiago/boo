const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "/var/www/js/nodejs/boo/database/db.sqlite",
  },
  useNullAsDefault: true,
});

exports.knex = knex;
