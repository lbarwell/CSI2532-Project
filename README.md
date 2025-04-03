# uOttawa - 2024-2025 - CSI2532 - Project - Group 24

Project name : e-Hôtels

## Project members

| FIRST NAME            | LAST NAME             |
| --------------------- | --------------------- |
| Ludovic               | Beauregard Barwell    |
| --------------------- | --------------------- |
| Arij                  | Karoui                |
| --------------------- | --------------------- |
| Ibrahima              | Badiane               |
| --------------------- | --------------------- |

## Installation

For this project, it is required to install [postgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and [node.js](https://nodejs.org/en).

After cloning the repository into an IDE, follow the steps below to run the application:

### Client

To run the client application (website), open the project in a terminal window and run the following commands:

```bash
cd client # Navigate to the client directory
npm install # Install the required node modules
npm run dev # Run the client application
```

Open the link provided by the terminal window.

Note: running only the client means the webpage will not display any information which has to be fetched from the database (only placeholders).

### Server

The first step in setting up the server is to create the database. Run the SQL query located at database/queries/eHotels.sql in your postgreSQL interface to initialize it.

Note: installing the database currently does not populate the tables with default values, the database tables are empty.

Next, open server/db.js and fill in the required fields:

```javascript
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres", // Database user name (postgres by default)
  password: "", // Password for the database user
  host: "localhost",
  port: 5432, // Port on which postgreSQL is running (5432 by default)
  database: "hoteldb", // Name of the database
});

module.exports = pool;
```

To run the server, open the project in a new terminal window and run the following commands:

```bash
cd server # Navigate to the server directory
npm install express pg cors # Install the required node modules
npx run index.js # Run the server
```

If the installation was successful, the server will reply with 'Server has started on port 5000'
