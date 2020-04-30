const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const { API_URL } = require('../../constants')
const { api_key } = require('../../secrets')

const checkStatus = res => {
  if (res.ok) return res
  throw new Error(`Something went wrong: Received ${res.status} status from MovieDB Api`)
}

router.get('/', (req, res, next) => {
  console.log('req.query', req.query)
  const title = req.query.title
  return fetch(`${API_URL}/search/movie?api_key=${api_key}&language=en-US&query=${title}&page=1&include_adult=false`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => next(err))
})

router.get('/popular', (req, res, next) => {
  return fetch(`${API_URL}/movie/popular?api_key=${api_key}&language=en-US&page=1`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => next(err))
})

router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params
  return fetch(`${API_URL}/movie/${movieId}?api_key=${api_key}`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => next(err))
})

module.exports = router
