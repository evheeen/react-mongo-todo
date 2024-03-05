import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import TaskEdit from '../../../src/features/tasks/TaskEdit'
import TaskShow from '../../../src/features/tasks/TaskShow'
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
      dueDate: '2024-12-31T23:59',
      status: 'pending',
      priority: 'medium'
    }

    fetchTask.mockResolvedValueOnce(mockedTask)

    render(
      <MemoryRouter initialEntries={['/tasks/1/edit']}>
        <Routes>
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchTask).toHaveBeenCalledWith('1')
    })

    expect(screen.getByLabelText('Title:')).toHaveValue('Test Task')
    expect(screen.getByLabelText('Description:')).toHaveValue('Test Description')
    expect(screen.getByLabelText('Due Date:')).toHaveValue('2024-12-31T23:59')
    expect(screen.getByLabelText('Status:')).toHaveValue('pending')
    expect(screen.getByLabelText('Priority:')).toHaveValue('medium')
  })

  test('handles error when task fails to load', async () => {
    fetchTask.mockRejectedValueOnce()

    render(
      <MemoryRouter initialEntries={['/tasks/1/edit']}>
        <Routes>
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })
    expect(screen.getByText('Task not found')).toBeInTheDocument()
  })
})
