import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <nav>
      <Link to='/'>Index</Link>
      {' | '}
      <Link to='tasks/new'>New</Link>
    </nav>
  )
}

export default NavBar
