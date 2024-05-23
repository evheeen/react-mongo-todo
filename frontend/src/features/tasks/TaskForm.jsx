import { useState } from 'react'
import PropTypes from 'prop-types'

import PlusIcon from '../../assets/icons/plus'

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
    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{action === 'new' ? 'New task' : 'Edit task'}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label">Title</label>
              <input
                id="titleInput"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-control"
                required
              />
            </div>
            
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="dueDateInput" className="form-label">Due Date</label>
                  <input
                    id="dueDateInput"
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="statusInput" className="form-label">Status</label>
                  <select
                    id="statusInput"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select Status</option>
                    {statuses.map((statusOption, index) => (
                      <option key={index} value={statusOption}>{statusOption.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="priorityInput" className="form-label">Priority</label>
                  <select
                    id="priorityInput"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select Priority</option>
                    {priorities.map((priorityOption, index) => (
                      <option key={index} value={priorityOption}>{priorityOption.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="projectIdInput" className="form-label">Project</label>
                  <select
                    id="projectIdInput"
                    value={formData.project_id}
                    onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select Project</option>
                    {/* Add options for projects */}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="labelIdsInput" className="form-label">Labels</label>
                  {/* Loop through labels */}
                  {/* For each label, create a checkbox */}
                  {/* Handle checkbox changes */}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="descriptionInput" className="form-label">Description</label>
              <textarea
                id="descriptionInput"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
            <button type="submit" className="btn btn-primary ms-auto">
              <PlusIcon />
              {action === 'new' ? 'Create new task' : 'Update task'}
            </button>
          </div>
        </form>
      </div>
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
