const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 5000;

const DB_NAME = "film_production";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "MOKsha1*2*3"
};

let pool;

app.use(cors());
app.use(express.json());

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`
    );

    await connection.end();

    pool = mysql.createPool({
      ...dbConfig,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS films (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        director VARCHAR(255) NOT NULL,
        release_date DATE NOT NULL,
        status VARCHAR(100) NOT NULL
      )
    `);

    console.log("Database and films table are ready.");
  } catch (error) {
    console.error(
      "Database initialization failed:",
      error.message
    );
  }
}

app.get("/api/films", async (req, res) => {
  try {
    const [films] = await pool.query(
      "SELECT * FROM films ORDER BY id DESC"
    );

    res.json(films);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch films."
    });
  }
});

app.post("/api/films", async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      release_date,
      status
    } = req.body;

    if (
      !title ||
      !genre ||
      !director ||
      !release_date ||
      !status
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO films
      (title, genre, director, release_date, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        title.trim(),
        genre.trim(),
        director.trim(),
        release_date,
        status
      ]
    );

    const [newFilm] = await pool.query(
      "SELECT * FROM films WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(newFilm[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add film."
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found."
  });
});

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}`
    );
  });
});