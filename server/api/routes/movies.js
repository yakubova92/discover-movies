const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const { API_URL } = require('../../constants')
const { api_key } = require('../../secrets')

router.get('/', (req, res, next) => {
  const title = req.query.title
  return fetch(`${API_URL}/search/movie?api_key=${api_key}&language=en-US&query=${title}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(json => res.send(json));
})

router.get('/popular', (req, res, next) => {
  return fetch(`${API_URL}/movie/popular?api_key=${api_key}&language=en-US&page=1`)
    .then(res => res.json())
    .then(json => res.send(json));
})

router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params
  return fetch(`${API_URL}/movie/${movieId}?api_key=${api_key}`)
    .then(res => res.json())
    .then(json => res.send(json));
})

module.exports = router
