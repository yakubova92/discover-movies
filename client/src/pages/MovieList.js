import React, { useState, useEffect } from 'react'
import { Card, Dimmer, Input, Loader, Message } from 'semantic-ui-react'
import '../styles/MovieList.css'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import { localUrl } from '../constants'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchMovies() {
    setLoading(true)
    let url = searchQuery ? `${localUrl}/movies/?title=${searchQuery}` : `${localUrl}/movies/popular`
    const res = await fetch(url)
    res.json().then(res => {
      setMovies(res)
      setLoading(false)
      setError('')
    }).catch(err => {
      setError('')
      console.error(err)
    })
  }

  useEffect(() => {
    fetchMovies()
  }, [searchQuery])

  return (
    <div>
      <Header />
      <div className='search-bar'>
        <Input
          className='search-bar'
          icon='search'
          loading={loading}
          placeholder='search by title'
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {error &&
        <Message negative>
          <Message.Header>Oops! Something went wrong</Message.Header>
        </Message>
      }
      <div>
        <Dimmer className='dimmer' active={loading}>
          <Loader />
        </Dimmer>
        {movies && !movies.length
          ? <Message negative>
              <Message.Header>Sorry, no movies!</Message.Header>
            </Message>
          : <Card.Group centered doubling itemsPerRow={4}>
            {movies.map(movie => {
              return (
                <MovieCard key={movie.id} movie={movie} />
              )
            })}
          </Card.Group>
        }
      </div>
    </div>
  )
}

export default MovieList;
