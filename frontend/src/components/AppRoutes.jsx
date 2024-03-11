import { Route, Routes } from 'react-router-dom'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow   from '../features/tasks/TaskShow'
import TaskNew    from '../features/tasks/TaskNew'
import TaskEdit   from '../features/tasks/TaskEdit'

function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={<TasksIndex/>} />
      <Route path='/tasks' element={<TasksIndex/>} />
      <Route path='tasks/:id' element={<TaskShow/>} />
      <Route path='tasks/:id/edit' element={<TaskEdit/>} />
      <Route path='tasks/new' element={<TaskNew/>} />
    </Routes>
  )
}

export default AppRoutes
