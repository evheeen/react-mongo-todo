import { useState } from 'react'
import PropTypes from 'prop-types'

function TaskForm ({ task, action, onSubmit }) {
  const [formData, setFormData] = useState(
    task || {
      title: '',
      description: '',
      due_date: '',
      status: 'pending',
      priority: 'medium',
      project_id: ''
    }
  )

  const statuses = ['pending', 'in_progress', 'completed', 'cancelled']
  const priorities = ['lowest', 'low', 'medium', 'high', 'highest']

  return (
    <div>
      <h2>{action === 'new' ? 'Create a New Task' : 'Edit Task'}</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="dueDateInput">Due Date:</label>
          <input
            id="dueDateInput"
            type="datetime-local"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="statusInput">Status:</label>
          <select
            id="statusInput"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
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
            value={formData.project_id}
            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
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
          <button type="submit">{action === 'new' ? 'Create Task' : 'Update Task'}</button>
        </div>
      </form>
    </div>
  )
}

TaskForm.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    priority: PropTypes.string,
    project_id: PropTypes.string,
  }),
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

TaskForm.defaultProps = {
  task: null,
}

export default TaskForm
