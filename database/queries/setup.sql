--DROP DATABASE IF EXISTS eHotels;
CREATE DATABASE hoteldb;

-- 1) HOTEL_CHAIN
CREATE TABLE hotel_chain (
    chain_number INT PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    street_number INT,
    street_name  VARCHAR(50),
    city         VARCHAR(50),
    state        VARCHAR(50),
    zip_code     VARCHAR(6),
    email        VARCHAR(50),
    phone        CHAR(10)
);

-- 4) HOTEL (references HOTEL_CHAIN immediately; references EMPLOYEE later)
CREATE TABLE hotel (
    hotel_number  INT PRIMARY KEY,
    name          VARCHAR(50) NOT NULL,
    chain_number  INT,
    street_number INT,
    street_name   VARCHAR(50),
    city          VARCHAR(50),
    state         VARCHAR(50),
    zip_code      VARCHAR(6),
    email         VARCHAR(50),
    phone         CHAR(10),
    manager_id    INT,
    rating        INT
);

-- Foreign key from HOTEL to HOTEL_CHAIN can be added now (no cycle):
ALTER TABLE hotel
  ADD CONSTRAINT fk_hotel_chain
  FOREIGN KEY (chain_number)
  REFERENCES hotel_chain (chain_number);

-- 2) USER  (Use double-quotes if 'user' is a reserved word in your SQL dialect)
CREATE TABLE "user" (
    social_insurance_number INT PRIMARY KEY,
    first_name    VARCHAR(50) NOT NULL,
    last_name     VARCHAR(50) NOT NULL,
    street_number INT,
    street_name   VARCHAR(50),
    apt_number    INT,
    city          VARCHAR(50),
    state         VARCHAR(50),
    zip_code      VARCHAR(6),
    email         VARCHAR(50),
    phone_number  CHAR(10),
    creation_date DATE
);

-- 3) EMPLOYEE (will later FK to HOTEL)
CREATE TABLE employee (
    employee_id INT PRIMARY KEY,
	user_id INT,
	hotel_number INT,
    role        VARCHAR(15),
	password VARCHAR(20)
);

-- Foreign key from HOTEL to HOTEL_CHAIN can be added now (no cycle):
ALTER TABLE employee
	ADD CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
  REFERENCES "user" (social_insurance_number);

ALTER TABLE employee
  ADD CONSTRAINT fk_hotel_number
  FOREIGN KEY (hotel_number)
  REFERENCES hotel (hotel_number);

-- 5) HOTEL_ROOM (will reference HOTEL)
CREATE TABLE hotel_room (
    hotel_room_id INT PRIMARY KEY,
    room_number   INT,
    hotel_number  INT, 
    price         DECIMAL(10,2),
    capacity      INT,
    amenities     VARCHAR(255),
    view          VARCHAR(255),
    extendable    BOOLEAN,
    known_issues  VARCHAR(255)
);

-- Foreign key from HOTEL_ROOM to HOTEL:
ALTER TABLE hotel_room
  ADD CONSTRAINT fk_hotelroom_hotel
  FOREIGN KEY (hotel_number)
  REFERENCES hotel (hotel_number);

-- 6) RESERVATION (joins USER and HOTEL_ROOM)
CREATE TABLE reservation (
    reservation_id INT PRIMARY KEY,
    customer_sin   INT,
    hotel_room_id  INT,
    status         VARCHAR(15),
    start_date     DATE,
    end_date       DATE,
    reservation_date DATE
);

-- Foreign keys from RESERVATION to USER and HOTEL_ROOM:
ALTER TABLE reservation
  ADD CONSTRAINT fk_reservation_user
  FOREIGN KEY (customer_sin)
  REFERENCES "user" (social_insurance_number);

ALTER TABLE reservation
  ADD CONSTRAINT fk_reservation_room
  FOREIGN KEY (hotel_room_id)
  REFERENCES hotel_room (hotel_room_id);



-- EMPLOYEE.hotel_number -> HOTEL(hotel_number)
ALTER TABLE employee
  ADD CONSTRAINT fk_employee_hotel
  FOREIGN KEY (hotel_number)
  REFERENCES hotel (hotel_number);

-- HOTEL.manager_id -> EMPLOYEE(employee_id)
ALTER TABLE hotel
  ADD CONSTRAINT fk_hotel_manager
  FOREIGN KEY (manager_id)
  REFERENCES employee (employee_id);


-- Implementing indexing 
-- Index sur reservation(customer_sin)
-- Cet index permet de localiser rapidement toutes les réservations effectuées par un client spécifique.
-- Nous prévoyons que les requêtes récupérant l'historique des réservations d'un utilisateur 
-- (par exemple, GET /users/:id/reservations) bénéficieront de cet index, car il réduit la recherche sur la colonne customer_sin.
CREATE INDEX idx_reservation_customer ON reservation(customer_sin);

-- Index sur hotel(chain_number)
-- Cet index accélère les requêtes qui filtrent ou joignent les données sur l'identifiant de la chaîne hôtelière.
-- Par exemple, lorsqu'on recherche tous les hôtels appartenant à une chaîne spécifique ou lors de jointures entre les tables hotel et hotel_chain,
-- l'index sur chain_number aide le moteur de base de données à trouver rapidement les enregistrements correspondants.
CREATE INDEX idx_hotel_chain_number ON hotel(chain_number);

-- Index sur reservation(hotel_room_id)
-- Cet index est utile pour les requêtes qui récupèrent les réservations d'une chambre d'hôtel spécifique.
-- Il est particulièrement pertinent lorsque plusieurs réservations sont associées à une même chambre,
-- par exemple dans les cas où l'on affiche toutes les réservations d'une chambre via l'endpoint GET /hotelrooms/:id/reservations.
CREATE INDEX idx_reservation_hotel_room ON reservation(hotel_room_id);


-- Insert values into tables

 -- Insert into hotel_chain
INSERT INTO hotel_chain (chain_number, name, street_number, street_name, city, state, zip_code, email, phone) VALUES
(1, 'Luxury Stays', 100, 'Main St', 'New York', 'NY', '10001', 'contact@luxurystays.com', '2125551234'),
(2, 'Budget Inn', 200, 'Market St', 'San Francisco', 'CA', '94103', 'info@budgetinn.com', '4155555678'),
(3, 'Comfort Suites', 300, 'Broadway', 'Chicago', 'IL', '60601', 'support@comfortsuites.com', '3125558765'),
(4, 'Elite Hotels', 400, '5th Ave', 'Seattle', 'WA', '98101', 'hello@elitehotels.com', '2065554321'),
(5, 'Grand Resorts', 500, 'Ocean Dr', 'Miami', 'FL', '33139', 'reservations@grandresorts.com', '3055553456');

-- Insert into hotel
INSERT INTO hotel (hotel_number, name, chain_number, street_number, street_name, city, state, zip_code, email, phone, manager_id, rating) VALUES
(1, 'Luxury Stays Downtown', 1, 120, 'Wall St', 'New York', 'NY', '10005', 'manager@luxurystays.com', '2125557890', NULL, 5),
(2, 'Budget Inn Central', 2, 220, 'Mission St', 'San Francisco', 'CA', '94110', 'manager@budgetinn.com', '4155556789', NULL, 3),
(3, 'Comfort Suites North', 3, 330, 'Lake Shore Dr', 'Chicago', 'IL', '60611', 'manager@comfortsuites.com', '3125552345', NULL, 4),
(4, 'Elite Hotels Bay Area', 4, 440, 'Pike St', 'Seattle', 'WA', '98102', 'manager@elitehotels.com', '2065556789', NULL, 5),
(5, 'Grand Resorts Beachfront', 5, 550, 'Collins Ave', 'Miami', 'FL', '33140', 'manager@grandresorts.com', '3055558765', NULL, 5);

-- Insert into hotel_room
INSERT INTO hotel_room (hotel_room_id, room_number, hotel_number, price, capacity, amenities, view, extendable, known_issues) VALUES
(1, 101, 1, 200.00, 2, 'WiFi, TV, Minibar', 'City View', TRUE, NULL),
(2, 102, 1, 180.00, 2, 'WiFi, TV', 'Garden View', FALSE, 'Leaky faucet'),
(3, 201, 2, 100.00, 1, 'WiFi, TV', 'Street View', TRUE, NULL),
(4, 301, 3, 150.00, 2, 'WiFi, TV, Coffee Maker', 'Lake View', FALSE, NULL),
(5, 401, 4, 220.00, 3, 'WiFi, TV, Jacuzzi', 'Bay View', TRUE, NULL);

-- Insert into user
INSERT INTO "user" (social_insurance_number, first_name, last_name, street_number, street_name, apt_number, city, state, zip_code, email, phone_number, creation_date) VALUES
(123456789, 'John', 'Doe', 123, 'Elm St', 4, 'New York', 'NY', '10001', 'john.doe@email.com', '2125559999', '2024-01-01'),
(987654321, 'Jane', 'Smith', 456, 'Oak St', 12, 'San Francisco', 'CA', '94103', 'jane.smith@email.com', '4155558888', '2024-02-15'),
(456789123, 'Alice', 'Brown', 789, 'Pine St', 2, 'Chicago', 'IL', '60601', 'alice.brown@email.com', '3125557777', '2024-03-10'),
(321654987, 'Bob', 'Wilson', 321, 'Maple St', NULL, 'Seattle', 'WA', '98101', 'bob.wilson@email.com', '2065556666', '2024-04-05'),
(654321789, 'Charlie', 'Davis', 654, 'Cedar St', 8, 'Miami', 'FL', '33139', 'charlie.davis@email.com', '3055555555', '2024-05-20');

-- Insert into employee
INSERT INTO employee (employee_id, user_id, hotel_number, role, password) VALUES
(1, 123456789, 1, 'Manager', 'pass1234'),
(2, 987654321, 2, 'Manager', 'pass5678'),
(3, 456789123, 3, 'Manager', 'pass9101'),
(4, 321654987, 4, 'Manager', 'pass1121'),
(5, 654321789, 5, 'Manager', 'pass3141');

INSERT INTO reservation (reservation_id, customer_sin, hotel_room_id, status, start_date, end_date, reservation_date) VALUES
(1, 123456789, 1, 'Confirmed', '2024-06-01', '2024-06-05', '2024-05-01'),
(2, 987654321, 2, 'Cancelled', '2024-07-10', '2024-07-15', '2024-06-20'),
(3, 456789123, 3, 'Pending', '2024-08-05', '2024-08-10', '2024-07-15'),
(4, 321654987, 4, 'Confirmed', '2024-09-01', '2024-09-03', '2024-08-20'),
(5, 654321789, 5, 'Confirmed', '2024-10-15', '2024-10-20', '2024-09-30');
