import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchTask, updateTask } from '../../services/taskService'

import TaskForm from './TaskForm'

import EditIcon from '../../assets/icons/edit'

function TaskEdit () {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTask(id)
        setTask(data)
      } catch (e) {
        console.log('Task loading error:', e)
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id])

  const handleSubmit = async (formData) => {
    try {
      await await updateTask(id, formData)
      navigate(`/tasks/${id}`)
    } catch (e) {
      console.log('Task updating error:', e)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!task) return <div>Task not found</div>

  return (
    <>
      <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-task">
        <EditIcon />
        Edit task
      </a>
      <div className="modal modal-blur fade" id="modal-task" tabIndex="-1" aria-hidden="true">
        <TaskForm task={task} action='edit' onSubmit={handleSubmit} />
      </div>
    </>
  )
}

export default TaskEdit
