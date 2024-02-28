import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { API_URL } from '../../constants'

function TaskEdit () {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [, setError] = useState(null)

  const { id } = useParams()

  const navigate = useNavigate()

  const statuses = ['pending', 'in_progress', 'completed', 'cancelled']
  const priorities = ['lowest', 'low', 'medium', 'high', 'highest']

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
        priority: task.priority
      }),
    })

    if (response.ok) {
      const { _id } = await response.json()
      navigate(`/tasks/${_id.$oid}`)
    } else {
      console.log('An error occurred.')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="dueDateInput">Due Date:</label>
          <input
            id="dueDateInput"
            type="datetime-local"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="statusInput">Status:</label>
          <select
            id="statusInput"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="">Select Status</option>
            {statuses.map((statusOption, index) => (
              <option key={index} value={statusOption}>{statusOption.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priorityInput">Priority:</label>
          <select
            id="priorityInput"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="">Select Priority</option>
            {priorities.map((priorityOption, index) => (
              <option key={index} value={priorityOption}>{priorityOption.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="projectIdInput">Project:</label>
          <select
            id="projectIdInput"
            value={task.projectId}
            onChange={(e) => setTask({ ...task, projectId: e.target.value })}
          >
            <option value="">Select Project</option>
            {/* Add options for projects */}
          </select>
        </div>
        <div>
          <label htmlFor="labelIdsInput">Labels:</label>
          {/* Loop through labels */}
          {/* For each label, create a checkbox */}
          {/* Handle checkbox changes */}
        </div>
        <div>
          <button type="submit">Edit Task</button>
        </div>
      </form>
    </div>
  )
}

export default TaskEdit
