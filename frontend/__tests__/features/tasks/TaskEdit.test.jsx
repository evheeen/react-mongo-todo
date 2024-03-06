import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import TaskEdit from '../../../src/features/tasks/TaskEdit'
import { fetchTask, updateTask } from '../../../src/services/taskService'

jest.mock('../../../src/services/taskService')

jest.mock('../../../src/constants', () => ({
  API_URL: 'http://test-api-url',
}))

describe('TaskEdit feature', () => {
  test('renders loading message while task is loading', () => {
    render(<TaskEdit />, { wrapper: MemoryRouter })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders task edit form with correct initial values', async () => {
    const mockedTask = {
      _id: { $oid: '1' },
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium'
    }

    fetchTask.mockResolvedValueOnce(mockedTask)

    render(
      <MemoryRouter initialEntries={['/tasks/1/edit']}>
        <Routes>
          <Route path='/tasks/:id/edit' element={<TaskEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchTask).toHaveBeenCalledWith('1')
    })

    expect(screen.getByLabelText('Title:')).toHaveValue('Test Task')
    expect(screen.getByLabelText('Description:')).toHaveValue('Test Description')
    expect(screen.getByLabelText('Due Date:')).toHaveValue('2024-01-01T12:00')
    expect(screen.getByLabelText('Status:')).toHaveValue('pending')
    expect(screen.getByLabelText('Priority:')).toHaveValue('medium')
  })

  test('handles error when task fails to load', async () => {
    const errorMessage = 'Failed to load task'
    const consoleSpy = jest.spyOn(console, 'log')

    fetchTask.mockRejectedValueOnce(new Error(errorMessage))

    render(
      <MemoryRouter initialEntries={['/tasks/1/edit']}>
        <Routes>
          <Route path='/tasks/:id/edit' element={<TaskEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    expect(screen.getByText('Task not found')).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalledWith('Task loading error:', expect.any(Error))
  })

  test('updates task on form submission', async () => {
    const mockedTask = {
      _id: { $oid: '1' },
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium'
    }

    fetchTask.mockResolvedValueOnce(mockedTask)
    updateTask.mockResolvedValueOnce({ ...mockedTask, title: 'Updated Task Title' })

    render(
      <MemoryRouter initialEntries={['/tasks/1/edit']}>
        <Routes>
          <Route path='/tasks/:id/edit' element={<TaskEdit />} />
          <Route path='/tasks/:id' element={<div>Updated Task Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchTask).toHaveBeenCalledWith('1')
    })

    expect(screen.getByLabelText('Title:')).toHaveValue('Test Task')

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Updated Task Title' } })
      fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Updated Test Description' } })
      fireEvent.change(screen.getByLabelText('Due Date:'), { target: { value: '2024-01-01T20:24' } })
      fireEvent.change(screen.getByLabelText('Status:'), { target: { value: 'completed' } })
      fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: 'low' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Edit Task' }))
    })

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith('1', { ...mockedTask,
                                                     title: 'Updated Task Title',
                                                     description: 'Updated Test Description',
                                                     dueDate: '2024-01-01T20:24',
                                                     status: 'completed',
                                                     priority: 'low' })
      expect(screen.getByText('Updated Task Page')).toBeInTheDocument()
    })
  })

  test('handles error when task fails to update', async () => {
    const mockedTask = {
      _id: { $oid: '1' },
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium'
    }

    fetchTask.mockResolvedValueOnce(mockedTask)

    const errorMessage = 'Failed to update task'
    const consoleSpy = jest.spyOn(console, 'log')
    updateTask.mockRejectedValueOnce(new Error(errorMessage))

    render(
      <MemoryRouter initialEntries={['/tasks/1']}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchTask).toHaveBeenCalledWith('1')
    })

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'Edit Task' }))
    })

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Task updating error:', expect.any(Error))
    })
  })
})
