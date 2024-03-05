import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { fetchTask, deleteTask } from '../../services/taskService'

function TaskShow () {
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
    <table>
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
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.due_date}</td>
          <td>{task.status}</td>
          <td>{task.priority}</td>
          <td></td>
          <td></td>
          <td>
            <Link to={`/tasks/${task._id.$oid}/edit`}>Edit</Link>
            {' | '}
            <button onClick={deleteTaskHandler}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TaskShow
