import { Route, Routes } from 'react-router-dom'

import AuthenticateAccount from './AuthenticateAccount'
import ProtectedRoute      from './ProtectedRoute'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow   from '../features/tasks/TaskShow'

import SignIn  from '../features/auth/SignIn'
import SignUp  from '../features/auth/SignUp'

function AppRoutes () {
  return (
    <Routes>
      <Route element={<AuthenticateAccount />}>
        <Route path='/' element={<TasksIndex />} />
        <Route path='/tasks' element={<TasksIndex />} />
        <Route path='/tasks/:id' element={<TaskShow />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
      </Route>

      <Route path='*' element={<p>There&apos;s nothing here: 404!</p>} />
    </Routes>
  )
}

export default AppRoutes
