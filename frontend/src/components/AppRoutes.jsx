import { Route, Routes } from 'react-router-dom'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow from '../features/tasks/TaskShow'
import TaskNew from '../features/tasks/TaskNew'

function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={<TasksIndex/>} />
      <Route path='tasks/:id' element={<TaskShow/>} />
      <Route path='/new' element={<TaskNew/>} />
    </Routes>
  )
}

export default AppRoutes
