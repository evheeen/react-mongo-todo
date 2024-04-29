import { Route, Routes } from 'react-router-dom'

import AuthenticateAccount from './AuthenticateAccount'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow   from '../features/tasks/TaskShow'
import TaskNew    from '../features/tasks/TaskNew'
import TaskEdit   from '../features/tasks/TaskEdit'

import SignIn  from '../features/auth/SignIn'
import SignUp  from '../features/auth/SignUp'
import SignOut from '../features/auth/SignOut'

function AppRoutes () {
  return (
    <Routes>
      <Route element={<AuthenticateAccount />}>
        <Route path='/' element={<TasksIndex />} />
        <Route path='/tasks' element={<TasksIndex />} />
        <Route path='/tasks/:id' element={<TaskShow />} />
        <Route path='/tasks/:id/edit' element={<TaskEdit />} />
        <Route path='/tasks/new' element={<TaskNew />} />
      </Route>

      <Route path='/sign_in' element={<SignIn />} />
      <Route path='/sign_up' element={<SignUp />} />
      <Route element={<AuthenticateAccount />}>
        <Route path='/sign_out' element={<SignOut />} />
      </Route>

      <Route path='*' element={<p>There&apos;s nothing here: 404!</p>} />
    </Routes>
  )
}

export default AppRoutes
