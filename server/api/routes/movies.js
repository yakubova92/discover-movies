const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const title = req.query.title
  res.status(200).json({
    message: 'get search results'
  })
})

router.get('/popular', (req, res, next) => {
  res.status(200).json({
    message: 'get popular movies'
  })
})

router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params.movieId
  res.status(200).json({
    message: 'get movie details'
  })
})

module.exports = router
