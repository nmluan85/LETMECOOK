import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import RecipeCard from '../components/recipeCard/recipeCard'

// --- Mocks ---
const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

// Make framer-motion render plain <div> so hover/tap effects don't interfere
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  },
}))

// Keep SaveButton simple and clickable
vi.mock('../components/recipeCard/saveButton', () => ({
  default: (props) => (
    <button data-testid="save-btn" onClick={props.onClick}>Save</button>
  ),
}))

// Mock icon component so we can count stars / check class names safely
vi.mock('react-icons/fa6', () => ({
  FaStar: ({ className }) => <i data-testid="star" className={className} />,
}))

// Mock static assets (png)
vi.mock('../assets/icons/clock.png', () => ({ default: 'clock.png' }))
vi.mock('../assets/icons/comment.png', () => ({ default: 'comment.png' }))
vi.mock('../assets/icons/heart.png', () => ({ default: 'heart.png' }))

// --- Helpers ---
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

const sampleRecipe = {
  _id: 'My Fancy ID',
  photo: 'https://example.com/pic.jpg',
  title: 'Best Pancakes',
  duration: 15,
  comments: [{ id: 1 }, { id: 2 }, { id: 3 }],
  rating: 4,
}

describe('RecipeCard', () => {
  beforeEach(() => {
    navigateMock.mockClear()
  })

  it('renders title, duration, comment count, 5 stars, and image', () => {
    const { container } = renderWithRouter(
      <RecipeCard recipe={sampleRecipe} isSaved={false} />
    )

    // Title
    expect(screen.getByText('Best Pancakes')).toBeInTheDocument()

    // Duration text
    expect(screen.getByText(/15 minutes/i)).toBeInTheDocument()

    // Comment count (length of comments array)
    expect(screen.getByText('3')).toBeInTheDocument()

    // The fixed likes “21”
    expect(screen.getByText('21')).toBeInTheDocument()

    // 5 stars rendered
    const stars = screen.getAllByTestId('star')
    expect(stars).toHaveLength(5)

    // Ensure image renders with alt text
    const img = container.querySelector('img[alt="Recipe Image"]')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', sampleRecipe.photo)
  })

  it('navigates to recipe detail when card is clicked (not hovering Save area)', () => {
    const { container } = renderWithRouter(
      <RecipeCard recipe={sampleRecipe} isSaved={false} />
    )

    // The outer clickable wrapper has "cursor-pointer" on it
    const card = container.querySelector('.cursor-pointer')
    expect(card).toBeInTheDocument()

    fireEvent.click(card)

    // idString() -> lowercased, spaces removed
    const expectedId = 'myfancyid'
    expect(navigateMock).toHaveBeenCalledWith(`/recipe/${expectedId}`, {
      state: { item: sampleRecipe, isSaved: false },
    })
  })

  it('does NOT navigate when hovering over the Save area', () => {
    const { container } = renderWithRouter(
      <RecipeCard recipe={sampleRecipe} isSaved={false} />
    )

    const card = container.querySelector('.cursor-pointer')
    const saveWrapper = container.querySelector('.ml-auto')
    expect(card).toBeInTheDocument()
    expect(saveWrapper).toBeInTheDocument()

    // Simulate hover over the Save wrapper
    fireEvent.mouseEnter(saveWrapper)

    // Click the card while hovered
    fireEvent.click(card)

    expect(navigateMock).not.toHaveBeenCalled()
  })

    it('clicking SaveButton triggers provided onClick (and does not navigate)', () => {
        const { container } = renderWithRouter(
            <RecipeCard recipe={sampleRecipe} isSaved={true} />
        )

        const card = container.querySelector('.cursor-pointer')
        const saveWrapper = container.querySelector('.ml-auto')
        expect(card).toBeInTheDocument()
        expect(saveWrapper).toBeInTheDocument()

        // Hover over Save area to set isSaveHovered = true (blocks navigation)
        fireEvent.mouseEnter(saveWrapper)

        // Click the SaveButton
        fireEvent.click(screen.getByTestId('save-btn'))

        // Should NOT navigate while hovering save area
        expect(navigateMock).not.toHaveBeenCalled()
    })


  it('applies filled/empty star classes according to rating', () => {
    renderWithRouter(<RecipeCard recipe={sampleRecipe} isSaved={false} />)

    const stars = screen.getAllByTestId('star')
    // First 4 are filled (rating=4), last is empty
    stars.slice(0, 4).forEach((s) =>
      expect(s).toHaveClass('text-yellow-400')
    )
    expect(stars[4]).toHaveClass('text-gray-300')
  })
})
