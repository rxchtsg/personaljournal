// backend/server.js
console.log('>>> FULL APP LOADED (EJS + DB + CRUD)');
console.log('>>> USING FILE:', __filename);

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const entries = require('./db');

const app = express();
const port = 3001; // fixed to 3001 so we can be 100% sure

// --- Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend'))); // <--
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Request logger so we SEE each hit
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check (prove we’re on the right server/port)
app.get('/healthz', (req, res) => res.send('alive on 3001'));

// --- Routes ---
app.get('/', (req, res) => {
  res.redirect('/entries');
});

// INDEX
app.get('/entries', (req, res, next) => {
  entries.getAll((err, rows) => {
    if (err) return next(err);
    res.render('entries/index', { title: 'Entries', entries: rows });
  });
});

// NEW
app.get('/entries/new', (req, res) => {
  res.render('entries/new', { title: 'New Entry' });
});

// CREATE
app.post('/entries', (req, res, next) => {
  const { title, body } = req.body;
  entries.create(title, body, (err, id) => {
    if (err) return next(err);
    console.log(`✅ Created new entry #${id}`);
    res.redirect(`/entries/${id}`);
  });
});

// SHOW
app.get('/entries/:id', (req, res, next) => {
  entries.getById(req.params.id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).render('404', { title: 'Not Found' });
    res.render('entries/show', { title: row.title, entry: row });
  });
});

// EDIT
app.get('/entries/:id/edit', (req, res, next) => {
  entries.getById(req.params.id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).render('404', { title: 'Not Found' });
    res.render('entries/edit', { title: 'Edit Entry', entry: row });
  });
});

// UPDATE
app.put('/entries/:id', (req, res, next) => {
  const { title, body } = req.body;
  entries.update(req.params.id, title, body, (err) => {
    if (err) return next(err);
    console.log(`✏️ Updated entry #${req.params.id}`);
    res.redirect(`/entries/${req.params.id}`);
  });
});

// DELETE
app.delete('/entries/:id', (req, res, next) => {
  entries.remove(req.params.id, (err) => {
    if (err) return next(err);
    console.log(`🗑️ Deleted entry #${req.params.id}`);
    res.redirect('/entries');
  });
});

// 404 + errors
app.use((req, res) => res.status(404).render('404', { title: 'Not Found' }));
app.use((err, req, res, next) => { console.error('🔥 SERVER ERROR:', err); res.status(500).send('Server error'); });

// Start
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
