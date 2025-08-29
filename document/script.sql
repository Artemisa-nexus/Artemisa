DROP DATABASE IF EXISTS artemisa;
CREATE DATABASE IF NOT EXISTS artemisa;
USE artemisa;

-- =============================
-- ROLES TABLE 
-- =============================
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50)
);

-- =============================
-- USERS TABLE
-- =============================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100),
    identification VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password_ VARCHAR(255),
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
    event_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    event_date DATETIME NOT NULL,
    city VARCHAR(100) NOT NULL,
    organizer_id INT,
    image LONGBLOB,
    max_capacity INT NOT NULL DEFAULT 0,
    available_capacity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

-- =============================
-- EVENT PARTICIPANTS TABLE
-- =============================
CREATE TABLE event_participants (
    event_participant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- =============================
-- PUBLICATIONS TABLE (Feed)
-- =============================
CREATE TABLE publications (
    publication_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    content TEXT,
    image LONGBLOB,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reference_id INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =============================
-- SUPPORT TABLE
-- =============================
CREATE TABLE support (
    support_id INT PRIMARY KEY AUTO_INCREMENT,
    support_name VARCHAR(150),
    description VARCHAR(200),
    email varchar(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- VOLUNTEER_ORGS TABLE
-- =============================
CREATE TABLE volunteer_orgs (
    volunteer_org_id INT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(150) NOT NULL,
    tax_id VARCHAR(50) UNIQUE NOT NULL,
    legal_representative_name VARCHAR(150) NOT NULL,
    legal_representative_id VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================
-- GOALS TABLE (catalog of general goals)
-- =============================
CREATE TABLE goals (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- ACHIEVED_GOALS TABLE (linked to users)
-- =============================
CREATE TABLE achieved_goals (
    achieved_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    achieved_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (goal_id) REFERENCES goals(goal_id) ON DELETE CASCADE
);

-- =============================
-- BASE INSERTS
-- =============================

-- Roles
INSERT INTO roles (role_name)
VALUES 
    ('user'),
    ('volunteer');

-- Insert general goals catalog
INSERT INTO goals (title, description)
VALUES
('Primer paso solidario', 'Unirse a un voluntariado por primera vez.'),
('Agente de cambio', 'Asistir a 3 eventos organizados por fundaciones.'),
('Voz activa', 'Compartir una publicación de una fundación en la plataforma.'),
('Red de apoyo', 'Invitar a otra mujer a unirse a Artemisa.'),
('Mentora solidaria', 'Brindar apoyo o asesoría en un evento de formación.');

-- =============================
-- BASE INSERTS
-- =============================

INSERT INTO users (fullname, identification, email, password_, role_id)
VALUES 
    ('System Administrator', '0000000000', 'admin@artemisa.com', 'admin123', 2);

INSERT INTO publications (user_id, content, image, publication_date, reference_id)
VALUES (1, 'hola', 'dsfjdsfijdf', '2025-08-28 14:00:00', NULL);

select * from publications;

SELECT 
    p.publication_id,
    p.content,
    p.publication_date,
    u.fullname AS author
FROM publications p
INNER JOIN users u ON p.user_id = u.user_id;
