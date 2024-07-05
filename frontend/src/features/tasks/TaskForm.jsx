import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

import { fetchAllProjects } from '../../services/projectService'
import { fetchAllLabels } from '../../services/labelService'

import PlusIcon from '../../assets/icons/plus'

const initialFormData = {
  title: '',
  description: '',
  due_date: '',
  status: 'pending',
  priority: 'medium',
  project_id: '',
  label_ids: []
}

const statuses = ['pending', 'in_progress', 'completed', 'cancelled']
const priorities = ['lowest', 'low', 'medium', 'high', 'highest']

function TaskForm ({ task, action, onSubmit, show, onHide }) {
  const [formData, setFormData] = useState(initialFormData)
  const [projects, setProjects] = useState([])
  const [labels, setLabels] = useState([])

  const projectsFetched = useRef(false)
  const labelsFetched = useRef(false)

  useEffect(() => {
    if (task && show) {
      setFormData({
        title:       task.title       || '',
        description: task.description || '',
        status:      task.status      || 'pending',
        priority:    task.priority    || 'medium',

        due_date:    moment(task.due_date).format('YYYY-MM-DDTkk:mm') || '',
        project_id:  task.project_id?.$oid || '',
        label_ids:   task.label_ids?.map(label => label.$oid) || []
      })
    } else if (!show) {
      setFormData(initialFormData)
    }
  }, [task, show])

  useEffect(() => {
    if (!show) return

    const loadProjects = async () => {
      if (projectsFetched.current) return

      projectsFetched.current = true

      try {
        const data = await fetchAllProjects()
        setProjects(data)
      } catch (e) {
        console.log('Projects loading error:', e)
      }
    }

    const loadLabels = async () => {
      if (labelsFetched.current) return

      labelsFetched.current = true

      try {
        const data = await fetchAllLabels()
        setLabels(data)
      } catch (e) {
        console.log('Labels loading error:', e)
      }
    }

    loadProjects()
    loadLabels()
  }, [show])

  const handleLabelChange = (e) => {
    const { value, checked } = e.target

    setFormData(prevFormData => ({
      ...prevFormData,
      label_ids: checked
        ? [...prevFormData.label_ids, value]
        : prevFormData.label_ids.filter(id => id !== value)
    }))
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <Modal.Header closeButton>
          <h5 className="modal-title">{action === 'new' ? 'New task' : 'Edit task'}</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label">Title</label>
              <input
                id="titleInput"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-control"
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
                    {projects.map((project) => (
                      <option key={project._id.$oid} value={project._id.$oid}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="labelIdsInput" className="form-label">Labels</label>
                  {labels.map((label) => (
                    <div key={label._id.$oid} className="form-check">
                      <input
                        id={`label-${label._id.$oid}`}
                        type="checkbox"
                        value={label._id.$oid}
                        checked={formData.label_ids.includes(label._id.$oid)}
                        onChange={handleLabelChange}
                        className="form-check-input"
                      />
                      <label htmlFor={`label-${label._id.$oid}`} className="form-check-label">
                        {label.name}
                      </label>
                    </div>
                  ))}
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
        </Modal.Body>
        <Modal.Footer>
          <a className="btn btn-link link-secondary" onClick={onHide}>Cancel</a>
          <button type="submit" className="btn btn-primary ms-auto">
            <PlusIcon />
            {action === 'new' ? 'Create new task' : 'Update task'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

TaskForm.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    priority: PropTypes.string,
    project_id: PropTypes.object,
    label_ids: PropTypes.arrayOf(PropTypes.object),
  }),
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

TaskForm.defaultProps = {
  task: null,
}

export default TaskForm
