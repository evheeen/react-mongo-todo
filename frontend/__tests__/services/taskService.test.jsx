import { fetchAllTasks, fetchTask, createTask, updateTask, deleteTask } from '../../src/services/taskService'

jest.mock('../../src/constants', () => ({
  API_URL: 'http://test-api-url',
}))

describe('Task Service', () => {
  global.fetch = jest.fn()

  afterEach(() => {
    fetch.mockClear()
  })

  test('fetchAllTasks - success', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }]
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockTasks) })
    const tasks = await fetchAllTasks()
    expect(tasks).toEqual(mockTasks)
  })

  test('fetchAllTasks - failure', async () => {
    const errorMessage = 'Failed to fetch tasks'
    fetch.mockResolvedValueOnce({ ok: false, statusText: errorMessage })

    await expect(fetchAllTasks()).rejects.toThrow(errorMessage)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://test-api-url/tasks')
  })

  test('fetchTask - success', async () => {
    const mockTask = { id: 1, title: 'Task 1' }
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockTask) })
    const task = await fetchTask(1)
    expect(task).toEqual(mockTask)
  })

  test('fetchTask - failure', async () => {
    const errorMessage = 'Failed to fetch task'
    fetch.mockResolvedValueOnce({ ok: false, statusText: errorMessage })

    await expect(fetchTask(1)).rejects.toThrow(errorMessage)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://test-api-url/tasks/1')
  })

  test('createTask - success', async () => {
    const mockData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-01-01',
      status: 'pending',
      priority: 'medium',
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, ...mockData }),
    })

    const createdTask = await createTask(mockData)

    expect(fetch).toHaveBeenCalledWith('http://test-api-url/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    })

    expect(createdTask).toEqual({ id: 1, ...mockData })
  })

  test('createTask - failure', async () => {
    const mockData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-01-01',
      status: 'pending',
      priority: 'medium',
    }
    const errorMessage = 'Failed to create task'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: errorMessage,
    })

    await expect(createTask(mockData)).rejects.toThrow(errorMessage)

    expect(fetch).toHaveBeenCalledWith('http://test-api-url/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    })
  })

  test('updateTask - success', async () => {
    const taskId = '1'
    const updatedData = {
      title: 'Updated Test Task',
      description: 'Updated Test Description',
      due_date: '2024-01-02',
      status: 'in_progress',
      priority: 'high',
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: taskId, ...updatedData }),
    })

    const updatedTask = await updateTask(taskId, updatedData)

    expect(fetch).toHaveBeenCalledWith(`http://test-api-url/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    expect(updatedTask).toEqual({ id: taskId, ...updatedData })
  })

  test('updateTask - failure', async () => {
    const taskId = '1'
    const updatedData = {
      title: 'Updated Test Task',
      description: 'Updated Test Description',
      due_date: '2024-01-02',
      status: 'in_progress',
      priority: 'high',
    }
    const errorMessage = 'Failed to update task'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: errorMessage,
    })

    await expect(updateTask(taskId, updatedData)).rejects.toThrow(errorMessage)

    expect(fetch).toHaveBeenCalledWith(`http://test-api-url/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
  })

  test('deleteTask - success', async () => {
    const taskId = '1'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 204,
    })

    const result = await deleteTask(taskId)

    expect(fetch).toHaveBeenCalledWith(`http://test-api-url/tasks/${taskId}`, {
      method: 'DELETE',
    })

    expect(result).toBeNull()
  })

  test('deleteTask - failure', async () => {
    const taskId = '1'
    const errorMessage = 'Failed to delete task'

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: errorMessage,
    })

    await expect(deleteTask(taskId)).rejects.toThrow(errorMessage)

    expect(fetch).toHaveBeenCalledWith(`http://test-api-url/tasks/${taskId}`, {
      method: 'DELETE',
    })
  })
})
