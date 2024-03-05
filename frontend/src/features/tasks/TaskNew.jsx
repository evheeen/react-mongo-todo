import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createTask } from '../../services/taskService'

function TaskNew () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [projectId, setProjectId] = useState('')
  // const [labelIds, setLabelIds] = useState([])

  const navigate = useNavigate()

  const statuses = ['pending', 'in_progress', 'completed', 'cancelled']
  const priorities = ['lowest', 'low', 'medium', 'high', 'highest']

  const handleSubmit = async (e) => {
    e.preventDefault()

    const taskData = {
      title,
      description,
      due_date: dueDate,
      status,
      priority,
      project_id: projectId,
      // label_ids: labelIds
    }

    try {
      const response = await createTask(taskData)
      navigate(`/tasks/${response._id.$oid}`)
    } catch (e) {
      console.log('Task creating error:', e)
    }
  }

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDateInput">Due Date:</label>
          <input
            id="dueDateInput"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="statusInput">Status:</label>
          <select
            id="statusInput"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
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
          <button type="submit">Create Task</button>
        </div>
      </form>
    </div>
  )
}

export default TaskNew
