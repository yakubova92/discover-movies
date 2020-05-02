import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import { Icon } from 'semantic-ui-react'


const Header = () => {
  return (
    <div className='app-header'>
      <Link to={`/`}>
        <Icon name='film' size='big' color='teal' />
      </Link>
      <p>Movie Discovery</p>
    </div>
  )
}

export default Header
