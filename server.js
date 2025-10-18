// simple express backend for my reflection journal
// kinda basic but it works for what i need

const express = require('express')
const app = express()
const port = 3000

// fake "entries" - same as what’s in my HTML page
const entries = [
  { id: 1, title: 'Day 1', text: 'Honestly I don’t know what to write but here we go. Learned a bit about HTML today, kinda confusing, this comes to me a lot slower but I want to at least be able to grasp the basics well.' },
  { id: 2, title: 'Day 2', text: 'I was sick so I did not make it to class this week. Self learning it is... Tried to make the site look better with CSS. Didn’t work that great but at least I got some colors on the page.' }
]

// home
app.get('/', (req, res) => {
  res.send('<h1>My Reflection Journal Backend</h1><p>Try /about or /entries</p>')
})

// about
app.get('/about', (req, res) => {
  res.send('<h1>About</h1><p>This is just my backend version of my personal journal project.</p>')
})

// all entries
app.get('/entries', (req, res) => {
  const list = entries.map(e => `<li><a href="/entries/${e.id}">${e.title}</a></li>`).join('')
  res.send(`<h1>All Entries</h1><ul>${list}</ul>`)
})

// dynamic route - show one entry based on its id
app.get('/entries/:id', (req, res) => {
  const entry = entries.find(e => e.id == req.params.id)
  if (!entry) return res.send('<p>Entry not found</p>')
  res.send(`<h1>${entry.title}</h1><p>${entry.text}</p>`)
})

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`)
})
