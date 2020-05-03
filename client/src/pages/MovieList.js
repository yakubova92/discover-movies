import React, { useState, useEffect } from 'react'
import { Button, Card, Dimmer, Divider, Input, Loader, Message } from 'semantic-ui-react'
import '../styles/MovieList.css'
import { Header, MovieCard } from '../components'
import { localUrl } from '../constants'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [popularDisplayed, setPopularDisplayed] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  async function fetchMovies() {
    setLoading(true)
    let url = searchQuery
      ? `${localUrl}/movies/?title=${searchQuery}&page=${page}`
      : `${localUrl}/movies/popular/?page=${page}`
    const res = await fetch(url)
    res.json().then(res => {
      if (res.error) {
        setError(res.error)
      }else {
        page === 1 ? setMovies(res.results) : setMovies([...movies, ...res.results])
        setTotalResults(res.totalResults)
        setLoading(false)
        searchQuery ? setPopularDisplayed(false) : setPopularDisplayed(true)
        setError(null)
      }
    }).catch(err => {
      setError(null)
      console.error(err)
    })
  }

  function handleSearchChange(value) {
    setSearchQuery(value)
    setPage(1)
  }

  useEffect(() => {
    fetchMovies()
  }, [searchQuery, page])

  return (
    <div>
      <Header />
      <div className='search-bar'>
        <Input
          className='search-bar'
          icon='search'
          loading={loading}
          placeholder='search by title'
          onChange={(e, { value }) => handleSearchChange(value)}
        />
      </div>
      {error &&
        <Message negative>
          <Message.Header>Oops! Something went wrong</Message.Header>
          <p>{error.message}</p>
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
          : <>
              <Divider horizontal className='result-description'>
                Displaying {movies.length} out of {totalResults} {popularDisplayed ? 'popular movies' : 'search results'}
              </Divider>
              <Card.Group centered doubling itemsPerRow={4}>
                {movies.map(movie => {
                  return (
                    <MovieCard key={movie.id} movie={movie} />
                  )
                })}
              </Card.Group>
                {movies.length < totalResults &&
                  <Button className='show-more-button' color='teal' size='big' onClick={() => setPage(page+1)}>
                    Show More
                  </Button>
                }
            </>
        }
      </div>
    </div>
  )
}

export default MovieList;
