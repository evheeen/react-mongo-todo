import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

import TaskNew       from './TaskNew'
import TaskSearchBar from './TaskSearchBar'

import useTasksData      from '../../hooks/useTasksData'
import useURLSearchParam from '../../hooks/useURLSearchParam'

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
              <TaskNew />
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
                      <td className="text-secondary">{task.due_date}</td>
                      <td className="text-secondary">{task.status}</td>
                      <td className="text-secondary">{task.priority}</td>
                      <td className="text-secondary"></td>
                      <td className="text-secondary"></td>
                      <td><Link to={`/tasks/${task._id.$oid}`}>Show</Link></td>
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
