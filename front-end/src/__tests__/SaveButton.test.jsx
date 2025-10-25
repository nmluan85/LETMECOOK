import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import SaveButton from '../components/recipeCard/saveButton'

// --- Mocks for contexts ---
const mockUseAuth = vi.fn()
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}))

const mockOpenLoginModal = vi.fn()
vi.mock('../contexts/LoginModalContext', () => ({
  useLoginModal: () => ({ openLoginModal: mockOpenLoginModal }),
}))

// Keep the icon simple (optional, but avoids DOM noise)
vi.mock('react-icons/fa6', () => ({
  FaRegBookmark: ({ className }) => <i data-testid="icon" className={className} />,
}))

describe('SaveButton', () => {
  const recipeId = 'abc123'
  const endpoint = 'http://localhost:3000/api/users/save-post'

  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('when NOT logged in, opens login modal and does NOT call fetch', async () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: false })

    render(<SaveButton recipeId={recipeId} isClicked={false} onClick={vi.fn()} />)

    const btn = screen.getByTestId('icon').parentElement
    fireEvent.click(btn)

    expect(mockOpenLoginModal).toHaveBeenCalledWith(true)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('when logged in and not saved yet, POSTs then toggles and calls onClick', async () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: true })
    const onClick = vi.fn()
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) })

    render(<SaveButton recipeId={recipeId} isClicked={false} onClick={onClick} />)

    const wrapperDiv = screen.getByTestId('icon').parentElement
    // Initially not saved: no bg-primary-default class
    expect(wrapperDiv).not.toHaveClass('bg-primary-default')

    fireEvent.click(wrapperDiv)

    // Correct network call
    expect(global.fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: recipeId }),
      credentials: 'include',
    })

    // State toggles after successful response
    await waitFor(() => {
      expect(wrapperDiv).toHaveClass('bg-primary-default')
    })
    expect(onClick).toHaveBeenCalled()
  })

  it('when logged in and already saved, DELETEs then toggles and calls onClick', async () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: true })
    const onClick = vi.fn()
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) })

    render(<SaveButton recipeId={recipeId} isClicked={true} onClick={onClick} />)

    const wrapperDiv = screen.getByTestId('icon').parentElement
    // Initially saved
    expect(wrapperDiv).toHaveClass('bg-primary-default')

    fireEvent.click(wrapperDiv)

    expect(global.fetch).toHaveBeenCalledWith(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: recipeId }),
      credentials: 'include',
    })

    await waitFor(() => {
      expect(wrapperDiv).not.toHaveClass('bg-primary-default')
    })
    expect(onClick).toHaveBeenCalled()
  })

  it('does not toggle or call onClick if response is NOT ok', async () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: true })
    const onClick = vi.fn()
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) })

    render(<SaveButton recipeId={recipeId} isClicked={false} onClick={onClick} />)

    const wrapperDiv = screen.getByTestId('icon').parentElement
    fireEvent.click(wrapperDiv)

    expect(global.fetch).toHaveBeenCalled()
    // No toggle → still not saved
    await waitFor(() => {
      expect(wrapperDiv).not.toHaveClass('bg-primary-default')
    })
    expect(onClick).not.toHaveBeenCalled()
  })
})
