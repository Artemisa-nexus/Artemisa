DROP DATABASE IF EXISTS artemisa;
CREATE DATABASE IF NOT EXISTS artemisa;
USE artemisa;
-- =============================
-- USERS TABLE
-- =============================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    identification VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- METAS (GOALS) TABLE
-- =============================
CREATE TABLE metas (
    meta_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =============================
-- OBJETIVOS (OBJECTIVES) TABLE
-- =============================
CREATE TABLE objectives (
    objective_id INT PRIMARY KEY AUTO_INCREMENT,
    meta_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    FOREIGN KEY (meta_id) REFERENCES metas(meta_id) ON DELETE CASCADE
);


-- =============================
-- EVENTSS TABLE
-- =============================
CREATE TABLE eventss (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    event_date DATETIME NOT NULL,
    city VARCHAR(100),
    organizer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (user_id)
);

-- =============================
-- EVENT PARTICIPANTS
-- =============================
CREATE TABLE event_participant (
    event_participant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (event_id) REFERENCES eventss (event_id)
);

-- =============================
-- PRODUCTS TABLE (Adjusted)
-- =============================
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- Changed from marketplace_id
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) -- Added foreign key to users
);

-- =============================
-- COURSES & BLOGS
-- =============================
CREATE TABLE course_blogs (
    course_blog_id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('course', 'blog') NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    user_id INT,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- =============================
-- FRIENDS
-- =============================
CREATE TABLE friends (
    friendship_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    friend_id INT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_date TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (friend_id) REFERENCES users (user_id)
);

-- =============================
-- PUBLICATION (FEED) TABLE
-- =============================
CREATE TABLE publicacion (
    publication_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    publication_type ENUM('text', 'event', 'product', 'course', 'blog'),
    reference_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);