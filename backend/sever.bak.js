// backend/server.js
// Express + EJS + SQLite journal (simple + readable)

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const entries = require('./db'); // <-- our SQLite "model" (backend/db.js)

const app = express();
const PORT = process.env.PORT || 3000;

// ----- view engine + static files -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ----- forms + method override (so we can PUT/DELETE from forms) -----
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ----- routes -----

// Home -> send to entries list
app.get('/', (req, res) => {
  res.redirect('/entries');
});

// INDEX: list all entries from DB
app.get('/entries', (req, res, next) => {
  entries.getAll((err, rows) => {
    if (err) return next(err);
    res.render('entries/index', { title: 'Entries', entries: rows });
  });
});

// NEW: show create form
app.get('/entries/new', (req, res) => {
  res.render('entries/new', { title: 'New Entry' });
