import React, { useState, useEffect } from 'react'
import { Card, Image, Input, Message } from 'semantic-ui-react'
import { imageUrl, localUrl } from './constants'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({status: false, message: ''})

  async function fetchMovies() {
    setLoading(true)
    let url = searchQuery ? `${localUrl}/movies/?title=${searchQuery}` : `${localUrl}/movies/popular`
    const res = await fetch(url)
    res.json().then(res => {
      setMovies(res.results)
      setLoading(false)
      setError({status: false, message: ''})
    }).catch(err => {
      setError({status: true, message: err})
      console.error(err)
    })
  }

  useEffect(() => {
    fetchMovies()
  }, [searchQuery])

  return (
    <div>
      <Input icon='search' loading={loading} placeholder='search by title' onChange={e => setSearchQuery(e.target.value)}/>
      {error.status &&
        <Message negative>
          <Message.Header>Oops! Something went wrong</Message.Header>
          <p>{error.message}</p>
        </Message>
      }
      {movies && !movies.length
        ? <Message negative>
            <Message.Header>Sorry, no movies!</Message.Header>
          </Message>
        : <Card.Group centered doubling itemsPerRow={4}>
          {movies.map(movie => {
            return (
              <Card key={movie.id}>
                <Image src={`${imageUrl}/w342/${movie.poster_path}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{movie.title}</Card.Header>
                  <Card.Description>
                    {movie.vote_average}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign='left'>
                  {`${movie.overview.substring(0, 150)}...`}
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      }
    </div>
  )
}

export default Movies;
