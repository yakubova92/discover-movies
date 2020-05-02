import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import { imageUrl } from '../constants'

const MovieCard = ({movie}) => {
  return (
    <Link to={`/movies/${movie.id}`} key={movie.id}>
      <Card className='movie-card'>
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
}

export default MovieCard
