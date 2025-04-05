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

// Delete a hotel chain by chain_number
app.delete("/hotelchains/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            "DELETE FROM hotel_chain WHERE chain_number = ${id}"
            `);
        res.json({ message: "Hotel chain deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
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

// Delete a hotel by hotel_number
app.delete("/hotels/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            "DELETE FROM hotel WHERE hotel_number = ${id}"
            `);
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
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

// Delete a hotel room by hotel_room_id
app.delete("/hotelrooms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            "DELETE FROM hotel_room WHERE hotel_room_id = ${id}"
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
        const { sort, reverse, destination, capacity, rating, minPrice, maxPrice, chainName } = req.query;
        const orderDirection = reverse === "true" ? "DESC" : "ASC";

        const allHotels = await pool.query(`
                SELECT r.room_number, h.hotel_number, h.name, h.city, h.state, h.rating, r.amenities, r.price, r.capacity, c.name
                FROM hotel h 
                JOIN hotel_room r ON h.hotel_number = r.hotel_number 
                JOIN hotel_chain c ON c.chain_number = h.chain_number 
                WHERE r.price = (
                    SELECT MIN(r2.price)
                    FROM hotel_room r2
                    WHERE r2.hotel_number = h.hotel_number
                ) 
                ${destination !== "" ? `AND h.city LIKE '%${destination}%'` : ""}
                ${capacity !== "" ? `AND r.capacity >= ${capacity}`: "" } 
                ${rating !== "" ? `AND r.capacity >= ${capacity}`: "" } 
                ${minPrice !== "" ? `AND r.price >= ${minPrice}`: "" }
                ${maxPrice !== "" ? `AND r.price <= ${maxPrice}`: "" }
                ${chainName !== "" ? `AND c.name LIKE '%${chainName}%'`: "" }
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

// Delete an employee by employee_id
app.delete("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            "DELETE FROM employee WHERE employee_id = ${id}"
            `);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// # Users # //

// Get a user by ID
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userResult = await pool.query(
            `SELECT * FROM "user" WHERE social_insurance_number = ${id}`
        );
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userResult.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

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
            VALUES (${social_insurance_number}, ${first_name}, ${last_name}, ${street_number},${street_name}, ${apt_number}, ${city}, ${state}, ${zip_code}, ${email}, ${phone_number}, ${creation_date})
            RETURNING *;`
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Delete a user by user_id (social_insurance_number)
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            `DELETE FROM "user" WHERE social_insurance_number = ${id}`
        );
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// # Reservations # //

// Get an reservations by Hotel ID
app.get("/reservations/:hotel_id", async(req, res) => {
    try {
        const { hotel_id } = req.params;
        const reservation = await pool.query(`SELECT * FROM reservation WHERE reservation_id = ${hotel_id}`);

        res.json(reservation.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create Reservations 
app.post("/reservations", async(req, res) => {
    try {
        const { res_id, customer, hotel_room_id, status, start_date, end_date, reservation_date } = req.body;
        const newReservation = await pool.query(`INSERT INTO reservation 
            (reservation_id, customer_sin, hotel_room_id, status, start_date, end_date, reservation_date ) VALUES 
            (${res_id}, ${customer}, ${hotel_room_id}, '${status}', ${start_date}, ${end_date}, ${reservation_dat}) RETURNING *`);

        res.json(newReservation.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Update Reservation
app.put("/reservations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, start_date, end_date, hotel_room_id } = req.body;
        const updatedReservation = await pool.query(`
        UPDATE reservation
        SET status = '${status}',
            start_date = ${start_date},
            end_date = ${end_date},
            hotel_room_id = ${hotel_room_id}
        WHERE reservation_id = ${id};
        `, [status, start_date, end_date, hotel_room_id, id]);

        res.json(updatedReservation.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(3000).send("Server Error");
    }
});

//delete reservation
app.delete("/reservations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`
            "DELETE FROM reservation WHERE reservation_id = ${id}"
            `);
        res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// get all reservations for a hotel room
app.get("/hotelrooms/:id/reservations", async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await pool.query(`
            "SELECT * FROM reservation WHERE hotel_room_id = ${id} "
            `);
        res.json(reservations.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


//Search
//prob wont work 
app.get("/search", async (req, res) => {
    try {
        // Retrieve query parameters for sorting
        // 'sort' can be "name", "rating", or "price"
        // 'order' can be "ASC" (default) or "DESC"
        const { sort = "name", order = "ASC" } = req.query;

        // Map sort parameter to a specific column name
        let sortColumn;
        if (sort === "name") {
            sortColumn = "h.name";
        } else if (sort === "rating") {
            sortColumn = "h.rating";
        } else if (sort === "price") {
            sortColumn = "r.price";
        } else {
            sortColumn = "h.name"; // default sort column
        }

        // Ensure the order direction is valid
        const orderDirection = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

        // Query joining hotel and hotel_room tables and sorting by the specified column
        const results = await pool.query(`
            SELECT h.name, h.rating, r.price, h.hotel_number, h.city, h.state
            FROM hotel h
            JOIN hotel_room r ON h.hotel_number = r.hotel_number
            ORDER BY ${sortColumn} ${orderDirection};
        `);

        res.json(results.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Listen for requests
app.listen(port, () => {
    console.log("Server has started on port", port)
})