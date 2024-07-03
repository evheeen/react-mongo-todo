import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { fetchTask, updateTask } from '../../services/taskService'

import TaskForm from './TaskForm'

import EditIcon   from '../../assets/icons/edit'
import LoaderIcon from '../../assets/icons/loader'

function TaskEdit ({ id, onUpdate }) {
  const [task, setTask] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = async () => {
    try {
      const data = await fetchTask(id)
      setTask(data)
    } catch (e) {
      console.log('Task loading error:', e)
    }

    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

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

  if (showModal && !task) return <a className="btn btn-primary disabled" onClick={handleOpenModal}><LoaderIcon />Edit task</a>

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
