import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import TaskForm from '../../../src/features/tasks/TaskForm'

describe('TaskForm component', () => {
  test('renders with correct initial values', () => {
    const onSubmit = jest.fn()
    const task = {
      title: 'Test Title',
      description: 'Test Description',
      due_date: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium',
      project_id: ''
    }

    render(<TaskForm task={task} action='edit' onSubmit={onSubmit} />)

    act(() => {
      expect(screen.getByLabelText('Title:')).toHaveValue('Test Title')
      expect(screen.getByLabelText('Description:')).toHaveValue('Test Description')
      expect(screen.getByLabelText('Due Date:')).toHaveValue('2024-01-01T12:00')
      expect(screen.getByLabelText('Status:')).toHaveValue('pending')
      expect(screen.getByLabelText('Priority:')).toHaveValue('medium')
    })
  })

  test('submits form with updated data', () => {
    const onSubmit = jest.fn()
    const task = {
      title: 'Test Title',
      description: 'Test Description',
      due_date: '2024-01-01T12:00',
      status: 'pending',
      priority: 'medium',
      project_id: ''
    }
    render(<TaskForm task={task} action='edit' onSubmit={onSubmit} />)

    act(() => {
      fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Updated Title' } })
      fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Updated Description' } })
      fireEvent.change(screen.getByLabelText('Due Date:'), { target: { value: '2024-01-02T12:00' } })
      fireEvent.change(screen.getByLabelText('Status:'), { target: { value: 'completed' } })
      fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: 'high' } })

      fireEvent.submit(screen.getByRole('button', { name: 'Update Task' }))
    })

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Updated Title',
      description: 'Updated Description',
      due_date: '2024-01-02T12:00',
      status: 'completed',
      priority: 'high',
      project_id: ''
    })
  })
})
