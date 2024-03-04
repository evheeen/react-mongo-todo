import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { fetchTask, deleteTask } from '../../../src/services/taskService'
import TaskShow from '../../../src/features/tasks/TaskShow'

jest.mock('../../../src/services/taskService')

jest.mock('../../../src/constants', () => ({
  API_URL: 'http://test-api-url',
}))

describe('TaskShow component', () => {
  test('renders loading message while task is loading', () => {
    render(<TaskShow />, { wrapper: MemoryRouter })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders task when task is loaded', async () => {
    const task = {
      _id: { $oid: '1' },
      title: 'Task 1',
      description: 'Description 1',
      due_date: '2024-01-01',
      status: 'pending',
      priority: 'medium',
    }

    fetchTask.mockResolvedValueOnce(task)

    render(
      <MemoryRouter initialEntries={['/tasks/1']}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskShow />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    expect(screen.getByText(task.title)).toBeInTheDocument()
    expect(screen.getByText(task.description)).toBeInTheDocument()
    expect(screen.getByText(task.due_date)).toBeInTheDocument()
    expect(screen.getByText(task.status)).toBeInTheDocument()
    expect(screen.getByText(task.priority)).toBeInTheDocument()
  })

  test('handles error when task fails to load', async () => {
    const errorMessage = 'Failed to fetch task'
    const consoleSpy = jest.spyOn(console, 'log')

    fetchTask.mockRejectedValueOnce(new Error(errorMessage))

    render(
      <MemoryRouter initialEntries={['/tasks/1']}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskShow />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Task loading error:', expect.any(Error))
    })
  })

  test('deletes task when delete button is clicked', async () => {
    const task = {
      _id: { $oid: '1' },
      title: 'Task 1',
      description: 'Description 1',
      due_date: '2024-01-01',
      status: 'pending',
      priority: 'medium',
    }

    fetchTask.mockResolvedValueOnce(task)
    deleteTask.mockResolvedValueOnce()

    render(
      <MemoryRouter initialEntries={['/tasks/1']}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskShow />} />
          <Route path='/' element={<div>Tasks Index Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    fireEvent.click(screen.getByText('Delete'))

    expect(deleteTask).toHaveBeenCalledWith(task._id.$oid)
  })
})
