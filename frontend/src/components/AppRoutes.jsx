import { Route, Routes } from 'react-router-dom'

import TasksIndex from '../features/tasks/TasksIndex'
import TaskShow from '../features/tasks/TaskShow'

function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={<TasksIndex/>} />
      <Route path='tasks/:id' element={<TaskShow/>} />
      <Route path='/new' element={<h1>New Task Page</h1>} />
    </Routes>
  )
}

export default AppRoutes
