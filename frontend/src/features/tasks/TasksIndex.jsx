import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { fetchAllTasks } from '../../services/taskService'

function TasksIndex () {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTasks () {
      try {
        const data = await fetchAllTasks()
        setTasks(data)
      } catch (e) {
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
