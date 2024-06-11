import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { createTask } from '../../services/taskService'
import TaskForm from './TaskForm'

import PlusIcon from '../../assets/icons/plus'

function TaskNew ({ onCreate }) {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleSubmit = async (formData) => {
    const response = await createTask(formData)

    if (response.status === 201) {
      handleCloseModal()
      onCreate(response.data)
      toast.success('Created')
    } else {
      toast.error(response.data.message)
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

TaskNew.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default TaskNew
