import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoadingScreen from '../components/loading'

describe('LoadingScreen', () => {
  test('renders spinner and loading text', () => {
    const { container } = render(<LoadingScreen />)

    // Loading text
    expect(screen.getByText(/fetching data/i)).toBeInTheDocument()

    // Spinner element (identified by Tailwind spinner class)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass(
      'rounded-full',
      'h-16',
      'w-16',
      'border-4',
      'border-blue-500',
      'border-t-transparent'
    )
  })
})
