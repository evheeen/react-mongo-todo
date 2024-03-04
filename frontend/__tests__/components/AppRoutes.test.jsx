import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import AppRoutes from '../../src/components/AppRoutes'

jest.mock('../../src/constants', () => ({
  API_URL: 'http://your-test-api-url',
}))

jest.mock('../../src/features/tasks/TasksIndex', () => ({
  __esModule: true,
  default: () => <div data-testid="tasks-index">TasksIndex</div>,
}))

jest.mock('../../src/features/tasks/TaskShow', () => ({
  __esModule: true,
  default: () => <div data-testid="task-show">TaskShow</div>,
}))

jest.mock('../../src/features/tasks/TaskNew', () => ({
  __esModule: true,
  default: () => <div data-testid="task-new">TaskNew</div>,
}))

jest.mock('../../src/features/tasks/TaskEdit', () => ({
  __esModule: true,
  default: () => <div data-testid="task-edit">TaskEdit</div>,
}))

describe('AppRoutes component', () => {
  const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    })
  }

  test('root path renders TasksIndex', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/'] })
    expect(screen.getByTestId('tasks-index')).toBeInTheDocument()
  })

  test('task details path renders TaskShow', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/tasks/1'] })
    expect(screen.getByTestId('task-show')).toBeInTheDocument()
  })

  test('/new path renders TaskNew', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/tasks/new'] })
    expect(screen.getByTestId('task-new')).toBeInTheDocument()
  })

  test('/tasks/:id/edit path renders TaskEdit', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/tasks/1/edit'] })
    expect(screen.getByTestId('task-edit')).toBeInTheDocument()
  })
})
