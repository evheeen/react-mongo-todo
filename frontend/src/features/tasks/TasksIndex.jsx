import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

import TaskSearchBar from './TaskSearchBar'
import useTasksData from '../../hooks/useTasksData'
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
    <div>
      <TaskSearchBar value={searchTerm} onChange={handleDebouncedSearchChange} onImmediateChange={handleImmediateSearchChange}/>
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
    </div>
  )
}

export default TasksIndex
