const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initial data
let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// Define routes
// GET all items
app.get('/', function(req, res, next) {
  res.json(data);
});

// POST to create a new item
app.post('/', function(req, res, next) {
  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
});

// PUT to update an item
app.put('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  data = data.map(item => (item.id === id ? updatedItem : item));
  res.json(updatedItem);
});

// DELETE to remove an item
app.delete('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  data = data.filter(item => item.id !== id);
  res.sendStatus(204);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
