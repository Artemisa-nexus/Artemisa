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
    status ENUM('active', 'inactive') DEFAULT 'active',
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
    reward VARCHAR(100) DEFAULT 'star',
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
    ('volunteer'),
    ('foundation');

-- Insert general goals catalog
INSERT INTO goals (title, description)
VALUES
('Asistir a un evento', 'Participar en al menos un evento de la comunidad.'),
('Completar el perfil', 'Subir foto de perfil y completar datos personales.'),
('Publicar un emprendimiento', 'Publicar al menos un producto o servicio en la plataforma.'),
('Apoyar un emprendimiento', 'Comentar o dar like a un emprendimiento.'),
('Unirse a un voluntariado', 'Registrarse en al menos un voluntariado.');
