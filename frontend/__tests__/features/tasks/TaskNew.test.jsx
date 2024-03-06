import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'

import TaskNew from '../../../src/features/tasks/TaskNew'
import { createTask } from '../../../src/services/taskService'

jest.mock('../../../src/services/taskService')

jest.mock('../../../src/constants', () => ({
  API_URL: 'http://test-api-url',
}))

describe('TaskNew feature', () => {
  test('renders form elements', () => {
    render(<TaskNew />, { wrapper: MemoryRouter })

    expect(screen.getByLabelText('Title:')).toBeInTheDocument()
    expect(screen.getByLabelText('Description:')).toBeInTheDocument()
    expect(screen.getByLabelText('Due Date:')).toBeInTheDocument()
    expect(screen.getByLabelText('Status:')).toBeInTheDocument()
    expect(screen.getByLabelText('Priority:')).toBeInTheDocument()
    expect(screen.getByLabelText('Project:')).toBeInTheDocument()
    // expect(screen.getByLabelText('Labels:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Task' })).toBeInTheDocument()
  })

  test('updates state on input change', async () => {
    render(<TaskNew />, { wrapper: MemoryRouter })

    const titleInput = screen.getByLabelText('Title:')
    const descriptionInput = screen.getByLabelText('Description:')
    const dueDateInput = screen.getByLabelText('Due Date:')
    const statusInput = screen.getByLabelText('Status:')
    const priorityInput = screen.getByLabelText('Priority:')
    const projectInput = screen.getByLabelText('Project:')

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Test Title' } })
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
      fireEvent.change(dueDateInput, { target: { value: '2024-02-28T12:00' } })
      fireEvent.change(statusInput, { target: { value: 'pending' } })
      fireEvent.change(priorityInput, { target: { value: 'medium' } })
      fireEvent.change(projectInput, { target: { value: '' } })
    })

    expect(titleInput.value).toBe('Test Title')
    expect(descriptionInput.value).toBe('Test Description')
    expect(dueDateInput.value).toBe('2024-02-28T12:00')
    expect(statusInput.value).toBe('pending')
    expect(priorityInput.value).toBe('medium')
    expect(projectInput.value).toBe('')
  })

  test('submits form and creates task', async () => {
    const taskData = {
      title: 'Test Title',
      description: 'Test Description',
      due_date: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium',
      project_id: ''
    }

    createTask.mockResolvedValueOnce({ _id: { $oid: '1' } })

    render(<TaskNew />, { wrapper: MemoryRouter })

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title:'), { target: { value: taskData.title } })
      fireEvent.change(screen.getByLabelText('Description:'), { target: { value: taskData.description } })
      fireEvent.change(screen.getByLabelText('Due Date:'), { target: { value: taskData.due_date } })
      fireEvent.change(screen.getByLabelText('Status:'), { target: { value: taskData.status } })
      fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: taskData.priority } })
      fireEvent.change(screen.getByLabelText('Project:'), { target: { value: taskData.project_id } })

      fireEvent.click(screen.getByRole('button', { name: 'Create Task' }))
    })

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith(taskData)
    })
  })

  test('handles error when task fails to load', async () => {
    const taskData = {
      title: 'Test Title',
      description: 'Test Description',
      due_date: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium',
      project_id: ''
    }
    const errorMessage = 'Failed to create task'
    const consoleSpy = jest.spyOn(console, 'log')

    createTask.mockRejectedValueOnce(new Error(errorMessage))

    render(<TaskNew />, { wrapper: MemoryRouter })

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title:'), { target: { value: taskData.title } })
      fireEvent.change(screen.getByLabelText('Description:'), { target: { value: taskData.description } })
      fireEvent.change(screen.getByLabelText('Due Date:'), { target: { value: taskData.due_date } })
      fireEvent.change(screen.getByLabelText('Status:'), { target: { value: taskData.status } })
      fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: taskData.priority } })
      fireEvent.change(screen.getByLabelText('Project:'), { target: { value: taskData.project_id } })

      fireEvent.click(screen.getByRole('button', { name: 'Create Task' }))
    })

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith(taskData)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Task creating error:', expect.any(Error))
  })
})
