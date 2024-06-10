import { API_URL } from '../constants'

async function registrate (data) {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  return { data: body, status: response.status, statusText: response.statusText, headers: response.headers }
}

async function authenticate (data) {
  const response = await fetch(`${API_URL}/accounts/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  return { data: body, status: response.status, statusText: response.statusText, headers: response.headers }
}

async function logout () {
  try {
    const response = await fetch(`${API_URL}/accounts/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
      }
    })

    const body = await response.json()

    return { data: body, status: response.status, statusText: response.statusText }
  } catch (error) {
    console.error(error)
  }
}

async function validateToken () {
  try {
    const response = await fetch(`${API_URL}/validate_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_authToken')}`
      }
    })

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Token Validation Error:', error)
    throw error
  }
}

export { registrate, authenticate, logout, validateToken }
