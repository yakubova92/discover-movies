import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../MovieDetails.css'
import { Card, Grid, Icon, Image, Label, Message } from 'semantic-ui-react'
import { imageUrl, localUrl } from '../constants'

const MovieDetails = ({match}) => {
  const { movieId } = match.params
  const [movie, setMovie] = useState({})
  const [error, setError] = useState('')

  async function fetchMovieDetails() {
    let url = `${localUrl}/movies/${movieId}`
    const res = await fetch(url)
    res.json().then(res => {
      setMovie(res)
      setError('')
    }).catch(err => {
      console.error(err)
      setError(err)
    })
  }

  useEffect(() => {
    fetchMovieDetails()
  }, [movieId])

  return (
    <div>
      <Link to={'/'}> All movies </Link>
      {error
        ? <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
          </Message>
        : <div className='backdrop' style={{backgroundImage: `url(${imageUrl}/w1280/${movie.backdrop_path})`}}>
            <div className='content'>
              <Grid columns={2} stackable>
                <Grid.Column textAlign='center' width={6}>
                  <Grid.Row>
                    <Image bordered rounded wrapped src={`${imageUrl}/w342/${movie.poster_path}`} />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className='description-column'>
                  <h1>{movie.title}</h1>
                  <Label color='teal' size='large'>
                    <Icon name='star' color='yellow'/>{movie.vote_average}
                  </Label>
                  <h4>
                    {movie.status === 'Released' ? movie.release_date : movie.status}
                    {movie.genres && movie.genres.map(genre => {
                      return <span key={genre.id}> | {genre.name} </span>
                    })}
                  </h4>
                  <h3>{movie.tagline}</h3>
                  <p>{movie.overview}</p>
                  {movie.mainCast && (
                    <Card.Group itemsPerRow={5} className='cast-card-group'>
                      {movie.mainCast.map(member => {
                        return (
                          <Card>
                            <Image size='small' rounded wrapped src={`${imageUrl}/w185/${member.profile_path}`} />
                            <Card.Header>{member.name}</Card.Header>
                            <Card.Meta>{member.character}</Card.Meta>
                          </Card>
                        )
                      })}
                    </Card.Group>
                  )}
                </Grid.Column>
              </Grid>
            </div>
          </div>
        }
    </div>
  )
}

export default MovieDetails
