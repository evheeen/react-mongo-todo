import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { fetchTask, updateTask } from '../../services/taskService'

import TaskForm from './TaskForm'

import EditIcon from '../../assets/icons/edit'

function TaskEdit ({ id }) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

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
      <a className="btn btn-primary" onClick={handleOpenModal}>
        <EditIcon />
        Edit task
      </a>
      <TaskForm task={task} action='edit' onSubmit={handleSubmit} show={showModal} onHide={handleCloseModal} />
    </>
  )
}

TaskEdit.propTypes = {
  id: PropTypes.string.isRequired,
}

export default TaskEdit
