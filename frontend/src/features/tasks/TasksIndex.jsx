import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

import TaskNew       from './TaskNew'
import TaskEdit      from './TaskEdit'
import TaskSearchBar from './TaskSearchBar'

import useTasksData      from '../../hooks/useTasksData'
import useURLSearchParam from '../../hooks/useURLSearchParam'

import { deleteTask } from '../../services/taskService'

function TasksIndex () {
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam('search')
  const { tasks: fetchedTasks, loading } = useTasksData(debouncedSearchTerm)

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks)
    }
  }, [fetchedTasks])

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue)
  }

  const handleDebouncedSearchChange = useMemo(() => {
    return (searchValue) => {
      setDebouncedSearchTerm(searchValue)
    }
  }, [setDebouncedSearchTerm])

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task._id.$oid === updatedTask._id.$oid ? updatedTask : task)))
  }

  const deleteTaskHandler = async (id) => {
    const response = await deleteTask(id)

    if (response.status === 204) {
      toast.success('Deleted')
      setTasks(tasks.filter(task => task._id.$oid !== id))
    } else {
      toast.error('Something went wrong')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'hh:mm a · MMMM dd, yyyy')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">
                <Link to='/' className="nav-link">Board</Link>
              </h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <TaskSearchBar value={searchTerm} onChange={handleDebouncedSearchChange} onImmediateChange={handleImmediateSearchChange}/>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <TaskNew onCreate={handleTaskCreated} />
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
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
                      <td className="text-secondary">{task.description}</td>
                      <td className="text-secondary">{task.due_date && formatDate(task.due_date)}</td>
                      <td className="text-secondary">{task.status}</td>
                      <td className="text-secondary">{task.priority}</td>
                      <td className="text-secondary">{task.project?.name}</td>
                      <td className="text-secondary">{task.labels?.map(label => label.name).join(', ')}</td>
                      <td>
                        <TaskEdit id={task._id.$oid} onUpdate={handleTaskUpdated} />
                        <button onClick={() => deleteTaskHandler(task._id.$oid)} className="btn ms-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksIndex
