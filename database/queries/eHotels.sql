DROP DATABASE IF EXISTS hoteldb;
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

-- 2) USER  (Use double-quotes if 'user' is a reserved word in your SQL dialect)
CREATE TABLE "user" (
    social_insurance_number INT PRIMARY KEY,
    first_name    VARCHAR(50) NOT NULL,
    middle_name   VARCHAR(50),
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
    role        VARCHAR(15)
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
