import { API_URL } from '../constants'

async function fetchAllProjects () {
  const response = await fetch(`${API_URL}/projects`, {
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

export { fetchAllProjects }
