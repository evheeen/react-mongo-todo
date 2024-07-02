import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { fetchTask, updateTask } from '../../services/taskService'

import TaskForm from './TaskForm'

import EditIcon from '../../assets/icons/edit'

function TaskEdit ({ id, onUpdate }) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const firstRenderRef = useRef(false)

  useEffect(() => {
    if (firstRenderRef.current) return

    firstRenderRef.current = true

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
    const response = await updateTask(id, formData)

    if (response.status === 200) {
      handleCloseModal()
      setTask(response.data)
      onUpdate(response.data)
      toast.success('Updated')
    } else {
      toast.error(response.data.message)
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
      {showModal && (
        <TaskForm task={task} action='edit' onSubmit={handleSubmit} show={showModal} onHide={handleCloseModal} />
      )}
    </>
  )
}

TaskEdit.propTypes = {
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default TaskEdit
