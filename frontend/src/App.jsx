import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import AppRoutes from './components/AppRoutes'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <h1>React on Rails todo</h1>
      <NavBar/>
      <AppRoutes/>
    </Router>
  )
}

export default App
