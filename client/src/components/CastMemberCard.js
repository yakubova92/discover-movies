import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { imageUrl } from '../constants'

const CastMemberCard = ({member}) => {
  return (
    <Card>
      <Image size='small' rounded wrapped src={`${imageUrl}/w185/${member.profile_path}`} />
      <Card.Header>{member.name}</Card.Header>
      <Card.Meta>{member.character}</Card.Meta>
    </Card>
  )
}

export default CastMemberCard
