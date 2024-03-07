import { useNavigate } from 'react-router-dom'

import { createTask } from '../../services/taskService'
import TaskForm from './TaskForm'

function TaskNew () {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      const response = await createTask(formData)
      navigate(`/tasks/${response._id.$oid}`)
    } catch (e) {
      console.log('Task creating error:', e)
    }
  }

  return (
    <TaskForm action='new' onSubmit={handleSubmit} />
  )
}

export default TaskNew
