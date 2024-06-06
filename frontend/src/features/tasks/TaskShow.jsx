import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'

import { fetchTask, deleteTask } from '../../services/taskService'

import TaskEdit from './TaskEdit'

function TaskShow({ id }) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

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

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const deleteTaskHandler = async () => {
    const response = await deleteTask(id)

    if (response.status === 204) {
      handleCloseModal()
      toast.success('Deleted')
    } else {
      toast.error('Something went wrong')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!task) return <div>Task not found</div>

  return (
    <>
      <a className="btn btn-primary" onClick={handleOpenModal}>
        Show
      </a>
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        {task && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{`Task - ${task.title}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Project</th>
                      <th>Labels</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={task._id.$oid}>
                      <td className="text-secondary">{task.title}</td>
                      <td className="text-secondary">{task.description}</td>
                      <td className="text-secondary">{task.due_date}</td>
                      <td className="text-secondary">{task.status}</td>
                      <td className="text-secondary">{task.priority}</td>
                      <td className="text-secondary"></td>
                      <td className="text-secondary"></td>
                      <td className="btn-group">
                        <TaskEdit id={task._id.$oid} />
                        <button onClick={deleteTaskHandler} className="btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  )
}

TaskShow.propTypes = {
  id: PropTypes.string.isRequired,
}

export default TaskShow
