import { useState, useEffect } from 'react'
import { fetchAllTasks, searchTasks } from '../services/taskService'

function useTasksData(searchTerm) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTasks() {
      try {
        let data
        if (searchTerm) {
          data = await searchTasks(searchTerm)
        } else {
          data = await fetchAllTasks()
        }
        setTasks(data)
      } catch (e) {
        console.error('Failed to fetch tasks: ', e)
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [searchTerm])

  return { tasks, loading }
}

export default useTasksData
