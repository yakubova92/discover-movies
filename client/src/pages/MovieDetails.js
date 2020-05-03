import React, { useState, useEffect } from 'react'
import '../styles/MovieDetails.css'
import { Card, Grid, Icon, Image, Label, Message } from 'semantic-ui-react'
import Header from '../components/Header'
import CastMemberCard from '../components/CastMemberCard'
import { imageUrl, localUrl } from '../constants'

const MovieDetails = ({match}) => {
  const { movieId } = match.params
  const [movie, setMovie] = useState({})
  const [error, setError] = useState(null)

  async function fetchMovieDetails() {
    let url = `${localUrl}/movies/${movieId}`
    const res = await fetch(url)
    res.json().then(res => {
      if (res.error) {
        setError(res.error)
        console.error(res.error)
      }else {
        setMovie(res)
        setError(null)
      }
    }).catch(err => {
      console.error(err)
      setError(err)
    })
  }

  function findBackgroundImage(){
    if(movie.backdrop_path) return `url(${imageUrl}/w1280/${movie.backdrop_path})`
    else return ''
  }

  useEffect(() => {
    fetchMovieDetails()
  }, [movieId])

  return (
    <div>
      <Header />
      {error
        ? <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
            <p>{error.message}</p>
          </Message>
          : <div className='backdrop' style={{backgroundImage: findBackgroundImage()}}>
            <div className='content'>
              <Grid columns={2} stackable>
                <Grid.Column textAlign='center' width={6}>
                  <Grid.Row>
                    {movie.poster_path &&
                    <Image bordered rounded wrapped src={`${imageUrl}/w342/${movie.poster_path}`} />
                    }
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
                          <CastMemberCard key={member.id} member={member} />
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
