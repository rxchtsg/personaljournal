Personal Reflection Journal

This is my project for the SE_19 module.
It started as a small static website from Hand-in 1 and 2 with three pages: index, entries, and about. Those were built with plain HTML and CSS. For Hand-in 3, I added a real backend, database, and dynamic pages.

Now the site runs on Node.js and Express, using EJS for templating and SQLite for storing my journal entries. It’s no longer just static pages- users can actually create, edit and delete entries!

What it does

It shows a list of all journal entries
It lets users add new entries
It allows editing and deleting existing ones
It has error handling and a 404 page
It still includes the old static version from before

How it’s built

Backend: Express.js and SQLite
Frontend: EJS templates and the original HTML/CSS files from earlier hand-ins

Project structure:

personaljournal/
backend/
├── server.js
├── db.js
├── views/
├── public/
└── data/journal.sqlite
frontend/
├── index.html
├── entries.html
└── about.html

How to run it

Open the terminal and go into the backend folder
cd backend

Install dependencies
npm install

Start the server
node server.js

Open the browser and go to
http://localhost:3001

Notes

The database file (journal.sqlite) is created automatically when the app runs.
If you delete it, the journal resets.
The old HTML pages are still in the frontend folder so you can see the original version before the backend was added.
