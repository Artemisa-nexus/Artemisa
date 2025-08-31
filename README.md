# ARTEMISA

Artemisa is a digital space created by women, for women. It is a safe place for community, emotional support, and personal development. Its mission is to connect women who need help with organizations and volunteers ready to provide support, while fostering a space for collective growth.
---

## Features

- Register new users and organizations

- Create, view, update, and delete publications

- Create, view, and manage events(admin, orgn)

- Submit and manage support requests

- Track user achievements and goals

- Responsive interface for mobile devices

- Modern notifications with SweetAlert2

- Full backend integration using Express.js

--- 

## How to Run the Project

1.  **Clone the repository and go into the project folder:**
    ```bash
    git clone [https://github.com/Artemisa-nexus/Artemisa.git](https://github.com/Artemisa-nexus/Artemisa.git)
    cd Artemisa
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the MySQL database:**
    * Make sure you have MySQL installed and running.
    * Run the SQL script located at `docs/script.sql` to create the database and tables.

4.  **Start the backend server:**
    ```bash
    node server/server.js
    ```

5.  **Start the frontend (Vite dev server):**
    ```bash
    npm run dev
    ```

6.  **Open your browser and go to:** `http://localhost:5173/` (or the port shown in your terminal).

---

## Technologies Used

* **Frontend:** Tailwind CSS, HTML, JavaScript, Vite.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **UI Enhancements:** SweetAlert2.

---

## Database Normalization Explanation

---

## Advanced Queries Explanation

The backend has several advanced endpoints that return processed data from the database relationships:

* `/events/participants/total/:id`: Returns the total number of participants in a specific event.
* `/users/achievements/:id`: Lists all goals achieved by a specific user.
* `/events/upcoming`: Returns all upcoming events.
* `/publications/user/:id`: Shows all posts created by a specific user.
* `/volunteer-orgs/list`: Returns the complete list of registered volunteer organizations.
* `/support/requests`: Returns all support requests sent to the platform.

---

## Relational Model


*(Note: The original file had an image of the relational model. This file has been upload by github platform).*

---

## Future Improvements
- Enhance user profile management (edit profile, view achievements, manage subscriptions)

- Advanced analytics and reporting from the backend for community engagement and event participation

## Developer Information

**Valeria Cadena Yance**
* **Clan:** Caiman
* **Email:** valecade16@gmail.com

**Daniela Martinez Quinto**
* **Clan:** Caiman
* **Email:** daniela.m.quinto@outlook.es

**Yoshira Barrios Bernal**
* **Clan:** Caiman
* **Email:** barriosyoshira@gmail.com

**Giselle Palencia Toro**
* **Clan:** Caiman
* **Email:** giselleandrea027@gmail.com

**Juan Aaron Britto**
* **Clan:** Caiman
* **Email:** juanaaronbritto@outlook.com

Link repositorio: https://github.com/Artemisa-nexus/Artemisa

link to the cloud deployment: https://artemisa-one.vercel.app/artemisa/landing