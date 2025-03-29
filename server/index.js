// Imports
const express = require("express");
const cors = require("cors");
const pool = require("./db");

// Port to listen on
const port = 5000;

// App setup
const app = express();
app.use(cors());
app.use(express.json());



// ### ROUTES ### //

// # Hotel chain # //

// Get all hotel chains
app.get("/hotelchains", async(req, res) => {
    try {
        const allHotelChains = await pool.query(`SELECT * FROM hotel_chain`)

        res.json(allHotelChains.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get a hotel chain by ID
app.get("/hotelchains/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const hotelChain = await pool.query(`SELECT * FROM hotel_chain WHERE chain_number = ${id}`);

        res.json(hotelChain.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create a hotel chain
app.post("/hotelchains", async(req, res) => {
    try {
        const { id, name, streetNumber, streetName, city, state, zipCode, email, phone } = req.body;
        const newHotelChain = await pool.query(`INSERT INTO hotel_chain 
            (chain_number, name, street_number, street_name, city, state, zip_code, email, phone) VALUES 
            (${id}, '${name}', ${streetNumber}, '${streetName}', '${city}', '${state}', '${zipCode}', ' ${email}', '${phone}') RETURNING *`);

        res.json(newHotelChain.rows);
    } catch (error) {
        console.error(error.message);
    }
});



// # Hotel # //

// Get all hotels
app.get("/hotels", async(req, res) => {
    try {
        const { sort } = req.query;
        const allHotels = await pool.query(`SELECT * FROM hotel ORDER BY ${sort} ${sort === "rating" ? "DESC" : ""}`)

        res.json(allHotels.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get a hotel by ID
app.get("/hotels/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const hotel = await pool.query(`SELECT * FROM hotel WHERE hotel_number = ${id}`);

        res.json(hotel.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create a hotel
app.post("/hotels", async(req, res) => {
    try {
        const { id, name, chainID, streetNumber, streetName, city, state, zipCode, email, phone, managerID } = req.body;
        const newHotel = await pool.query(`INSERT INTO hotel 
            (hotel_number, name, chain_number, street_number, street_name, city, state, zip_code, email, phone, manager_id) VALUES 
            (${id}, '${name}', ${chainID}, ${streetNumber}, '${streetName}', '${city}', '${state}', '${zipCode}', ' ${email}', '${phone}', ${managerID}) RETURNING *`);

        res.json(newHotel.rows);
    } catch (error) {
        console.error(error.message);
    }
});



// # Employee # //

// Get all employees
app.get("/employees", async(req, res) => {
    try {
        const allEmployees = await pool.query(`SELECT * FROM employee`)

        res.json(allEmployees.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get an employee by ID
app.get("/employees/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const employee = await pool.query(`SELECT * FROM employee WHERE employee_id = ${id}`);

        res.json(employee.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create an employee
app.post("/employees", async(req, res) => {
    try {
        const { id, role } = req.body;
        const newEmployee = await pool.query(`INSERT INTO employee 
            (employee_id, role) VALUES 
            (${id}, '${role}') RETURNING *`);

        res.json(newEmployee.rows);
    } catch (error) {
        console.error(error.message);
    }
});


// Listen for requests
app.listen(port, () => {
    console.log("Server has started on port", port)
})