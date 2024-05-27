import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import { fetchTask, deleteTask } from '../../services/taskService'

import TaskEdit from './TaskEdit'

function TaskShow ({ id }) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const deleteTaskHandler = async () => {
    try {
      await deleteTask(id)
      navigate('/')
    } catch (e) {
      console.log('Task deleting error:', e)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!task) return <div>Task not found</div>

  return (
    <>
      <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#task-show-${task._id.$oid}`}>
        Show
      </a>
      <div className="modal modal-blur fade" id={`#task-show-${task._id.$oid}`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Task - ${task.title}`}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                        {/*<TaskEdit id={task._id.$oid} />*/}
                        <button onClick={deleteTaskHandler} className="btn">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


TaskShow.propTypes = {
  id: PropTypes.string.isRequired,
}

export default TaskShow
