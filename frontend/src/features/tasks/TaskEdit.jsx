import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchTask, updateTask } from '../../services/taskService'

function TaskEdit () {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const navigate = useNavigate()

  const statuses = ['pending', 'in_progress', 'completed', 'cancelled']
  const priorities = ['lowest', 'low', 'medium', 'high', 'highest']

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await await updateTask(id, task)
      navigate(`/tasks/${id}`)
    } catch (e) {
      console.log('Task updating error:', e)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!task) return <div>Task not found</div>

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
            // onChange={(e) => setTask({ ...task, projectId: e.target.value })}
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
