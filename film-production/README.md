# Film Production Management System

Simple CIE-2 project using React, Express, Node.js and MySQL.

## Structure

```text
film-production/
├── server/
│   └── server.js
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── FilmCard.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Films.jsx
    │   │   └── AddFilm.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## Run
1. Install Node.js and MySQL.
2. In `server/server.js`, replace `YOUR_MYSQL_PASSWORD` with your MySQL password.
3. Terminal 1: `cd server` then `npm install` then `npm start`.
4. Terminal 2: `cd client` then `npm install` then `npm run dev`.
5. Open the Vite URL shown in the terminal.

The server automatically creates the `film_production` database and `films` table.`