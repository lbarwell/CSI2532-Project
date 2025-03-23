const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "tu18199",
    host: "localhost",
    port: 5432,
    database: "" // TODO: database name
});

module.exports = pool;