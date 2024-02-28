import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../../constants'

function TaskShow () {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [, setError] = useState(null)
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks/${id}`)
        if (response.ok) {
          const json = await response.json()
          setTask(json)
          setLoading(false)
        } else {
          throw response
        }
      } catch (e) {
        setError('Task loading error')
        console.log('Task loading error:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const deleteTask = async () => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      navigate(`/`)
    } else {
      console.log('An error occurred.')
    }
  }

  if (loading) return <div>Loading...</div>

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
            <button onClick={deleteTask}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TaskShow
