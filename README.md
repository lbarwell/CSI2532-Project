# uOttawa - 2024-2025 - CSI2532 - Project - Group 24

Project name: e-Hotels

## Project members

| FIRST NAME            | LAST NAME             | USERNAME        |
| --------------------- | --------------------- | ----------------|
| Ludovic               | Beauregard Barwell    | lbarwell        |
| Arij                  | Karoui                | Arij-Karoui     |
| Ibrahima              | Badiane               | Ibrahim-44      |

## Overview

This application is for a hotel booking management system, supporting both customer and staff operations. It is built using postgreSQL for the database, node.js / express.js for the server side, and React for the client side.

## Installation

For this project, it is required to install [postgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and [node.js](https://nodejs.org/en).

After cloning the repository into an IDE, follow the steps below to run the application:

### Server

The first step in setting up the server is to create the database. Create a database by running the following query in your preferred DBMS:

```sql
CREATE DATABASE hoteldb;
```

Next, create a query in hoteldb and run the SQL queries located at database/queries/setup.sql in your postgreSQL interface to initialize it.

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

Once these fields are completed, you can run the server. Open the project in a new terminal window and run the following commands:

```bash
cd server # Navigate to the server directory
npm install express pg cors # Install the required node modules
npx run index.js # Run the server
```

If the installation was successful, the server will reply with 'Server has started on port ...'.

Note: if the default port (3000) is already in use, you can change the port number by editing server/port.js.

### Client

To run the client application (website), open the project in a terminal window and run the following commands:

```bash
cd client # Navigate to the client directory
npm install # Install the required node modules
npm run dev # Run the client application
```

Open the link provided by the terminal window.

Note: running only the client means the webpage will not display any information which has to be fetched from the database (only placeholders).

## Entity-relationship diagram

![Entity-relationship diagram for the hoteldb database](/diagrams/er-diagram.png)

## Default users

Accessing the employees page requires logging in with an employee ID (a password field is present but currently disabled). The employee IDs 1-5 are associated to default employee users and can be used to login.

## Known issues

Due to limited development time, the application currently has some issues:

- Search page filters do not work in some combinations and search results are incomplete.
- Some buttons (particularly search filter buttons) do not correctly update the page, despite triggering the correct changes in the database. To view changes, you may have to refresh the page.
- Table formatting in the employees page is lacking.
- Actions such as updating entries in the employees page tables are missing.
- Deleting certain records from the employees page tables may not work due to database foreign key constraints.
