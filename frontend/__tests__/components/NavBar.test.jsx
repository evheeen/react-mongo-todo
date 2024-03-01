import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import NavBar from '../../src/components/NavBar'

describe('NavBar component', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter })
  }

  test('renders Index and New links', () => {
    renderNavBar()

    expect(screen.getByText('Index')).toBeInTheDocument()
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  test('Index link points to /', () => {
    renderNavBar()

    const indexLink = screen.getByText('Index')
    expect(indexLink.getAttribute('href')).toBe('/')
  })

  test('New link points to /tasks/new', () => {
    renderNavBar()

    const newLink = screen.getByText('New')
    expect(newLink.getAttribute('href')).toBe('/tasks/new')
  })
})
