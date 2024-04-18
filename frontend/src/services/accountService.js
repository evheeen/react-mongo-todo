import { API_URL } from '../constants'

async function registrate (data) {
  try {
    const response = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response)
    }
  } catch (error) {
    console.error(error)
  }
}

async function authenticate (data) {
  try {
    const response = await fetch(`${API_URL}/accounts/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response)
    }
  } catch (error) {
    console.error(error)
  }
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

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response)
    }
  } catch (error) {
    console.error(error)
  }
}

export { registrate, authenticate, logout }
