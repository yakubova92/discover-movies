import React, { useState, useEffect } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { imageUrl, localUrl } from './constants'

const Movies = () => {
  const [movies, setMovies] = useState([])

  async function fetchData() {
    const res = await fetch(`${localUrl}/movies/popular`);
    res.json().then(res => setMovies(res.results)).catch(err => console.log('ERR!!', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {movies &&
        <Card.Group centered doubling itemsPerRow={4}>
          {movies.map(movie => {
            return (
              <Card>
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
