import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Grid, Icon, Image, Input, Label, Message } from 'semantic-ui-react'
import { imageUrl, localUrl } from '../constants'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchMovies() {
    setLoading(true)
    let url = searchQuery ? `${localUrl}/movies/?title=${searchQuery}` : `${localUrl}/movies/popular`
    const res = await fetch(url)
    res.json().then(res => {
      setMovies(res.results)
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
      <Input icon='search' loading={loading} placeholder='search by title' onChange={e => setSearchQuery(e.target.value)}/>
      {error &&
        <Message negative>
          <Message.Header>Oops! Something went wrong</Message.Header>
        </Message>
      }
      {movies && !movies.length
        ? <Message negative>
            <Message.Header>Sorry, no movies!</Message.Header>
          </Message>
        : <Card.Group centered doubling itemsPerRow={4}>
          {movies.map(movie => {
            return (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <Card style={{margin: '20px'}}>
                  <Image src={`${imageUrl}/w342/${movie.poster_path}`} wrapped ui={false} rounded/>
                  <Card.Content>
                    <Card.Header>{movie.title}</Card.Header>
                    <Card.Description>
                      {`${movie.overview.substring(0, 150)}...`}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra textAlign='left'>
                    <Label color='teal' size='large'>
                      <Icon name='star' color='yellow'/>{movie.vote_average}
                    </Label>
                  </Card.Content>
                </Card>
              </Link>
            )
          })}
        </Card.Group>
      }
    </div>
  )
}

export default Movies;
