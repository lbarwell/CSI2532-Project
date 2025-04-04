// Imports
const express = require("express");
const cors = require("cors");
const pool = require("./db");

// Port to listen on
const port = 3000;

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
        const allHotels = await pool.query(`SELECT * FROM hotel`)

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



// # Hotel room # //

// Get all hotel rooms
app.get("/hotelrooms", async(req, res) => {
    try {
        const allHotelRooms = await pool.query(`SELECT * FROM hotel_room`)

        res.json(allHotelRooms.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get a hotel room by id
app.get("/hotelrooms/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const hotelRoom = await pool.query(`SELECT * FROM hotel_room WHERE hotel_room_id = ${id}`);

        res.json(hotelRoom.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create a hotel room
app.post("/hotelrooms", async(req, res) => {
    try {
        const { id, roomNumber, hotelNumber, price, capacity, amenities, view, extendable, knownIssues } = req.body;
        const newHotelRoom = await pool.query(`INSERT INTO hotel_room 
            (hotel_room_id, room_number, hotel_number, price, capacity, amenities, view, extendable, known_issues) VALUES 
            (${id}, ${roomNumber}, ${hotelNumber}, ${price}, ${capacity}, '${amenities}', '${view}', ${extendable}, '${knownIssues}') RETURNING *`);

        res.json(newHotelRoom.rows);
    } catch (error) {
        console.error(error.message);
    }
});



// # Hotel search query # //
// Get all hotels in given order and with search filters
app.get("/hotelinfo", async(req, res) => {
    try {
        const { sort, reverse, destination, travellers } = req.query;
        const orderDirection = reverse === "true" ? "DESC" : "ASC";

        const allHotels = await pool.query(`
                SELECT r.room_number, h.hotel_number, h.name, h.city, h.state, h.rating, r.amenities, r.price, r.capacity 
                FROM hotel h JOIN hotel_room r ON h.hotel_number = r.hotel_number 
                WHERE r.price = (
                    SELECT MIN(r2.price)
                    FROM hotel_room r2
                    WHERE r2.hotel_number = h.hotel_number
                ) ${destination !== "" ? `AND h.city LIKE '%${destination}%'` : ""} AND r.capacity >= ${travellers}
                ORDER BY ${sort} ${orderDirection}`)

        res.json(allHotels.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// # Hotel booking information query # //
// Get hotel information by id
app.get("/hotelinfo/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const roomInfo = await pool.query(`
                SELECT h.name, h.city, h.state, h.rating, r.amenities, r.price 
                FROM hotel h JOIN hotel_room r ON h.hotel_number = r.hotel_number 
                WHERE r.room_number = ${id}`)

        res.json(roomInfo.rows);
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