import cors from "cors"
import express from "express"
import { pool } from "./conexion_db.js"

const app = express()
app.use(cors()) // esto permite que la aplicacion backend pueda ser consumida por una aplicacion frontend
app.use(express.json()) // permite que Express interprete automáticamente el body en JSON cuando recibes una petición POST o PUT.

app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users`);
        res.json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.get('/users/:id_user', async (req, res) => {
    try {
        const { id_user } = req.paramas

        const [rows] = await pool.query(`
            SELECT  
              c.id_user,
              c.identification,
              c.email,
              c.contraseña,
              c.ciudad,
            FROM users WHERE id_user = ?`, [id_user]);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }

});

app.post('/users', async (req, res) => {
    console.log(req.body)

    try {
        const {
            name,
            identification,
            email,
            password,
        } = req.body



        const query = `
        INSERT INTO users (name, identification, email, password)
        values(?,?,?,?)
        `
        const values = [
            name,
            identification,
            email,
            password
        ]

        const [result] = await pool.query(query, values)

        res.status(201).json({
            mensaje: 'users created',
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });

    }

})

app.put('/users/:id_user', async (req, res) => {
    try {
        const { id_user

        } = req.params

        const {
            identification,
            name,
            email,
            password
        } = req.body

        const query = `
        UPDATE users SET
            id_user = ?,
            identification = ?,
            name = ?,
            email = ?,
            password = ?, WHERE id_user = ?
        `
        const values = [
            identification,
            name,
            email,
            password,
            id_user

        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "prestamos actualizado" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }

});

app.delete('/users/:id_user', async (req, res) => {
    try {
        const { id_user

        } = req.params

        const query = `
        DELETE FROM users WHERE id_user = ?
        `
        const values = [id_user

        ]


        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "users deleted" })
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.get('/communities', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM communities`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.get('/communities/:id_community', async (req, res) => {
    try {
        const { id_community } = req.params

        const [rows] = await pool.query(`
            
            SELECT 
            l.community_name ,
            l.description ,
            p.city ,
            p.creator_id ,
            p.creation_date 
                
            FROM communities l
            LEFT JOIN community u ON p.id_community = u.id_community
            LEFT JOIN communities l ON p.isbn = 
            `, [i]);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});


app.listen(3000, () => {
    console.log("servidor prepado correctamente en http://localhost:3000");
});



