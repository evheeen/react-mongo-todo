import { API_URL } from '../constants'

async function fetchAllLabels () {
  const response = await fetch(`${API_URL}/labels`, {
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

export { fetchAllLabels }
