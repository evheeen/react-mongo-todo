import { Route, Routes } from 'react-router-dom'

import AuthenticateAccount from './AuthenticateAccount'
import ProtectedRoute      from './ProtectedRoute'

import TasksIndex from '../features/tasks/TasksIndex'

import SignIn  from '../features/auth/SignIn'
import SignUp  from '../features/auth/SignUp'

import PageNotFound  from '../features/layouts/PageNotFound'

function AppRoutes () {
  return (
    <Routes>
      <Route element={<AuthenticateAccount />}>
        <Route path='/' element={<TasksIndex />} />
        <Route path='/tasks' element={<TasksIndex />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
