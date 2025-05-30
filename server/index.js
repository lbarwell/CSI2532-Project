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

// Delete a hotel chain by chain_number
app.delete("/hotelchains/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM hotel WHERE chain_number = $1', [id]);
        await pool.query('DELETE FROM hotel_chain WHERE chain_number = $1', [id]);
        res.json({ message: "Hotel chain and associated hotels deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




// # Hotel # //

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

// delete hotel
app.delete("/hotels/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Delete hotel rooms that reference the hotel first
        await pool.query('DELETE FROM hotel_room WHERE hotel_number = $1', [id]);
        // Then delete the hotel
        await pool.query('DELETE FROM hotel WHERE hotel_number = $1', [id]);
        res.json({ message: "Hotel and associated hotel rooms deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// # Hotel room # //

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

// Delete a hotel room by hotel_room_id
app.delete("/hotelrooms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            DELETE FROM hotel_room WHERE hotel_room_id = ${id}
            `);
        res.json({ message: "Hotel room deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// # Hotel search query # //
// Get all hotels in given order and with search filters
app.get("/hotelinfo", async(req, res) => {
    try {
        const { sort, reverse, destination, start, end, capacity, rating, minPrice, maxPrice, chainName } = req.query;
        const nameSort = sort === "name" ? "h." : ""
        const orderDirection = reverse === "true" ? "DESC" : "ASC";

        const allHotels = await pool.query(`
                SELECT r.hotel_room_id, h.hotel_number, h.name, h.city, h.state, h.rating, r.amenities, r.price, r.capacity, c.name
                FROM hotel h 
                JOIN hotel_room r ON h.hotel_number = r.hotel_number 
                JOIN hotel_chain c ON c.chain_number = h.chain_number 
                WHERE r.price = (
                    SELECT MIN(r2.price)
                    FROM hotel_room r2
                    WHERE r2.hotel_number = h.hotel_number
                ) 
                ${destination !== "" ? `AND h.city LIKE '%${destination}%'` : ""}
                ${capacity !== "" ? `AND r.capacity >= ${capacity}`: ""}
                ${rating !== "" ? `AND h.rating >= ${rating}`: ""}
                ${minPrice !== "" ? `AND r.price >= ${minPrice}`: ""}
                ${maxPrice !== "" ? `AND r.price <= ${maxPrice}`: ""}
                ${chainName !== "" ? `AND c.name = '${chainName}'`: ""}
                ORDER BY ${nameSort + sort} ${orderDirection}`)

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
                SELECT h.name, h.city, h.state, h.rating, r.amenities, r.price, r.view, r.extendable
                FROM hotel h JOIN hotel_room r ON h.hotel_number = r.hotel_number 
                WHERE r.hotel_room_id = ${id}`)

        res.json(roomInfo.rows);
    } catch (error) {
        console.error(error.message);
    }
});



// # Employee # //

// Get an employee by ID
app.get("/employees/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const employee = await pool.query(`
            SELECT e.employee_id, u.first_name, u.last_name, h.name, e.role FROM employee e 
            JOIN hotel h ON e.hotel_number = h.hotel_number 
            JOIN "user" u ON e.user_id = u.social_insurance_number 
            WHERE employee_id = $1`, [id]);

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

// Delete an employee by employee_id
app.delete("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            DELETE FROM employee WHERE employee_id = ${id}
            `);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// # Users # //

// Create a user
app.post("/users", async (req, res) => {
    try {
        const {
            social_insurance_number,
            first_name,
            last_name,
            street_number,
            street_name,
            apt_number,
            city,
            state,
            zip_code,
            email,
            phone_number,
            creation_date
        } = req.body;
        
        const newUser = await pool.query(
            `INSERT INTO "user" 
            (social_insurance_number, first_name, last_name, street_number, street_name, apt_number, city, state, zip_code, email, phone_number, creation_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *;`,
            [
                social_insurance_number,
                first_name,
                last_name,
                street_number,
                street_name,
                apt_number,
                city,
                state,
                zip_code,
                email,
                phone_number,
                creation_date
            ]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Delete a user by user_id (social_insurance_number)
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete employees that reference this user first
        await pool.query(
            'DELETE FROM employee WHERE user_id = $1',
            [id]
        );
        
        // Then delete the user
        await pool.query(
            'DELETE FROM "user" WHERE social_insurance_number = $1',
            [id]
        );
        
        res.json({ message: "User and associated employee records deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



// # Reservations # //

// Get a reservation by Hotel ID
app.get("/reservations", async(req, res) => {
    try {
        const { id, start, end } = req.query;
        
        const reservation = await pool.query(`SELECT * FROM reservation WHERE hotel_room_id = ${id} AND start_date <= '${end}' AND end_date >= '${start}'`);

        res.json(reservation.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create a reservation
app.post("/reservations", async (req, res) => {
    try {
        const { customer, hotel_room_id, status, start_date, end_date, reservation_date } = req.body;
        const newReservation = await pool.query(
            `INSERT INTO reservation 
            (customer_sin, hotel_room_id, status, start_date, end_date, reservation_date)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [customer, hotel_room_id, status, start_date, end_date, reservation_date]
        );
        res.status(201).json(newReservation.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Update Reservation
app.put("/reservations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;

        const updatedReservation = await pool.query(
            `UPDATE reservation
             SET status = $1
             WHERE reservation_id = $2
             RETURNING *;`,
            [newStatus, id]
        );

        if (updatedReservation.rows.length === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.json(updatedReservation.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


//delete reservation
app.delete("/reservations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            DELETE FROM reservation WHERE reservation_id = ${id}
            `);
        res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



// ## Get all data in a table ## //

// Get all reservations
app.get("/allreservations", async(req, res) => {
    try {
        const allReservations = await pool.query(`SELECT * FROM reservation`);

        res.json(allReservations.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all hotels
app.get("/allhotels", async(req, res) => {
    try {
        const allHotels = await pool.query(`SELECT * FROM hotel`);

        res.json(allHotels.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all hotel chains
app.get("/allchains", async(req, res) => {
    try {
        const allChains = await pool.query(`SELECT * FROM hotel_chain`);

        res.json(allChains.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all hotel rooms
app.get("/allrooms", async(req, res) => {
    try {
        const allRooms = await pool.query(`SELECT * FROM hotel_room`);

        res.json(allRooms.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all users
app.get("/allusers", async(req, res) => {
    try {
        const allUsers = await pool.query(`SELECT * FROM "user"`);

        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all employees
app.get("/allemployees", async(req, res) => {
    try {
        const allEmployees = await pool.query(`SELECT * FROM employee`);

        res.json(allEmployees.rows);
    } catch (error) {
        console.error(error.message);
    }
});



// Get all reservations for a hotel room (using index on reservation.hotel_room_id)
app.get("/hotelrooms/:id/reservations", async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await pool.query(
            'SELECT * FROM reservation WHERE hotel_room_id = $1',
            [id]
        );
        res.json(reservations.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Get all reservations for a given user (using index on reservation.customer_sin)
app.get("/users/:id/reservations", async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await pool.query(
            'SELECT * FROM reservation WHERE customer_sin = $1',
            [id]
        );
        res.json(reservations.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



// Listen for requests
app.listen(port, () => {
    console.log("Server has started on port", port)
})