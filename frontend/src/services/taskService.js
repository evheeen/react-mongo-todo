import { API_URL } from '../constants'

async function fetchAllTasks () {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function fetchTask (id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function createTask (data) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function updateTask (id, data) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    },
    body: JSON.stringify({
      title:       data.title,
      description: data.description,
      due_date:    data.due_date,
      status:      data.status,
      priority:    data.priority
    })
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function deleteTask (id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

async function searchTasks (query) {
  const response = await fetch(`${API_URL}/search/tasks/?q=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

export { fetchAllTasks, fetchTask, createTask, updateTask, deleteTask, searchTasks }
