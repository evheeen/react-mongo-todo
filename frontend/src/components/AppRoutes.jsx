import { Route, Routes } from 'react-router-dom'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow   from '../features/tasks/TaskShow'
import TaskNew    from '../features/tasks/TaskNew'
import TaskEdit   from '../features/tasks/TaskEdit'

import SignIn from '../features/auth/SignIn'
import SignUp from '../features/auth/SignUp'

function AppRoutes () {
  return (
    <Routes>  
      <Route path='/' element={<TasksIndex/>} />
      <Route path='/tasks' element={<TasksIndex/>} />
      <Route path='tasks/:id' element={<TaskShow/>} />
      <Route path='tasks/:id/edit' element={<TaskEdit/>} />
      <Route path='tasks/new' element={<TaskNew/>} />

      <Route path='/sign_in' element={<SignIn/>} />
      <Route path='/sign_up' element={<SignUp/>} />
    </Routes>
  )
}

export default AppRoutes
