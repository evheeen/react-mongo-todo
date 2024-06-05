import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createTask } from '../../services/taskService'
import TaskForm from './TaskForm'

import PlusIcon from '../../assets/icons/plus'

function TaskNew () {
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

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
      <a className="btn btn-primary" onClick={handleOpenModal}>
        <PlusIcon />
        Add task
      </a>
      <TaskForm action='new' onSubmit={handleSubmit} show={showModal} onHide={handleCloseModal} />
    </>
  )
}

export default TaskNew
