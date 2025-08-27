DROP DATABASE IF EXISTS artemisa;
CREATE DATABASE IF NOT EXISTS artemisa;
USE artemisa;

-- =============================
-- ROLES TABLE 
-- =============================
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name_rol VARCHAR(50)
);

-- =============================
-- USERS TABLE
-- =============================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100),
    identification VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- =============================
-- EVENTS TABLE
-- =============================
CREATE TABLE events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100),
    description TEXT,
    category VARCHAR(100),
    event_date DATETIME,
    city VARCHAR(100),
    organizer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

-- =============================
-- EVENT PARTICIPANTS TABLE
-- =============================
CREATE TABLE event_participant (
    event_participant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- =============================
-- PUBLICATION (FEED) TABLE
-- =============================
CREATE TABLE publication (
    publication_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    publication_type ENUM('text', 'event', 'product', 'course', 'blog'),
    reference_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =============================
-- SUPPORT TABLE
-- =============================
CREATE TABLE support (
    support_id INT PRIMARY KEY AUTO_INCREMENT,
    support_name VARCHAR(150),
    description VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name_rol)
VALUES 
    ('user'),
    ('voluntaria'),
    ('fundacion');