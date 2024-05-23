import { useNavigate } from 'react-router-dom'

import { createTask } from '../../services/taskService'
import TaskForm from './TaskForm'

import PlusIcon from '../../assets/icons/plus'

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
    <>
      <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-task">
        <PlusIcon />
        Add task
      </a>
      <div className="modal modal-blur fade" id="modal-task" tabIndex="-1" aria-hidden="true">
        <TaskForm action='new' onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default TaskNew
