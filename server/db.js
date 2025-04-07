const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres", // Database user name (postgres by default)
  password: "", // Password for the database user
  host: "localhost",
  port: 5432, // Port on which postgreSQL is running (5432 by default)
  database: "hoteldb", // Name of the database
});

module.exports = pool;
