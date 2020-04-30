const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const movieRoutes = require('./api/routes/movies')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/movies', movieRoutes)

app.get('/health-check', (req, res) => {
  res.send('ok');
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app
