import { ToastContainer } from 'react-toastify'

import './App.css'

import AppRoutes from './components/AppRoutes'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar/>
      <AppRoutes/>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition: Bounce
      />
    </>
  )
}

export default App
