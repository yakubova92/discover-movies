const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const { API_URL } = require('../../constants')
const { api_key } = require('../../secrets')

const checkStatus = res => {
  if (res.ok) return res
  throw new Error(`Received ${res.status} status from MovieDB Api`)
}

const mapForUI = result => {
  return result.results.map(movie => {
    return {
      id: movie.id,
      overview: movie.overview ? `${movie.overview.substring(0, 150)}...` : '',
      poster_path: movie.poster_path,
      release_date: movie.release_date ? movie.release_date.substring(0,4) : '',
      title: movie.title,
      vote_average: movie.vote_average,
    }
  })
}

router.get('/', (req, res, next) => {
  const { title, page } = req.query
  return fetch(`${API_URL}/search/movie?api_key=${api_key}&language=en-US&query=${title}&page=${page}&include_adult=false`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send({
      totalResults: json.total_results,
      results: mapForUI(json)
    }))
    .catch(err => next(err))
})

router.get('/popular', (req, res, next) => {
  const { page } = req.query
  return fetch(`${API_URL}/movie/popular?api_key=${api_key}&language=en-US&page=${page}`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send({
      totalResults: json.total_results,
      results: mapForUI(json)
    }))
    .catch(err => next(err))
})

router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params
  return fetch(`${API_URL}/movie/${movieId}?api_key=${api_key}&append_to_response=credits`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => res.send({
        id: json.id,
        backdrop_path: json.backdrop_path,
        genres: json.genres,
        mainCast: json.credits.cast.slice(0,5),
        overview: json.overview,
        poster_path: json.poster_path,
        release_date: json.release_date,
        status: json.status,
        tagline: json.tagline,
        title: json.title,
        vote_average: json.vote_average,
      })
    )
    .catch(err => next(err))
})

module.exports = router
