import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TasksIndex from '../../../src/features/tasks/TasksIndex'
import { fetchAllTasks } from '../../../src/services/taskService'

jest.mock('../../../src/services/taskService')

jest.mock('../../../src/constants', () => ({
  API_URL: 'http://test-api-url',
}))

describe('TasksIndex component', () => {
  test('renders loading message while tasks are loading', () => {
    render(<TasksIndex />, { wrapper: MemoryRouter })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders tasks when tasks are loaded', async () => {
    const tasks = [
      {
        _id: { $oid: '1' },
        title: 'Task 1',
        description: 'Description 1',
        due_date: '2024-01-01',
        status: 'pending',
        priority: 'medium',
      },
      {
        _id: { $oid: '2' },
        title: 'Task 2',
        description: 'Description 2',
        due_date: '2024-04-04',
        status: 'in_progress',
        priority: 'high',
      },
    ]

    fetchAllTasks.mockResolvedValueOnce(tasks)

    render(<TasksIndex />, { wrapper: MemoryRouter })

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    tasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument()
      expect(screen.getByText(task.description)).toBeInTheDocument()
      expect(screen.getByText(task.due_date)).toBeInTheDocument()
      expect(screen.getByText(task.status)).toBeInTheDocument()
      expect(screen.getByText(task.priority)).toBeInTheDocument()
      expect(screen.getByText('Show', { selector: `a[href="/tasks/${task._id.$oid}"]` })).toBeInTheDocument()
    })
  })

  test('handles error when tasks fail to load', async () => {
    const errorMessage = 'Failed to fetch tasks'
    const consoleSpy = jest.spyOn(console, 'log')

    fetchAllTasks.mockRejectedValueOnce(new Error(errorMessage))

    render(<TasksIndex />, { wrapper: MemoryRouter })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(`Tasks loading error:`, expect.any(Error))
    })
  })
})
