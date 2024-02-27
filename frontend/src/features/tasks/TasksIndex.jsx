import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from '../../constants'

function TasksIndex () {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [, setError] = useState(null)

  useEffect(() => {
    async function loadTasks () {
      try {
        const response = await fetch(`${API_URL}/tasks`)
        if (response.ok) {
          const json = await response.json()
          setTasks(json)
          setLoading(false)
        } else {
          throw response
        }
      } catch (e) {
        setError('Tasks loading error')
        console.log('Tasks loading error:', e)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

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
        {tasks.map((task) => (
          <tr key={task._id.$oid}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.due_date}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td></td>
            <td></td>
            <td><Link to={`/tasks/${task._id.$oid}`}>Show</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TasksIndex
