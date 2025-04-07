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
    reservation_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
(1, 'Ocean Breeze Inn', 1, 120, 'Seaside Blvd', 'Santa Monica', 'CA', '90401', 'ocean1@staymail.com', '3105551001', NULL, 5),
(2, 'Palm Garden Hotel', 1, 120, 'Sunset Ave', 'Long Beach', 'CA', '90802', 'palm2@staymail.com', '3105551002', NULL, 5),
(3, 'Coastal Comfort Suites', 1, 120, 'Harbor St', 'Newport Beach', 'CA', '92660', 'coastal3@staymail.com', '3105551003', NULL, 5),
(4, 'Beachfront Palace', 1, 130, 'PCH Blvd', 'Venice', 'CA', '90291', 'beachfront4@staymail.com', '3105551004', NULL, 5),
(5, 'Sunset Horizon Hotel', 1, 140, 'Ocean Ave', 'Malibu', 'CA', '90265', 'sunset5@staymail.com', '3105551005', NULL, 5),
(6, 'Sandy Shores Resort', 1, 150, 'Beach Rd', 'Santa Barbara', 'CA', '93101', 'sandy6@staymail.com', '3105551006', NULL, 5),
(7, 'Harborview Inn', 1, 160, 'Marine St', 'Laguna Beach', 'CA', '92651', 'harborview7@staymail.com', '3105551007', NULL, 5),
(8, 'Pacific Bay Resort', 1, 170, 'Ocean Front Walk', 'Santa Monica', 'CA', '90402', 'pacific8@staymail.com', '3105551008', NULL, 5),

(9, 'Urban Nest Suites', 2, 220, 'Broadway Ave', 'Denver', 'CO', '80203', 'urban9@nestmail.com', '7205552009', NULL, 3),
(10, 'Cityview Inn', 2, 220, 'Lincoln St', 'Boulder', 'CO', '80302', 'cityview10@nestmail.com', '7205552010', NULL, 3),
(11, 'Downtown Vibe Hotel', 2, 220, '16th St', 'Aurora', 'CO', '80010', 'vibe11@nestmail.com', '7205552011', NULL, 3),
(12, 'Mountain Peak Lodge', 2, 230, 'Elm St', 'Colorado Springs', 'CO', '80903', 'peak12@nestmail.com', '7205552012', NULL, 3),
(13, 'Riverside Inn', 2, 240, 'River Rd', 'Fort Collins', 'CO', '80524', 'riverside13@nestmail.com', '7205552013', NULL, 3),
(14, 'Vibrant City Hotel', 2, 250, 'Park Ave', 'Denver', 'CO', '80203', 'vibrant14@nestmail.com', '7205552014', NULL, 3),
(15, 'Skyline Suites', 2, 260, 'Glenwood Ave', 'Broomfield', 'CO', '80021', 'skyline15@nestmail.com', '7205552015', NULL, 3),
(16, 'Golden Peak Resort', 2, 270, 'Cascade Ave', 'Colorado Springs', 'CO', '80903', 'golden16@nestmail.com', '7205552016', NULL, 3),

(17, 'Maple Leaf Inn', 3, 330, 'Queen St', 'Toronto', 'ON', 'M5V1Z4', 'maple17@canadastay.ca', '4165553001', NULL, 4),
(18, 'Northern Comfort Lodge', 3, 330, 'King St', 'Ottawa', 'ON', 'K1P5J9', 'northern18@canadastay.ca', '4165553002', NULL, 4),
(19, 'Harborview Hotel', 3, 330, 'Bay St', 'Mississauga', 'ON', 'L5B3Y3', 'harbor19@canadastay.ca', '4165553003', NULL, 4),
(20, 'Tranquil Waters Resort', 3, 340, 'Lakeview St', 'Hamilton', 'ON', 'L8P1J6', 'tranquil20@canadastay.ca', '4165553004', NULL, 4),
(21, 'Lakefront Lodge', 3, 350, 'Shoreline Dr', 'Vancouver', 'BC', 'V5K1G7', 'lakefront21@canadastay.ca', '4165553005', NULL, 4),
(22, 'Highland Park Inn', 3, 360, 'Cedar Ave', 'Toronto', 'ON', 'M4E2N1', 'highland22@canadastay.ca', '4165553006', NULL, 4),
(23, 'Whistler Peak Resort', 3, 370, 'Mountain Rd', 'Whistler', 'BC', 'V0N1B3', 'whistler23@canadastay.ca', '4165553007', NULL, 4),
(24, 'Shoreline Suites', 3, 380, 'Beach Ave', 'Victoria', 'BC', 'V8W1N5', 'shoreline24@canadastay.ca', '4165553008', NULL, 4),

(25, 'Cedar Point Hotel', 4, 440, 'Bay St', 'Vancouver', 'BC', 'V6B2W9', 'cedar25@weststay.com', '6045554001', NULL, 5),
(26, 'Pacific Horizon Inn', 4, 440, 'Granville St', 'Richmond', 'BC', 'V7C4N2', 'horizon26@weststay.com', '6045554002', NULL, 5),
(27, 'Harbor Lights Hotel', 4, 440, 'Robson St', 'Burnaby', 'BC', 'V5C6P6', 'harbor27@weststay.com', '6045554003', NULL, 5),
(28, 'Seabreeze Resort', 4, 450, 'Ocean Dr', 'White Rock', 'BC', 'V4B1C4', 'seabreeze28@weststay.com', '6045554004', NULL, 5),
(29, 'Skyline Resort', 4, 460, 'Sunset Blvd', 'North Vancouver', 'BC', 'V7L1B1', 'skyline29@weststay.com', '6045554005', NULL, 5),
(30, 'Golden Bay Inn', 4, 470, 'Pacific Ave', 'Surrey', 'BC', 'V3T1X6', 'golden30@weststay.com', '6045554006', NULL, 5),
(31, 'Riverfront Lodge', 4, 480, 'River Rd', 'Abbotsford', 'BC', 'V2S1X1', 'riverfront31@weststay.com', '6045554007', NULL, 5),
(32, 'Coastline Suites', 4, 490, 'Seaview Dr', 'Richmond', 'BC', 'V7E3A3', 'coastline32@weststay.com', '6045554008', NULL, 5),

(33, 'Sapphire Shores Resort', 5, 550, 'Ocean Dr', 'San Diego', 'CA', '92109', 'sapphire33@beachresort.com', '8585555001', NULL, 5),
(34, 'Golden Sands Retreat', 5, 550, 'Palm Ave', 'Santa Cruz', 'CA', '95060', 'golden34@beachresort.com', '8585555002', NULL, 5),
(35, 'Coral Cove Hotel', 5, 550, 'Shoreline Blvd', 'Monterey', 'CA', '93940', 'coral35@beachresort.com', '8585555003', NULL, 5),
(36, 'Sunset Bay Inn', 5, 560, 'Coast Rd', 'Santa Barbara', 'CA', '93109', 'sunset36@beachresort.com', '8585555004', NULL, 5),
(37, 'Coco Beach Resort', 5, 570, 'Oceanfront Blvd', 'Laguna Beach', 'CA', '92651', 'coco37@beachresort.com', '8585555005', NULL, 5),
(38, 'Bayside Retreat', 5, 580, 'Harbor Dr', 'San Diego', 'CA', '92101', 'bayside38@beachresort.com', '8585555006', NULL, 5),
(39, 'Island Paradise Resort', 5, 590, 'Tropical St', 'Palm Springs', 'CA', '92262', 'island39@beachresort.com', '8585555007', NULL, 5),
(40, 'Lagoon View Hotel', 5, 600, 'Lagoon Rd', 'Santa Monica', 'CA', '90403', 'lagoon40@beachresort.com', '8585555008', NULL, 5);

-- Hotel 1 (Ocean Breeze Inn)
INSERT INTO hotel_room (hotel_room_id, room_number, hotel_number, price, capacity, amenities, view, extendable, known_issues) VALUES
(1, 101, 1, 150, 2, 'WiFi, AC, TV', 'Ocean View', true, NULL),
(2, 102, 1, 180, 3, 'WiFi, AC, TV, Mini-fridge', 'Sea View', true, NULL),
(3, 103, 1, 220, 4, 'WiFi, AC, TV, Balcony', 'Ocean View', false, 'Faint water leak'),
(4, 104, 1, 250, 2, 'WiFi, AC, TV, King Bed', 'Sea View', true, NULL),
(5, 105, 1, 300, 5, 'WiFi, AC, TV, Jacuzzi', 'Ocean View', false, NULL),

-- Hotel 2 (Palm Garden Hotel)
(6, 201, 2, 140, 2, 'WiFi, AC, TV', 'Garden View', true, NULL),
(7, 202, 2, 160, 3, 'WiFi, AC, TV, Mini-fridge', 'Pool View', true, NULL),
(8, 203, 2, 210, 4, 'WiFi, AC, TV, Balcony', 'Garden View', false, NULL),
(9, 204, 2, 230, 2, 'WiFi, AC, TV, King Bed', 'Pool View', true, NULL),
(10, 205, 2, 280, 5, 'WiFi, AC, TV, Jacuzzi', 'Garden View', false, 'Minor plumbing issues'),

-- Hotel 3 (Coastal Comfort Suites)
(11, 301, 3, 160, 2, 'WiFi, AC, TV', 'Ocean View', true, NULL),
(12, 302, 3, 180, 3, 'WiFi, AC, TV, Mini-fridge', 'Sea View', true, NULL),
(13, 303, 3, 230, 4, 'WiFi, AC, TV, Balcony', 'Ocean View', false, NULL),
(14, 304, 3, 270, 2, 'WiFi, AC, TV, King Bed', 'Sea View', true, NULL),
(15, 305, 3, 320, 5, 'WiFi, AC, TV, Jacuzzi', 'Ocean View', false, 'Faint electrical issue'),

-- Hotel 4 (Urban Nest Suites)
(16, 401, 4, 130, 2, 'WiFi, AC, TV', 'City View', true, NULL),
(17, 402, 4, 150, 3, 'WiFi, AC, TV, Mini-fridge', 'Street View', true, NULL),
(18, 403, 4, 200, 4, 'WiFi, AC, TV, Balcony', 'City View', false, NULL),
(19, 404, 4, 220, 2, 'WiFi, AC, TV, King Bed', 'Street View', true, NULL),
(20, 405, 4, 270, 5, 'WiFi, AC, TV, Jacuzzi', 'City View', false, 'Water pressure fluctuation'),

-- Hotel 5 (Cityview Inn)
(21, 501, 5, 170, 2, 'WiFi, AC, TV', 'Garden View', true, NULL),
(22, 502, 5, 190, 3, 'WiFi, AC, TV, Mini-fridge', 'Park View', true, NULL),
(23, 503, 5, 240, 4, 'WiFi, AC, TV, Balcony', 'Garden View', false, NULL),
(24, 504, 5, 260, 2, 'WiFi, AC, TV, King Bed', 'Park View', true, NULL),
(25, 505, 5, 310, 5, 'WiFi, AC, TV, Jacuzzi', 'Garden View', false, 'Minor heating issue'),

-- Hotel 6 (Downtown Vibe Hotel)
(26, 601, 6, 180, 2, 'WiFi, AC, TV', 'Downtown View', true, NULL),
(27, 602, 6, 200, 3, 'WiFi, AC, TV, Mini-fridge', 'Street View', true, NULL),
(28, 603, 6, 240, 4, 'WiFi, AC, TV, Balcony', 'Downtown View', false, NULL),
(29, 604, 6, 260, 2, 'WiFi, AC, TV, King Bed', 'Street View', true, NULL),
(30, 605, 6, 310, 5, 'WiFi, AC, TV, Jacuzzi', 'Downtown View', false, 'Minor plumbing issues'),

-- Hotel 7 (Maple Leaf Inn)
(31, 701, 7, 200, 2, 'WiFi, AC, TV', 'Forest View', true, NULL),
(32, 702, 7, 220, 3, 'WiFi, AC, TV, Mini-fridge', 'Mountain View', true, NULL),
(33, 703, 7, 260, 4, 'WiFi, AC, TV, Balcony', 'Forest View', false, NULL),
(34, 704, 7, 280, 2, 'WiFi, AC, TV, King Bed', 'Mountain View', true, NULL),
(35, 705, 7, 330, 5, 'WiFi, AC, TV, Jacuzzi', 'Forest View', false, 'Faint electrical issue'),

-- Hotel 8 (Northern Comfort Lodge)
(36, 801, 8, 170, 2, 'WiFi, AC, TV', 'River View', true, NULL),
(37, 802, 8, 190, 3, 'WiFi, AC, TV, Mini-fridge', 'Forest View', true, NULL),
(38, 803, 8, 240, 4, 'WiFi, AC, TV, Balcony', 'River View', false, NULL),
(39, 804, 8, 260, 2, 'WiFi, AC, TV, King Bed', 'Forest View', true, NULL),
(40, 805, 8, 310, 5, 'WiFi, AC, TV, Jacuzzi', 'River View', false, 'Minor heating issue'),

-- Hotel 9 (Harborview Hotel)
(41, 901, 9, 190, 2, 'WiFi, AC, TV', 'Lake View', true, NULL),
(42, 902, 9, 210, 3, 'WiFi, AC, TV, Mini-fridge', 'City View', true, NULL),
(43, 903, 9, 250, 4, 'WiFi, AC, TV, Balcony', 'Lake View', false, NULL),
(44, 904, 9, 270, 2, 'WiFi, AC, TV, King Bed', 'City View', true, NULL),
(45, 905, 9, 320, 5, 'WiFi, AC, TV, Jacuzzi', 'Lake View', false, 'Faint water leak'),

-- Hotel 10 (Cedar Point Hotel)
(46, 1001, 10, 220, 2, 'WiFi, AC, TV', 'Mountain View', true, NULL),
(47, 1002, 10, 240, 3, 'WiFi, AC, TV, Mini-fridge', 'Park View', true, NULL),
(48, 1003, 10, 280, 4, 'WiFi, AC, TV, Balcony', 'Mountain View', false, NULL),
(49, 1004, 10, 300, 2, 'WiFi, AC, TV, King Bed', 'Park View', true, NULL),
(50, 1005, 10, 350, 5, 'WiFi, AC, TV, Jacuzzi', 'Mountain View', false, 'Minor plumbing issues'),

-- Hotel 11 (Pacific Horizon Inn)
(51, 1101, 11, 180, 2, 'WiFi, AC, TV', 'Bay View', true, NULL),
(52, 1102, 11, 200, 3, 'WiFi, AC, TV, Mini-fridge', 'City View', true, NULL),
(53, 1103, 11, 240, 4, 'WiFi, AC, TV, Balcony', 'Bay View', false, NULL),
(54, 1104, 11, 260, 2, 'WiFi, AC, TV, King Bed', 'City View', true, NULL),
(55, 1105, 11, 300, 5, 'WiFi, AC, TV, Jacuzzi', 'Bay View', false, 'Faint electrical issue'),

-- Hotel 12 (Harbor Lights Hotel)
(56, 1201, 12, 200, 2, 'WiFi, AC, TV', 'Ocean View', true, NULL),
(57, 1202, 12, 220, 3, 'WiFi, AC, TV, Mini-fridge', 'Bay View', true, NULL),
(58, 1203, 12, 260, 4, 'WiFi, AC, TV, Balcony', 'Ocean View', false, NULL),
(59, 1204, 12, 280, 2, 'WiFi, AC, TV, King Bed', 'Bay View', true, NULL),
(60, 1205, 12, 320, 5, 'WiFi, AC, TV, Jacuzzi', 'Ocean View', false, 'Minor plumbing issues');

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

Insert INTO reservation (customer_sin, hotel_room_id, status, start_date, end_date, reservation_date)
VALUES (123456789,3,'reserved','2025-04-10','2025-04-12','2025-04-01'),
(987654321,1,'active','2025-04-06','2025-04-12','2025-03-30'),
(456789123,5,'reserved','2025-04-12','2025-04-17','2025-04-04'),
(321654987,2,'active','2025-04-06','2025-04-10','2025-04-02'),
(654321789,4,'archived','2025-03-31','2025-04-03','2025-03-25')
